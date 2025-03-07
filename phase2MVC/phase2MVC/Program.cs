var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller=First}/{action=Index1}/{id?}"
    );
});
app.UseStaticFiles();
/*app.Use(async (context, next) =>
{
    // Terminate chain if URL contains "/end"
    if (context.Request.Path.ToString().Contains("/end"))
    {
        await context.Response.WriteAsync("Request Terminated!");
        return;
    }
    await next();
});

app.Use(async (context, next) =>
{
    if (context.Request.Path.ToString().Contains("hello"))
    {
        await context.Response.WriteAsync("Hello ");
    }
    await next();
});

app.Use(async (context, next) =>
{
    await context.Response.WriteAsync("Hello2 ");
    await next();
});

app.Run(async (context) =>
{
    await context.Response.WriteAsync("Final Middleware Response");
});
*/


app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
