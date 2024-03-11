using TaskManagementSystem.Server;
using TaskManagementSystem.Server.Middlewares;

var builder = WebApplication.CreateBuilder(args);

StartUp.ConfigureServices(builder.Services,builder.Configuration);

var app = builder.Build();


app.UseDefaultFiles();
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHsts();
}

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseSession();

app.UseMiddleware<AuthenticationMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");


app.Run();
