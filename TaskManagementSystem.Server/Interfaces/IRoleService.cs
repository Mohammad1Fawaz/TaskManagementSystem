using Microsoft.AspNetCore.Identity;
using TaskManagementSystem.Server.Data;
using TaskManagementSystem.Server.ViewModels.CommonViewModels;

namespace TaskManagementSystem.Server.Interfaces
{
    public interface IRoleService
    {
        Task<ResultViewModel> AddRole(string roleName, List<string> permissions);
        Task<ResultViewModel> DeleteRole(string roleId);
        Task<ResultViewModel> EditRole(string roleId , List<string> claims);
        Task<List<ApplicationRole>> GetAllCreatedRoles();
        Task<List<ApplicationRole>> GetUserRoles(int userId);
        Task<List<IdentityRoleClaim<int>>> GetRolesPermission();
        Task AddClaimsToRole(string roleName, IList<string> claimValues);
        Task<List<string?>> GetUserClaimsByUserIdAsync(int userId);

    }
}
