using TaskManagementSystem.Server.Models;
using TaskManagementSystem.Server.ViewModels.UserViewModels;

namespace TaskManagementSystem.Server.Interfaces
{
    public interface ITaskService
    {
        Task<ProjectTask> CreateTask(BoardTaskViewModel task);
    }
}
