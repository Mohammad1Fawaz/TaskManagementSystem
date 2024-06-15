using TaskManagementSystem.Server.ViewModels.CommonViewModels;
using TaskManagementSystem.Server.ViewModels.UserViewModels;

namespace TaskManagementSystem.Server.Interfaces
{
    public interface IClientService
    {
        Task<ResultViewModel> RegisterClient(ClientRegisterViewModel model);
        Task<ResultViewModel> VerifyEmail(string token, string email);
        Task<ResultViewModel> ResetPassword(ClientResetPasswordViewModel model);
    }
}