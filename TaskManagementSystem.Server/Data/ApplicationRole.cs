using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagementSystem.Server.Data
{
    public class ApplicationRole:IdentityRole<int>
    {
        [ForeignKey("AppUser")]
        [Key]
        public override int Id { get; set; }

        public int UserId { get; set; }

        public ApplicationUser ApplicationUser { get; set; }
    }
}
