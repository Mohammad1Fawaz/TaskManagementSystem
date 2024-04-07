using TaskManagementSystem.Server.Data;
using TaskManagementSystem.Server.ViewModels;
using TaskManagementSystem.Server.ViewModels.UserViewModels;

namespace TaskManagementSystem.Server.Interfaces
{
    public interface IAuthService
    {
        Task<ResultViewModel> Login(ClientLoginViewModel model);
        string GenerateJwtToken(ApplicationUser client, bool isClient = false);
        Task<ResultViewModel> Logout();
        Task<UserDataViewModel> GetUserInfo();

    }
}
