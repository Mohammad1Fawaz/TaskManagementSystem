using TaskManagementSystem.Server.Data;
using TaskManagementSystem.Server.ViewModels;
using TaskManagementSystem.Server.ViewModels.UserViewModels;

namespace TaskManagementSystem.Server.Interfaces
{
    public interface IUserService
    {
        Task<ResultViewModel> RegisterUser(string token, UserRegisterViewModel model);

        Task<List<ApplicationUser>> GetUsers(string token);

        Task<ResultViewModel> VerifyUser(UserVerificationViewModel model);

        Task<ResultViewModel> DeleteUser(string userId);

    }
}