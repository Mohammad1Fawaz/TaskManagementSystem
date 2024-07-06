using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TaskManagementSystem.Server.Data;
using static TaskManagementSystem.Server.Common.EnumConstants;

namespace TaskManagementSystem.Server.Models
{
    public class ProjectTask
    {
        [Key]
        [Required]
        [MaxLength(100)]
        public string taskId { get; set; }

        [ForeignKey("Project")]
        public int projectId { get; set; }
        public Project project { get; set; }

        [ForeignKey("Group")]
        public int groupId { get; set; }
        public ProjectGroup group { get; set; }

        [Required]
        public string title { get; set; }

        public string description { get; set; }

        [Required]
        public DateTime dueDate { get; set; }

        [ForeignKey("AssigneeUser")]
        public int assigneeId { get; set; }
        public ApplicationUser assigneeUser { get; set; }

        public int reporter { get; set; }

        [NotMapped]
        public List<string> collaborators { get; set; }

        public string status { get; set; }
        public TaskPriority priority { get; set; }
        public int progress { get; set; }

        public TaskType taskType { get; set; }

        [NotMapped]
        public List<string> labels { get; set; }

        [NotMapped]
        public List<string> components { get; set; }

        [NotMapped]
        public List<string> versions { get; set; }

        [NotMapped]
        public List<string> linkedIssues { get; set; }

        public double estimatedTime { get; set; }
        public double loggedTime { get; set; }

        [ForeignKey("User")]
        public int clientId { get; set; }
        public ApplicationUser client { get; set; }

        public DateTime createdAt { get; set; } = DateTime.UtcNow;
        public DateTime updatedAt { get; set; } = DateTime.UtcNow;

        public List<TaskComment> comments { get; set; }
        public List<TaskAttachment> attachments { get; set; }
    }
}
