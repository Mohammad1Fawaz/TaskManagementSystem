using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using TaskManagementSystem.Server.Data;

namespace TaskManagementSystem.Server.Models
{
    public class ProjectGroup : BaseEntityModel
    {
        public string name { get; set; }

        [ForeignKey("Project")]
        public int projectId { get; set; }
        public Project project { get; set; }

        public List<ProjectTask> projectTasks { get; set; }
    }
}
