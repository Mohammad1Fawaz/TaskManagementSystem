using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TaskManagementSystem.Server.Data;
using TaskManagementSystem.Server.Interfaces;
using TaskManagementSystem.Server.RealTime;
using TaskManagementSystem.Server.Services;
using TaskManagementSystem.Server.Middlewares;

namespace TaskManagementSystem.Server
{
    public static class StartUp
    {
        //Notes
        // AddScoped :  created once per client request within the scope of that request
        // AddTransient : created each time they are requested.
        // AddSingleton : created once and shared throughout the application's lifetime

        public static void ConfigureServices(IServiceCollection services , IConfiguration configuration)
        {
            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDistributedMemoryCache();
            services.AddHttpContextAccessor();
            services.AddSignalR();

            services.AddSession(options =>
            {
                // Set session timeout (default is 20 minutes)
                options.IdleTimeout = TimeSpan.FromMinutes(30);

                options.Cookie.IsEssential = true;

                options.Cookie.HttpOnly = true;
                options.Cookie.SameSite = SameSiteMode.Strict;
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            });

            services.AddDbContext<AppDbContext>(options =>
            {
                string connectionString = configuration.GetConnectionString("DefaultConnection") ?? "";
                AppDbContext.Configure(options, connectionString);
            });


            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins(["http://localhost:3000"])
                           .AllowAnyMethod()
                           .AllowAnyHeader()
                           .AllowCredentials();
                });
            });

            services.AddIdentity<ApplicationUser, ApplicationRole>()
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();

            services.Configure<IdentityOptions>(options => {
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 6;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.SignIn.RequireConfirmedEmail = true;
            });

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme; ;
            }) .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("$#HJ#@KJ4z32&*#JKHSJKHSJKHJK#*(#JKsad")),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero,
                    };
                });

            services.AddHttpContextAccessor();

            services.AddSingleton<IEncryptionService,EncryptionService>(ServiceProvider =>
            {
                var dataProtectionProvider = ServiceProvider.GetRequiredService<IDataProtectionProvider>();
                var purpose = "password-protection";
                return new EncryptionService(dataProtectionProvider, purpose);
            });

            services.AddSingleton<IEmailSender,MailService>();

            
            services.AddScoped<IClientService,ClientService>();
            services.AddScoped<ConstantsService>();
            services.AddTransient<IValidationService, ValidationService>();
            services.AddScoped<IUserService,UserService>();
            services.AddScoped<IAuthService,AuthService>();
            services.AddScoped<IRoleService, RoleService>();
            services.AddScoped<INotificationsService, NotificationsService>();
            services.AddSingleton<ConnectionManager>();

        }
    }
}
