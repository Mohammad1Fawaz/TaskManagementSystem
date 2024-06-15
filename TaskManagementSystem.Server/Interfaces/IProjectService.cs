using TaskManagementSystem.Server.ViewModels.ClientViewModels;
using TaskManagementSystem.Server.ViewModels.CommonViewModels;

namespace TaskManagementSystem.Server.Interfaces
{
    public interface IProjectService
    {
        Task<ResultViewModel> CreateProject(ProjectViewModel projectViewModel);
    }
}
