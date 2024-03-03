using TaskManagementSystem.Server.Models

namespace TaskManagementSystem.Server.Services
{
    public class TaskServices
    {
        private readonly AppDbContext _context;
        
        public TaskServices(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddTask (Task task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
        }

        public async Task ModifyTask(string id,Task task)
        {
            var oldTask = _context.Tasks.FirstOrDefault(x => x.id == id);

            if (oldTask != null)
            {
                oldTask.title=task.title;
                oldTask.description= task.description;
                oldTask.sprintId= task.sprintId;
                oldTask.startDate= task.startDate;
                oldTask.endDate= task.endDate;
                oldTask.estimateTime= task.estimateTime;
                oldTask.priority= task.priority;
                oldTask.notes= task.notes;

                await _context.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Task not Found");
            }
        }

        public void DeleteTask(string id)
        {
            var task = _context.Tasks.FirstOrDefault(x => x.id == id);
            if (task != null)
            {
                _context.Tasks.Remove(task);
            }
            else
            {
                throw new Exception("Task not Found");
            }
        }

        public Task GetTaskById(string id)
        {
            return _context.Tasks.FirstOrDefault(x=>x.id == id);
        }

        public list<Task> GetAllTasks()
        {
            return _context.Tasks;
        }
    }
}