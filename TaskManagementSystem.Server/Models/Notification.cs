using TaskManagementSystem.Server.Data;
using static TaskManagementSystem.Server.Common.EnumConstants;

namespace TaskManagementSystem.Server.Models
{
    public class Notification : BaseEntityModel
    {
        public int userSenderId { get; set; }

        public int? userReceiverId { get; set; }

        public bool forAll { get; set; } = false;

        public string content { get; set; }

        public bool isRead { get; set; }

        public norificationType type {get;set;}
    }
}
