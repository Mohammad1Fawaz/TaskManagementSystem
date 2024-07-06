using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TaskManagementSystem.Server.Data;

namespace TaskManagementSystem.Server.Models
{
    public class TaskComment : BaseEntityModel
    {
        [Required]
        public string author { get; set; }

        [Required]
        public DateTime postedAt { get; set; }

        public string content { get; set; }

        [ForeignKey("ProjectTask")]
        public string taskId { get; set; }
        public ProjectTask projectTask { get; set; }
    }
}
