namespace TaskManagementSystem.Server.ViewModels
{
    public class ResultViewModel
    {
        public bool success { get; }
        public string message { get; }

        public string token { get; }

        public ResultViewModel(bool success, string message, string token = null)
        {
            this.success = success;
            this.message = message;
            this.token = token;
        }
    }

}
