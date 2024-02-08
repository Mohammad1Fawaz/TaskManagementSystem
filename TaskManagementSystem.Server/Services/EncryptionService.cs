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

        public string Encrypt(string password)
        {
            return _protector.Protect(password);
        }

        public string Decrypt(string encryptedPassword)
        {
            return _protector.Unprotect(encryptedPassword);
        }
    }
}
