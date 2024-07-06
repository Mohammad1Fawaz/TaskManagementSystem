using System.ComponentModel.DataAnnotations.Schema;
using TaskManagementSystem.Server.Data;
using TaskManagementSystem.Server.Models;
using static TaskManagementSystem.Server.Common.EnumConstants;

namespace TaskManagementSystem.Server.ViewModels.UserViewModels
{
    public class BoardProjects
    {
        public int projectId { get; set; }
        public string projectKey { get; set; }
        public int projectLead { get; set; }
        public string projectName { get; set; }
        public string projectDescription { get; set; }

        public List<BoardProjectUsers> boardProjectUsers { get; set; }
        public List<BoardTaskViewModel> boardTasks { get; set; }
    }

    public class BoardProjectUsers
    {
        public int userId { get; set; }
        public string? userName { get; set; }
        public string? userEmail { get; set; }
        public string? userPhoneNumber { get; set; }
        public bool isOnline { get; set; }
    }

    public class BoardTaskViewModel
    {
        [NotMapped]
        public string taskId { get; set; }
        public int projectId { get; set; }
        public int groupId { get; set; }

        public string title { get; set; }

        public string description { get; set; }

        public int taskType { get; set; }
        //public DateTime dueDate { get; set; }

        public int assigneeId { get; set; }

        public string status { get; set; }

        public TaskPriority priority { get; set; }

        public int progress { get; set; }

        public double estimatedTime { get; set; }

    }


    public class BoardViewModel
    {
        public List<BoardProjects> boardProjects { get; set; }     
    }
}
