using TaskManagementSystem.Server.Data;
using TaskManagementSystem.Server.ViewModels;
using TaskManagementSystem.Server.ViewModels.UserViewModels;
using static TaskManagementSystem.Server.Services.UserService;

namespace TaskManagementSystem.Server.Interfaces
{
    public interface IUserService
    {
        Task<ResultViewModel> RegisterUser(UserRegisterViewModel model);
        Task<List<UserWithRoles>> GetUsers();
        Task<ResultViewModel> VerifyUser(UserVerificationViewModel model);
        Task<ResultViewModel> DeleteUser(string userId);
        Task<ResultViewModel> EditUser(UserRegisterViewModel userData);

    }
}