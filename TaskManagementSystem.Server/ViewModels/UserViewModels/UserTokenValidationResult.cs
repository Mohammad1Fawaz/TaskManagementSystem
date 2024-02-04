using System.Security.Claims;

namespace TaskManagementSystem.Server.ViewModels.UserViewModels
{
    public class UserTokenValidationResult
    {
        public bool IsValid { get; set; }

        public ClaimsPrincipal? ClaimsPrincipal { get; set; }

        public string Token { get; set; }
    }
}
