namespace TaskManagementSystem.Server.ViewModels.UserViewModels
{
    public class UserWithRolesViewModel
    {
        public int? id { get; set; }
        public string? userName { get; set; }
        public string? email { get; set; }
        public bool emailConfirmed { get; set; }
        public string? phoneNumber { get; set; }
        public DateTime createdAt { get; set; }
        public List<string?> roles { get; set; }
    }
}
