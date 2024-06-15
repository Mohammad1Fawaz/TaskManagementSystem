using System.ComponentModel.DataAnnotations.Schema;
using TaskManagementSystem.Server.Data;

namespace TaskManagementSystem.Server.Models
{
    public class ProjectUser : BaseEntityModel
    {
        [ForeignKey("Project")]
        public int projectId { get; set; }
        public Project Project { get; set; }

        [ForeignKey("User")]
        public int userId { get; set; }
        public ApplicationUser User { get; set; }

    }
}
