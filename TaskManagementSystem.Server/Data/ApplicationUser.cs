using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using TaskManagementSystem.Server.Models;
using static TaskManagementSystem.Server.Common.EnumConstants;

namespace TaskManagementSystem.Server.Data
{
    public class ApplicationUser:IdentityUser<int>
    {
        [Key]
        public override int Id { get; set; }
        public int? ClientId { get; set; }
        public ApplicationUser Client { get; set; }
        public UserType userType { get; set; }
        public DateTime createdAt { get; set; }= DateTime.UtcNow;
        public DateTime updatedAt { get; set; } = DateTime.UtcNow;

        public List<ProjectUser> ProjectUsers { get; set; }
        public List<ProjectTask> AssignedTasks { get; set; }
    }
}
