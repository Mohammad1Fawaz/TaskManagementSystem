using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TaskManagementSystem.Server.Data;

namespace TaskManagementSystem.Server.Models
{
    public class Workflow : BaseEntityModel
    {
        [ForeignKey("Project")]
        public int ProjectId { get; set; }
        public Project Project { get; set; }

        public string stageTitle { get; set; }
        public int order { get; set; }
    }
}
