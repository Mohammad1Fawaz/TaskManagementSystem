using Microsoft.EntityFrameworkCore;
using TaskManagementSystem.Server.Common;

public static class ModelBuilderExtensions
{
    public static void Seed(this ModelBuilder modelBuilder)
    {
        try
        {
            Console.WriteLine("Start Seeding Data ...");

            modelBuilder.Entity<Country>().HasData(SeedData.allCountries);

        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error occurred while seeding data: {ex.Message}");
        }
    }
}
