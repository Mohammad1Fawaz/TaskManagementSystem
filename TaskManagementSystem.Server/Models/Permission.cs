using System.ComponentModel.DataAnnotations;
using TaskManagementSystem.Server.Data;

namespace TaskManagementSystem.Server.Models
{
    public class Permission : BaseEntityModel
    {
        public string Key { get; set; }
        public string Value { get; set; }
        public string Description { get; set; }
    }
}
