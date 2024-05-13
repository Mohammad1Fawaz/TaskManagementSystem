using System;
using System.ComponentModel.DataAnnotations;
namespace TaskManagementSystem.Server.Attributes
{
    public class NotZeroAttribute : ValidationAttribute
    {
        public override bool IsValid(object? value)
        {
            if (value != null)
            {
                if (int.TryParse(value.ToString(), out int intValue))
                {
                    if (intValue != 0)
                    {
                        return true;
                    }
                }
            }

            return false;
        }

    }
}
