using Microsoft.AspNetCore.Identity;
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
            ApplicationRole? role = await _roleManager.FindByNameAsync(roleName);
            int clientId = _validationService.GetAuthenticatedClientId();

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

            return new ResultViewModel(false, "You don't have permission to add roles");
        }



        public async Task<ResultViewModel> DeleteRole(string roleId)
        {
            string? roleValue = _validationService.GetUserRole();
            if (string.IsNullOrEmpty(roleValue) || roleValue != "ClientAdmin")
            {
                return new ResultViewModel(false, "You don't have permission to Delete roles");
            }
            ApplicationRole? role = await _roleManager.FindByIdAsync(roleId);
            int clientId = _validationService.GetAuthenticatedClientId();

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


        public Task<List<ApplicationRole>>? GetRoles()
        {
            int clientId = _validationService.GetAuthenticatedClientId();

            if (clientId != 0)
            {
                List<ApplicationRole> roles = _roleManager.Roles.Where(x => x.UserId == clientId && x.Name != "ClientAdmin").ToList();
                return Task.FromResult(roles);
            }

            return null;
        }

        public string GetUserRole()
        {
            string? role = _validationService.GetUserRole();
            return !string.IsNullOrEmpty(role) ? role : "";
        }

        public Task<List<IdentityRoleClaim<int>>>? GetRolesPermission()
        {
            string? roleValue = _validationService.GetUserRole();

            if (string.IsNullOrEmpty(roleValue) || roleValue != "ClientAdmin")
            {
                return null;
            }

            int clientId = _validationService.GetAuthenticatedClientId();

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
