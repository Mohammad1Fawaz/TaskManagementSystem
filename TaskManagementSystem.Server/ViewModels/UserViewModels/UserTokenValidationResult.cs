using System.Security.Claims;

namespace TaskManagementSystem.Server.ViewModels.UserViewModels
{
    public class UserTokenValidationResult
    {
        public bool isValid { get; set; }

        public ClaimsPrincipal? claimsPrincipal { get; set; }

        public string token { get; set; }
    }
}
