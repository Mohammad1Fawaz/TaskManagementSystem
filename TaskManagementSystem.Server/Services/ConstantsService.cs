using Microsoft.EntityFrameworkCore;
using TaskManagementSystem.Server.Models;
using System.Collections.Generic;
using System.Linq;

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
            return _context.Countries.AsNoTracking().ToList();
        }
    }
}
