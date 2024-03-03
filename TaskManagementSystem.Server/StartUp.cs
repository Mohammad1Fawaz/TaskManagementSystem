using Microsoft.AspNetCore.DataProtection;
using TaskManagementSystem.Server.Interfaces;
using TaskManagementSystem.Server.Services;

namespace TaskManagementSystem.Server
{
    public static class StartUp
    {
        //Notes
        // AddScoped :  created once per client request within the scope of that request
        // AddTransient : created each time they are requested.
        // AddSingleton : created once and shared throughout the application's lifetime
        public static void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<MailService>();
            services.AddSingleton<EncryptionService>(ServiceProvider =>
            {
                var dataProtectionProvider = ServiceProvider.GetRequiredService<IDataProtectionProvider>();
                var purpose = "password-protection";
                return new EncryptionService(dataProtectionProvider, purpose);
            });
            services.AddScoped<ClientService>();
            services.AddScoped<ConstantsService>();
            services.AddScoped<TaskService>();
        }
    }
}
