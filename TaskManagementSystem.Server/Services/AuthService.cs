using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskManagementSystem.Server.Common;
using TaskManagementSystem.Server.Data;
using TaskManagementSystem.Server.Interfaces;
using TaskManagementSystem.Server.ViewModels;
using TaskManagementSystem.Server.ViewModels.UserViewModels;

namespace TaskManagementSystem.Server.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _dbContext;
        private readonly IEncryptionService _encryptionService;
        private readonly IValidationService _validationService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthService(AppDbContext dbContext, IEncryptionService encryptionService, IValidationService validationService,UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, RoleManager<ApplicationRole> roleManager, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _dbContext = dbContext;
            _encryptionService = encryptionService;
            _validationService = validationService;
            _httpContextAccessor = httpContextAccessor;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<ResultViewModel> Login(ClientLoginViewModel model)
        {
            string email = model.email;
            string password = model.password;
            model.rememberMe = true;

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return new ResultViewModel(false, "Login failed, wrong email or password");
            }

            var result = await _signInManager.PasswordSignInAsync(user, password, model.rememberMe, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                if (!user.EmailConfirmed)
                {
                    return new ResultViewModel(false, "Login failed, email not confirmed.");
                }
                bool isClient = user.ClientId == null ? true : false;
                string token = GenerateJwtToken(user , isClient);
                return new ResultViewModel(true, "Login successful",token);
            }
            else
            {
                return new ResultViewModel(false, "Login failed, wrong email or password");
            }
        }

        public string GenerateJwtToken(ApplicationUser client , bool isClient = false)
        {
            if (client != null)
            {
                string? email = client.Email != null ? client.Email : "";
                string? phoneNumber = client.PhoneNumber != null ? client.PhoneNumber : "";

                JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
                byte[] key = Encoding.ASCII.GetBytes(Constants._jwtSecret);
                SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                    new Claim(ClaimTypes.Role, isClient ? "ClientAdmin" : "User"),
                    new Claim(ClaimTypes.NameIdentifier, client.Id.ToString()),
                    new Claim(ClaimTypes.Email, email),
                    new Claim(ClaimTypes.MobilePhone,phoneNumber),
                }),
                    Expires = DateTime.UtcNow.AddHours(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
            return "";
        }


        public async Task<ResultViewModel> AddRole(string token, string roleName, List<string> permissions)
        {
            if (string.IsNullOrEmpty(token) || !token.StartsWith("Bearer "))
            {
                return new ResultViewModel(false, "You don't have permission to Add roles");
            }

            string jwtToken = token.Substring("Bearer ".Length).Trim();

            var handler = new JwtSecurityTokenHandler();
            var claims = handler.ReadJwtToken(jwtToken).Claims;
            string? roleValue = claims?.FirstOrDefault(c => c.Type == "role")?.Value;
            if (string.IsNullOrEmpty(roleValue) || roleValue != "ClientAdmin")
            {
                return new ResultViewModel(false, "You don't have permission to Add roles");
            }
            ApplicationRole? role = await _roleManager.FindByNameAsync(roleName);
            int clientId =Convert.ToInt32(_httpContextAccessor.HttpContext?.Session.GetString("ClientId"));

            if (role == null)
            {
                if (clientId != 0)
                {
                    ApplicationRole newRole = new ApplicationRole()
                    {
                        Name = roleName,
                        ConcurrencyStamp = roleName,
                        UserId = clientId
                    };
                    await _roleManager.CreateAsync(newRole);

                    await AddClaimsToRole(roleName, permissions);

                    return new ResultViewModel(true, "Role added successfully");
                }
            }

            return new ResultViewModel(false, "You don't have permission to Delete roles");
        }



        public async Task<ResultViewModel> DeleteRole(string token, string roleId)
        {
            if (string.IsNullOrEmpty(token) || !token.StartsWith("Bearer "))
            {
                return new ResultViewModel(false, "You don't have permission to Delete roles");
            }

            string jwtToken = token.Substring("Bearer ".Length).Trim();

            var handler = new JwtSecurityTokenHandler();
            var claims = handler.ReadJwtToken(jwtToken).Claims;
            string? roleValue = claims?.FirstOrDefault(c => c.Type == "role")?.Value;
            if (string.IsNullOrEmpty(roleValue) || roleValue != "ClientAdmin")
            {
                return new ResultViewModel(false, "You don't have permission to Delete roles");
            }
            ApplicationRole? role = await _roleManager.FindByIdAsync(roleId);
            int clientId = _validationService.GetIdFromToken(token);

            if (role != null)
            {
                if (clientId != 0 && role.UserId == clientId)
                {
                    await _roleManager.DeleteAsync(role);

                    return new ResultViewModel(true, "Role Deleted successfully");
                }
            }

            return new ResultViewModel(false, "You don't have permission to Delete roles");
        }




        public Task<List<ApplicationRole>>? GetRoles(string token)
        {
            if (string.IsNullOrEmpty(token) || !token.StartsWith("Bearer "))
            {
                return null;
            }

            string jwtToken = token.Substring("Bearer ".Length).Trim();

            var handler = new JwtSecurityTokenHandler();
            var claims = handler.ReadJwtToken(jwtToken).Claims;

            string? roleValue = claims?.FirstOrDefault(c => c.Type == "role")?.Value;

            if (string.IsNullOrEmpty(roleValue))
            {
                return null;
            }

            int clientId = _validationService.GetIdFromToken(token);

            if (clientId != 0)
            {
                List<ApplicationRole> roles = _roleManager.Roles.Where(x => x.UserId == clientId && x.Name != "ClientAdmin").ToList();
                return Task.FromResult(roles);
            }

            return null;
        }



        public Task<List<IdentityRoleClaim<int>>>? GetRolesPermission(string token)
        {
            if (string.IsNullOrEmpty(token) || !token.StartsWith("Bearer "))
            {
                return null;
            }

            string jwtToken = token.Substring("Bearer ".Length).Trim();

            var handler = new JwtSecurityTokenHandler();
            var claims = handler.ReadJwtToken(jwtToken).Claims;

            string? roleValue = claims?.FirstOrDefault(c => c.Type == "role")?.Value;

            if (string.IsNullOrEmpty(roleValue) || roleValue != "ClientAdmin")
            {
                return null;
            }

            int clientId = _validationService.GetIdFromToken(token);

            if (clientId == 0)
            {
                return null;

            }

            List<IdentityRoleClaim<int>> allClaims = _dbContext.RoleClaims.ToList();
            return Task.FromResult(allClaims);
        }



        private async Task AddClaimToRole(string roleName, string claimValue)
        {
            var role = await _roleManager.FindByNameAsync(roleName);
            if (role != null)
            {
                var existingClaim = await _roleManager.GetClaimsAsync(role);
                if (!existingClaim.Any(c => c.Value == claimValue))
                {
                    var claim = new Claim("Permission", claimValue);
                    await _roleManager.AddClaimAsync(role, claim);
                }
            }
        }



        public async Task AddClaimsToRole(string roleName, IList<string> claimValues)
        {
            ApplicationRole? role = await _roleManager.FindByNameAsync(roleName);
            if (role != null)
            {
                foreach (var claimValue in claimValues)
                {
                    var existingClaims = await _roleManager.GetClaimsAsync(role);
                    if (!existingClaims.Any(c => c.Value == claimValue))
                    {
                        var claim = new Claim("Permission", claimValue);
                        await AddClaimToRole(roleName, claim.Value);
                    }
                }
            }
        }

    }
}
