using Microsoft.EntityFrameworkCore;
using RunningStats.Data;
using RunningStats.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();  // ✅ Add this to enable API controllers
builder.Services.AddDbContext<RunningStatsContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))
);

var app = builder.Build();

app.UseMiddleware<ExceptionHandlingMiddleware>();
app.UseRouting();
app.UseAuthorization();

app.MapControllers();  // ✅ Required to enable API routes

app.Run();
