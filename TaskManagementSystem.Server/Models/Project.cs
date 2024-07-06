using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using TaskManagementSystem.Server.Data;

namespace TaskManagementSystem.Server.Models
{
    public class Project : BaseEntityModel
    {
        public string projectName { get; set; }
        public string projectKey { get; set; }
        public string projectDescription { get; set; }

        [ForeignKey("ProjectLead")]
        public int projectLeadId { get; set; }
        public ApplicationUser ProjectLead { get; set; }

        public List<ProjectGroup> groups { get; set; }
        public List<ProjectTask> tasks { get; set; }

        public List<ProjectUser> projectUsers { get; set; }
    }
}
