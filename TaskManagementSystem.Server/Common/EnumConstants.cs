namespace TaskManagementSystem.Server.Common
{
    public static class EnumConstants
    {
        public enum UserType
        {
            ClientAdmin,
            User
        }

        public enum CLaimsValue
        {
            CreateTask,
            ViewTask,
            EditTask,
            DeleteTask,
            AssignTask,
            ChangeTaskStatus,
            CommentOnTask,
            ViewTaskDetails,
            ManageTaskAttachments,
            SetTaskPriority,
            SetTaskDeadline,
            ViewTaskAnalytics,
            ViewAssignedTasks,
            ViewOwnTasks,
            ViewTeamTasks,
            ManageTaskCategories,
            ManageTaskTags,
            ManageTaskProjects,
            ViewTaskHistory,
            ViewTaskComments
        }

        public enum norificationType
        {
            None,   
            Info,
            Warning,
            Mention
        }

    }
}
