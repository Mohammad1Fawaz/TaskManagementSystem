using System.ComponentModel.DataAnnotations.Schema;
using TaskManagementSystem.Server.Data;

namespace TaskManagementSystem.Server.Models
{
    public class Project:BaseEntityModel
    {
        public string projectName { get; set; }
        public string projectKey { get; set; }
        public string projectDescription { get; set; }

        [ForeignKey ("User")]
        public int projectLead { get; set; }
        public ApplicationUser User { get; set; }

    }
}
