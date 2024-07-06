using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TaskManagementSystem.Server.Data;

namespace TaskManagementSystem.Server.Models
{
    public class TaskAttachment : BaseEntityModel
    {
        [Required]
        public string fileName { get; set; }

        [Required]
        public string filePath { get; set; }

        [Required]
        public DateTime uploadedAt { get; set; }

        [ForeignKey("ProjectTask")]
        public string taskId { get; set; }
        public ProjectTask projectTask { get; set; }
    }
}
