using TaskManagementSystem.Server.Models;
using TaskManagementSystem.Server.ViewModels.UserViewModels;

namespace TaskManagementSystem.Server.Interfaces
{
    public interface IBoardService
    {
       Task<List<string>> GetProjectWorkFlow ();
       Task<BoardViewModel> GetClientProjects ();
       Task<List<BoardProjectUsers>> GetAllUserCollaborators ();
       Task<bool> UpdateTaskStatusAsync(string taskId, string newStatus,int projectId);
    }
}
