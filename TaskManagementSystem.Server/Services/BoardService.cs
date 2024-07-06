using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using TaskManagementSystem.Server.Common;
using TaskManagementSystem.Server.Data;
using TaskManagementSystem.Server.Interfaces;
using TaskManagementSystem.Server.Models;
using TaskManagementSystem.Server.ViewModels.UserViewModels;
using static TaskManagementSystem.Server.Common.EnumConstants;

namespace TaskManagementSystem.Server.Services
{
    public class BoardService:IBoardService
    {
        private readonly AppDbContext _dbContext;
        private readonly IValidationService _validationService;
        public readonly INotificationsService _notificationsService;

        public BoardService(AppDbContext dbContext, IValidationService validationService, INotificationsService notificationsService)
        {
            _dbContext = dbContext;
            _validationService = validationService;
            _notificationsService = notificationsService;
        }

        public async Task<List<string>> GetProjectWorkFlow ()
        {
            int clientId = _validationService.GetAuthenticatedClientId();
            List<string> projectWorkFlow = await  _dbContext.Workflows.Where(x => x.clientId == clientId && x.ProjectId == 1).OrderBy(o=>o.order).Select(w=>w.stageTitle).ToListAsync();
            return projectWorkFlow;
        }

        public async Task<BoardViewModel> GetClientProjects()
        {
            int clientId = _validationService.GetAuthenticatedClientId();
            int userId = _validationService.GetAuthenticatedUserId();
            ApplicationUser? authenticatedUser = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == userId);
            List<Project> clientProjects = await _dbContext.Projects.AsNoTracking().Where(x => x.clientId == clientId).ToListAsync();

            if (authenticatedUser != null && authenticatedUser.userType == UserType.User)
            {
                List<int> relatedProjectIds = _dbContext.ProjectUsers.Where(x => x.userId == userId && x.clientId == clientId).Select(x=> x.projectId).ToList();
                clientProjects = clientProjects.Where(x=> relatedProjectIds.Contains(x.id)).ToList();
            }
            
            BoardViewModel boardViewModel = new BoardViewModel();
            List<ProjectTask> boardTasks = await _dbContext.ProjectTasks.AsNoTracking().Where(x => x.clientId == clientId).ToListAsync();

            boardViewModel.boardProjects = clientProjects.Select(x => new BoardProjects
            {
                projectId = x.id,
                projectName = x.projectName,
                projectDescription = x.projectDescription,
                projectKey = x.projectKey,
                projectLead = x.projectLeadId,
            }).ToList();

            if (boardViewModel.boardProjects != null)
            {
                foreach (BoardProjects project in boardViewModel.boardProjects)
                {
                    List<int> projectUserIds = await _dbContext.ProjectUsers.Where(x => x.projectId == project.projectId).Select(x => x.userId).ToListAsync();
                    project.boardProjectUsers = await _dbContext.Users.Where(x => projectUserIds.Contains(x.Id)).Select(x => new BoardProjectUsers
                    {
                        userId = x.Id,
                        userName = x.UserName,
                        userEmail = x.Email,
                        userPhoneNumber = x.PhoneNumber
                    }).ToListAsync();

                    project.boardTasks = boardTasks.Where(x => x.projectId == project.projectId).Select(t => new BoardTaskViewModel
                    {
                        taskId = t.taskId,
                        projectId = t.projectId,
                        groupId = t.groupId,
                        title = t.title,
                        description = t.description,
                        taskType = (int) t.taskType,
                        assigneeId = t.assigneeId,
                        status = t.status,
                        priority = t.priority,
                        progress = t.progress,
                        estimatedTime = t.estimatedTime
                    }).ToList();
                }
            }

            return boardViewModel;
        }


        public async Task<List<BoardProjectUsers>> GetAllUserCollaborators()
        {
            int clientId = _validationService.GetAuthenticatedClientId();
            int userId = _validationService.GetAuthenticatedUserId();
            List<int> onlineUsers = _notificationsService.GetOnlineUsers();
            List<BoardProjectUsers> userCollaborators = await _dbContext.Users.Where(x => x.ClientId == clientId && x.Id != userId).Select(x => new BoardProjectUsers
            {
                userId = x.Id,
                userName = x.UserName,
                userEmail = x.Email,
                userPhoneNumber = x.PhoneNumber,
                isOnline = onlineUsers.Contains(x.Id)
            }).ToListAsync();
            return userCollaborators;
        }

        public async Task<bool> UpdateTaskStatusAsync(string taskId, string newStatus, int projectId)
        {
            var task = await _dbContext.ProjectTasks.FirstOrDefaultAsync(x=>x.taskId == taskId && x.projectId == projectId);
            if (task == null)
            {
                return false;
            }

            task.status = newStatus;
            _dbContext.ProjectTasks.Update(task);
            await _dbContext.SaveChangesAsync();

            return true;
        }


    }
}
