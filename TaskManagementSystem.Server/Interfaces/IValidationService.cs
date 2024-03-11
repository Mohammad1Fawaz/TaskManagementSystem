using Microsoft.AspNetCore.Identity;
using TaskManagementSystem.Server.Data;

namespace TaskManagementSystem.Server.Interfaces
{
    public interface IValidationService
    {
        Task<IdentityResult> ValidateAsync(ApplicationUser user);

        int GetIdFromToken(string token);

        bool IsEmailTaken(string email);

        string GenerateUniqueVerificationCode(int length);

        void StoreVerificationCode(int userId, string verificationCode);
    }
}