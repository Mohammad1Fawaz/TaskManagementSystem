namespace TaskManagementSystem.Server.ViewModels.UserViewModels
{
    public class UserDataViewModel
    {
        public int? id { get; set; }
        public string? userName { get; set; }
        public string? email { get; set; }
        public bool emailConfirmed { get; set; }
        public string? phoneNumber { get; set; }
        public string? role { get; set; }
    }
}
