using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using TaskManagementSystem.Server.Data;
using TaskManagementSystem.Server.Interfaces;
using TaskManagementSystem.Server.Models;

namespace TaskManagementSystem.Server.Services
{
    public class ValidationService : IValidationService
    {
        private readonly AppDbContext _dbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ValidationService(AppDbContext dbContext, UserManager<ApplicationUser> userManager, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<IdentityResult> ValidateAsync(ApplicationUser user)
        {
            var errors = new List<IdentityError>();
            var clientId = user.ClientId;
            var normalizedEmail = _userManager.NormalizeEmail(user.Email);

            var existingUser = await _userManager.Users.FirstOrDefaultAsync(u =>
                u.ClientId == clientId &&
                u.NormalizedEmail == normalizedEmail &&
                u.Id != user.Id);

            if (existingUser != null)
            {
                errors.Add(new IdentityError { Code = "DuplicateEmailAndClientId", Description = "Email is already in use." });
            }

            return errors.Count == 0 ? IdentityResult.Success : IdentityResult.Failed(errors.ToArray());
        }

        public int GetAuthenticatedClientId()
        {
            return Convert.ToInt32(_httpContextAccessor?.HttpContext?.Session.GetString("clientId"));
        }     
        public int GetAuthenticatedUserId()
        {
            return Convert.ToInt32(_httpContextAccessor?.HttpContext?.Session.GetString("userId"));
        }

        public bool IsEmailTaken(string email)
        {
            return _dbContext.Users.Any(u => u.Email == email);
        }

        public string GenerateUniqueVerificationCode(int length)
        {
            Guid guid = Guid.NewGuid();

            byte[] guidBytes = guid.ToByteArray();

            byte[] hashBytes;
            using (SHA256 sha256 = SHA256.Create())
            {
                hashBytes = sha256.ComputeHash(guidBytes);
            }

            StringBuilder sb = new StringBuilder();
            foreach (byte b in hashBytes)
            {
                sb.Append(b.ToString("X2"));
            }

            string hash = sb.ToString().Substring(0, length);

            return hash;
        }

        public string GetUserRole()
        {
           return  _httpContextAccessor.HttpContext?.Session?.GetString("role") ?? "";
        }
        public void ClearSession()
        {
            _httpContextAccessor.HttpContext?.Session?.Clear();
        }

        public void StoreVerificationCode(int userId, string verificationCode)
        {
            var existingVerificationCode = _dbContext.UserVerificationCodes.FirstOrDefault(vc => vc.UserId == userId);

            if (existingVerificationCode != null)
            {
                existingVerificationCode.VerificationCode = verificationCode;
            }
            else
            {
                _dbContext.UserVerificationCodes.Add(new UserVerificationCode { UserId = userId, VerificationCode = verificationCode });
            }

            _dbContext.SaveChanges();
        }

    }
}
