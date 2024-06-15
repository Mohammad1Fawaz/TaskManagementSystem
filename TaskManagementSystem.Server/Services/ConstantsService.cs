using TaskManagementSystem.Server.Common;
using TaskManagementSystem.Server.Models;
using TaskManagementSystem.Server.ViewModels.CommonViewModels;
using static TaskManagementSystem.Server.Common.EnumConstants;

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
        public List<PermissionViewModel> GetPermissions()
        {
            var permissions = new List<PermissionViewModel>();

            foreach (CLaimsValue claimValue in Enum.GetValues(typeof(CLaimsValue)))
            {
                string displayName = claimValue.GetDisplayName();
                var permission = new PermissionViewModel
                {
                    key = claimValue.ToString(),
                    value = displayName,
                    description = $"Permission related to {displayName}"
                };

                permissions.Add(permission);
            }

            return permissions;
        }
    }
}
