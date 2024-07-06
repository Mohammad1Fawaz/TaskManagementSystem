using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace TaskManagementSystem.Server.Common
{
    public static class EnumExtensions
    {
        public static string GetDisplayName(this Enum value)
        {
            if (value == null)
            {
                throw new ArgumentNullException(nameof(value));
            }

            FieldInfo? field = value.GetType().GetField(value.ToString());
            if (field != null)
            {
                DisplayAttribute? displayAttribute = field.GetCustomAttribute<DisplayAttribute>();
                if (displayAttribute != null)
                {
                    return displayAttribute.Name ?? value.ToString();
                }
            }

            return value.ToString();
        }
    }

    public static class EnumConstants
    {
        public enum UserType
        {
            [Display(Name = "Client Admin")]
            ClientAdmin,
            [Display(Name = "Regular User")]
            User
        }

        public enum CLaimsValue
        {
            [Display(Name = "Create Task")]
            CreateTask,
            [Display(Name = "View Task")]
            ViewTask,
            [Display(Name = "Edit Task")]
            EditTask,
            [Display(Name = "Delete Task")]
            DeleteTask,
            [Display(Name = "Assign Task")]
            AssignTask,
            [Display(Name = "Change Task Status")]
            ChangeTaskStatus,
            [Display(Name = "Comment on Task")]
            CommentOnTask,
            [Display(Name = "View Task Details")]
            ViewTaskDetails,
            [Display(Name = "Manage Task Attachments")]
            ManageTaskAttachments,
            [Display(Name = "Set Task Priority")]
            SetTaskPriority,
            [Display(Name = "Set Task Deadline")]
            SetTaskDeadline,
            [Display(Name = "View Task Analytics")]
            ViewTaskAnalytics,
            [Display(Name = "View Assigned Tasks")]
            ViewAssignedTasks,
            [Display(Name = "View Own Tasks")]
            ViewOwnTasks,
            [Display(Name = "View Team Tasks")]
            ViewTeamTasks,
            [Display(Name = "Manage Task Categories")]
            ManageTaskCategories,
            [Display(Name = "Manage Task Tags")]
            ManageTaskTags,
            [Display(Name = "Manage Task Projects")]
            ManageTaskProjects,
            [Display(Name = "View Task History")]
            ViewTaskHistory,
            [Display(Name = "View Task Comments")]
            ViewTaskComments,
            [Display(Name = "Manage Users")]
            ManageUsers,
            [Display(Name = "Dada")]
            Dada
        }

        public enum NotificationType
        {
            [Display(Name = "None")]
            None,
            [Display(Name = "Info")]
            Info,
            [Display(Name = "Warning")]
            Warning,
            [Display(Name = "Mention")]
            Mention
        }

        public enum TaskType
        {
            [Display(Name = "Story")]
            Story,
            [Display(Name = "Task")]
            Task,
            [Display(Name = "Bug")]
            Bug,
            [Display(Name = "Plan")]
            Plan,
        }

        public enum TaskPriority
        {
            [Display(Name = "Highest")]
            Highest,
            [Display(Name = "High")]
            High,
            [Display(Name = "Medium")]
            Medium,
            [Display(Name = "Low")]
            Low,
            [Display(Name = "Lowest")]
            Lowest,
        }

    }

    public class SelectOption
    {
        public string key { get; set; }
        public int value { get; set; }
    }
}