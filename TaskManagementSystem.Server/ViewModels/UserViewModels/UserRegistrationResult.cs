namespace TaskManagementSystem.Server.ViewModels.UserViewModels
{
    public class UserRegistrationResult
    {
        public bool success { get; }
        public string message { get; }

        public UserRegistrationResult(bool success,string message)
        {
            this.success = success;
            this.message = message;
        }
    }

}
