using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagementSystem.Server.Models
{

    [Table("clients")]
    public class Client
    {
        [Key]
        public int id { get; set; }
        public string userName { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string token { get; set; }
        public bool isUserVerfied { get; set; }
    }
}
