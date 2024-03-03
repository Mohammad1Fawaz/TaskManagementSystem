using System.ComponentModel.DataAnnotations

public class Task
{
    [key]
    public string id { get; set; }
    public string title { get; set; }
    public string description { get; set; }
    public string sprintId { get; set; }
    public int startDate { get; set; }
    public int endDate { get; set; }
    public int estimateTime { get; set; }
    public string notes { get; set; }
    public enum priority { Low, Medium, High }
}