using Microsoft.AspNetCore.DataProtection;
using TaskManagementSystem.Server.Interfaces;


namespace TaskManagementSystem.Server.Services
{
    public class EncryptionService : IEncryptionService
    {
        private readonly IDataProtector _protector;

        public EncryptionService(IDataProtectionProvider dataProtectionProvider, string purpose)
        {
            _protector = dataProtectionProvider.CreateProtector(purpose);
        }

        public string Encrypt(string? password)
        {
            if (string.IsNullOrEmpty(password))
            {
                return "";
            }
            return _protector.Protect(password);
        }

        public string Decrypt(string? encryptedPassword)
        {
            if (string.IsNullOrEmpty(encryptedPassword))
            {
                return "";
            }
            return _protector.Unprotect(encryptedPassword);
        }
    }
}
