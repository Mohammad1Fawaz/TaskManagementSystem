using Microsoft.AspNetCore.Identity;
using TaskManagementSystem.Server.Data;
using TaskManagementSystem.Server.ViewModels;
using TaskManagementSystem.Server.ViewModels.UserViewModels;

namespace TaskManagementSystem.Server.Interfaces
{
    public interface IAuthService
    {
        Task<ResultViewModel> Login(ClientLoginViewModel model);

        string GenerateJwtToken(ApplicationUser client, bool isClient = false);

        Task<ResultViewModel> AddRole(string token, string roleName, List<string> permissions);

        Task<ResultViewModel> DeleteRole(string token, string roleId);

        Task<List<ApplicationRole>> GetRoles(string token);

        Task<List<IdentityRoleClaim<int>>> GetRolesPermission(string token);

        Task AddClaimsToRole(string roleName, IList<string> claimValues);
    }
}
