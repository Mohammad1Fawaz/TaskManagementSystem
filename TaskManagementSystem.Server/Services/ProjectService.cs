using TaskManagementSystem.Server.Interfaces;
using TaskManagementSystem.Server.Models;
using TaskManagementSystem.Server.ViewModels.ClientViewModels;
using TaskManagementSystem.Server.ViewModels.CommonViewModels;

namespace TaskManagementSystem.Server.Services
{
    public class ProjectService:IProjectService
    {
        private readonly AppDbContext _dbContext;
        private readonly IValidationService _validationService;

        public ProjectService(AppDbContext dbContext , IValidationService validationService)
        {
            _dbContext = dbContext;
            _validationService = validationService; 
        }
        public async Task<ResultViewModel> CreateProject(ProjectViewModel projectViewModel)
        {
            int clientId = _validationService.GetAuthenticatedClientId();
            Project project = new Project
            {
                projectName = projectViewModel.projectName,
                projectKey = projectViewModel.projectKey,
                projectDescription = projectViewModel.projectDescription,
                projectLeadId = projectViewModel.projectLead,
                clientId = clientId
            };
            _dbContext.Projects.Add(project);
            await _dbContext.SaveChangesAsync();
            List<Workflow> workFlows = new List<Workflow>();
            for (int i = 0; i<projectViewModel.projectWorkFlow.Count; i++)
            {
                string stage = projectViewModel.projectWorkFlow[i];
                Workflow workFlow = new Workflow
                {
                    ProjectId = project.id,
                    stageTitle = stage,
                    order = i ,
                    clientId = clientId
                };
                workFlows.Add(workFlow);
            }
            _dbContext.Workflows.AddRange(workFlows);

            List<ProjectUser> projectUsers = new List<ProjectUser>();
            foreach (var userId in projectViewModel.userIds)
            {
                ProjectUser projectUser = new ProjectUser
                {
                    projectId = project.id,
                    userId = userId,
                    clientId = clientId
                };
                projectUsers.Add(projectUser);
            }
            _dbContext.ProjectUsers.AddRange(projectUsers);
            await _dbContext.SaveChangesAsync();

            return new ResultViewModel(true, "Project Added Successfully");
        }
    }
}
