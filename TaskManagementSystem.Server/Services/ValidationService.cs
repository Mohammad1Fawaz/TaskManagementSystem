using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using TaskManagementSystem.Server.Common;
using TaskManagementSystem.Server.Data;
using TaskManagementSystem.Server.Interfaces;
using TaskManagementSystem.Server.Models;
using TaskManagementSystem.Server.ViewModels.UserViewModels;

namespace TaskManagementSystem.Server.Services
{
    public class ValidationService : IValidationService
    {
        private readonly AppDbContext _dbContext;
        private readonly UserManager<ApplicationUser> _userManager;

        public ValidationService(AppDbContext dbContext, UserManager<ApplicationUser> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
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

        public int GetIdFromToken(string token)
        {
            if (string.IsNullOrEmpty(token) || !token.StartsWith("Bearer "))
            {
                return 0;
            }

            string jwtToken = token.Substring("Bearer ".Length).Trim();

            var handler = new JwtSecurityTokenHandler();
            var claims = handler.ReadJwtToken(jwtToken).Claims;

            string? clientId = claims?.FirstOrDefault(c => c.Type == "nameid")?.Value;
            if (string.IsNullOrEmpty(clientId))
            {
                return 0;
            }
            return Convert.ToInt32(clientId);
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
