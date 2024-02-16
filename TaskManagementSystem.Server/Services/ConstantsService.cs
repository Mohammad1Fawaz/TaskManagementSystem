using TaskManagementSystem.Server.Common;

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
            return Constants.allCountries;
        }
    }
}
