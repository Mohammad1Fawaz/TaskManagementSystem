namespace TaskManagementSystem.Server.ViewModels.UserViewModels
{
    public class UserResultWithToken
    {
        public bool success { get; }
        public string message { get; }

        public string token { get; }

        public UserResultWithToken(bool success, string message, string token = null)
        {
            this.success = success;
            this.message = message;
            this.token = token;
        }
    }

}
