using Microsoft.EntityFrameworkCore;
using EmployeeManagement.Data;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<EmployeeDbContext>(options =>
    options.UseSqlServer("Server=POLICEHEMANTHRE;Database=EmployeeDB;Trusted_Connection=True;TrustServerCertificate=True"));

var app = builder.Build();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();
app.MapControllerRoute(name: "default", pattern: "{controller=Employee}/{action=Index}/{id?}");
app.Run();
