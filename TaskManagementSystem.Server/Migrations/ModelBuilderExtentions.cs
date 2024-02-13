using Microsoft.EntityFrameworkCore;
using TaskManagementSystem.Server.Common;
using TaskManagementSystem.Server.Models;

public static class ModelBuilderExtensions
{
    public static void Seed(this ModelBuilder modelBuilder)
    {
        try
        {
            Console.WriteLine("Start Seeding Data ...");

            modelBuilder.Entity<Country>().HasData(Constants.allCountries);

        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error occurred while seeding data: {ex.Message}");
        }
    }
}
