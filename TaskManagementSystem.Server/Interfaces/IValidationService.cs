using Microsoft.AspNetCore.Identity;
using TaskManagementSystem.Server.Data;

namespace TaskManagementSystem.Server.Interfaces
{
    public interface IValidationService
    {
        Task<IdentityResult> ValidateAsync(ApplicationUser user);
        int GetAuthenticatedClientId();
        int GetAuthenticatedUserId();
        void ClearSession();
        string GetUserRole();
        bool IsEmailTaken(string email);
        string GenerateUniqueVerificationCode(int length);
        void StoreVerificationCode(int userId, string verificationCode);
    }
}