
using System.ComponentModel.DataAnnotations;

public class Country
{
    [Key]
    public int id { get; set; }
    public string name { get; set; }
    public string phoneCode { get; set; }
    public string flagSvg { get; set; }
    public string countryCode { get; set; }
    public string timeZone { get; set; }
}





