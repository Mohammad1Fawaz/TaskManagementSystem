using Microsoft.EntityFrameworkCore;
using TaskManagementSystem.Server.Interfaces;
using TaskManagementSystem.Server.Models;
using TaskManagementSystem.Server.ViewModels.UserViewModels;

namespace TaskManagementSystem.Server.Services
{
    public class TaskService :ITaskService
    {
        private readonly AppDbContext _dbContext;
        private readonly IValidationService _validationService;

        public TaskService(AppDbContext dbContext , IValidationService validationService)
        {
            _dbContext = dbContext;
            _validationService = validationService;
        }

        public async Task<ProjectTask> CreateTask(BoardTaskViewModel task)
        {
            int clientId = _validationService.GetAuthenticatedClientId();
            int userId = _validationService.GetAuthenticatedUserId();

            string? projectKey = await _dbContext.Projects
                .Where(p => p.id == task.projectId)
                .Select(p => p.projectKey)
                .FirstOrDefaultAsync();

            if (string.IsNullOrEmpty(projectKey))
            {
                throw new InvalidOperationException("Project not found.");
            }

            var existingTasksCount = await _dbContext.ProjectTasks
                .CountAsync(t => t.projectId == task.projectId);

            var taskId = $"{projectKey}-{existingTasksCount + 1}";

            ProjectTask projectTask = new ProjectTask
            {
                taskId = taskId,
                title = task.title,
                description = task.description,
                progress = task.progress,
                assigneeId = task.assigneeId,
                //dueDate = task.dueDate,
                status = task.status,
                estimatedTime = task.estimatedTime,
                priority = task.priority,
                clientId = clientId,
                reporter = userId,
                groupId = 1,
                projectId = task.projectId 
            };

            await _dbContext.ProjectTasks.AddAsync(projectTask);

            await _dbContext.SaveChangesAsync();

            return projectTask;
        }
    }
}
