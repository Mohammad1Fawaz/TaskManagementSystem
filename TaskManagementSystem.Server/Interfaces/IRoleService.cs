using Microsoft.AspNetCore.Identity;
using TaskManagementSystem.Server.Data;
using TaskManagementSystem.Server.ViewModels;

namespace TaskManagementSystem.Server.Interfaces
{
    public interface IRoleService
    {
        Task<ResultViewModel> AddRole(string roleName, List<string> permissions);
        Task<ResultViewModel> DeleteRole(string roleId);
        Task<List<ApplicationRole>> GetRoles();
        Task<List<IdentityRoleClaim<int>>> GetRolesPermission();
        Task AddClaimsToRole(string roleName, IList<string> claimValues);
        string GetUserRole();
    }
}
