using System.ComponentModel.DataAnnotations;

namespace TaskManagementSystem.Server.Models
{
    public class Permission
    {
        [Key]
        public int Id { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
        public string Description { get; set; }
    }
}
