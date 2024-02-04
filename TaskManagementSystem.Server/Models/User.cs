using System.ComponentModel.DataAnnotations;

namespace TaskManagementSystem.Server.Models
{
    public class User
    {
        [Key]
        public int id { get; set; }
        public string userName { get; set; }
        public string email { get; set; }
        public string password { get; set; }

        public bool isUserVerfied { get; set; }
    }
}
