using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using TaskManagementSystem.Server.Data;
using TaskManagementSystem.Server.Interfaces;
using TaskManagementSystem.Server.ViewModels;

namespace TaskManagementSystem.Server.Services
{
    public class RoleService: IRoleService
    {

        private readonly AppDbContext _dbContext;
        private readonly IValidationService _validationService;
        private readonly RoleManager<ApplicationRole> _roleManager;

        public RoleService(AppDbContext dbContext,IValidationService validationService,RoleManager<ApplicationRole> roleManager)
        {
            _roleManager = roleManager;
            _dbContext = dbContext;
            _validationService = validationService;
        }

        public async Task<ResultViewModel> AddRole(string roleName, List<string> permissions)
        {
            string? roleValue = _validationService.GetUserRole();
            if (string.IsNullOrEmpty(roleValue) || roleValue != "ClientAdmin")
            {
                return new ResultViewModel(false, "You don't have permission to Add roles");
            }
            if (string.IsNullOrEmpty(roleName))
            {
                return new ResultViewModel(false, "Role name is required");
            }
            if (permissions.Count == 0)
            {
                return new ResultViewModel(false, "Can't add role with no permissions");
            }

            ApplicationRole? role = await _roleManager.FindByNameAsync(roleName);
            int clientId =   _validationService.GetAuthenticatedClientId();

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

            return new ResultViewModel(false, "A role with same name already exists");
        }



        public async Task<ResultViewModel> DeleteRole(string roleId)
        {
            string? roleValue = _validationService.GetUserRole();
            if (string.IsNullOrEmpty(roleValue) || roleValue != "ClientAdmin")
            {
                return new ResultViewModel(false, "You don't have permission to Delete roles");
            }
            ApplicationRole? role = await _roleManager.FindByIdAsync(roleId);
            int clientId =   _validationService.GetAuthenticatedClientId();

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
        public async Task<ResultViewModel> EditRole(string roleId, List<string> claims)
        {
            string? roleValue = _validationService.GetUserRole();
            if (string.IsNullOrEmpty(roleValue) || roleValue != "ClientAdmin")
            {
                return new ResultViewModel(false, "You don't have permission to edit roles");
            }

            ApplicationRole? role = await _roleManager.FindByIdAsync(roleId);
            if (role == null)
            {
                return new ResultViewModel(false, "Role not found");
            }

            var existingClaims = await _roleManager.GetClaimsAsync(role);
            var newClaims = claims.Select(claim => new Claim("your_claim_type", claim)).ToList();

            var claimsToRemove = existingClaims.Where(ec => !newClaims.Any(nc => ec.Value == nc.Value)).ToList();
            foreach (var claimToRemove in claimsToRemove)
            {
                await _roleManager.RemoveClaimAsync(role, claimToRemove);
            }

            var claimsToAdd = newClaims.Where(nc => !existingClaims.Any(ec => ec.Value == nc.Value)).ToList();
            foreach (var claimToAdd in claimsToAdd)
            {
                await _roleManager.AddClaimAsync(role, claimToAdd);
            }

            return new ResultViewModel(true, "Role updated successfully");
        }



        public async Task<List<ApplicationRole>> GetAllCreatedRoles()
        {
            int clientId =  _validationService.GetAuthenticatedClientId();

            if (clientId != 0)
            {
                List<ApplicationRole> roles = await  _roleManager.Roles.Where(x => x.UserId == clientId && x.Name != "ClientAdmin").ToListAsync();
                return roles;
            }

            return new List<ApplicationRole>();
        }
        public async Task<List<ApplicationRole>> GetUserRoles(int userId)
        {
            int clientId =   _validationService.GetAuthenticatedClientId();

            if (clientId != 0)
            {
                ApplicationUser? user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == userId && x.ClientId == clientId);

                if (user != null)
                {
                    List<ApplicationRole> roles = new List<ApplicationRole>();

                    List<int> roleIds = await _dbContext.UserRoles
                        .Where(x => x.UserId == userId)
                        .Select(r => r.RoleId)
                        .ToListAsync();

                    foreach (int roleId in roleIds)
                    {
                        ApplicationRole? role = await _dbContext.Roles.FirstOrDefaultAsync(x => x.Id == roleId);
                        if (role != null)
                        {
                            roles.Add(role);
                        }
                    }

                    return roles;
                }
            }
            return new List<ApplicationRole>();
        }

        public async Task<List<IdentityRoleClaim<int>>> GetRolesPermission()
        {
            string? roleValue = _validationService.GetUserRole();

            if (string.IsNullOrEmpty(roleValue) || roleValue != "ClientAdmin")
            {
                return new List<IdentityRoleClaim<int>>();
            }

            int clientId =   _validationService.GetAuthenticatedClientId();

            if (clientId == 0)
            {
                return new List<IdentityRoleClaim<int>>();

            }

            List<IdentityRoleClaim<int>> allClaims = await _dbContext.RoleClaims.ToListAsync();
            return allClaims;
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
