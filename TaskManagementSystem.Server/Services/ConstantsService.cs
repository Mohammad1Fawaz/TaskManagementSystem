using TaskManagementSystem.Server.Common;
using TaskManagementSystem.Server.Models;

namespace TaskManagementSystem.Server.Services
{
    public class ConstantsService
    {
        private readonly AppDbContext _context;
        public ConstantsService(AppDbContext context)
        {
            _context = context;
        }

        public List<Country> GetCountries()
        {
            return SeedData.allCountries;
        }
        public List<Permission> GetPermissions()
        {
            return SeedData.allPermissions;
        }
    }
}
