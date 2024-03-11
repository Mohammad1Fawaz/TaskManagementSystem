using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace TaskManagementSystem.Server.Data
{
    public class ApplicationUser:IdentityUser<int>
    {
        [Key]
        public override int Id { get; set; }
        public int? ClientId { get; set; }

        public ApplicationUser Client { get; set; }
    }
}
