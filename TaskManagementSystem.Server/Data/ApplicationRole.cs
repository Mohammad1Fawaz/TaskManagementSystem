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

        public DateTime createdAt { get; set; } = DateTime.UtcNow;
        public DateTime updatedAt { get; set; } = DateTime.UtcNow;
    }
}
