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
            None,
            Info,
            Warning,
            Mention
        }
    }
}
