using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;
using RunningStats.Controllers;
using RunningStats.Data;
using RunningStats.Models;
using Xunit;

namespace RunningStats.Tests
{
    public class ActivitiesControllerTests
    {
        // Helper method to create an in-memory EF Core context
        private RunningStatsContext GetInMemoryDbContext()
        {
            var options = new DbContextOptionsBuilder<RunningStatsContext>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;
            return new RunningStatsContext(options);
        }

        [Fact]
        public async Task GetActivities_ReturnsAllActivities()
        {
            // Arrange
            using var context = GetInMemoryDbContext();
            // Seed the in-memory database with test data
            context.Activities.AddRange(
                new Activity { Activity_Id = "1", Name = "Morning Run", Sport = "running", Training_Load = 10, Distance = 5.0f, Start_Time = System.DateTime.Now },
                new Activity { Activity_Id = "2", Name = "Evening Cycle", Sport = "cycling", Training_Load = 20, Distance = 15.0f, Start_Time = System.DateTime.Now }
            );
            await context.SaveChangesAsync();

            var controller = new ActivitiesController(context, NullLogger<ActivitiesController>.Instance);

            // Act
            var result = await controller.GetActivities();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var activities = Assert.IsAssignableFrom<IEnumerable<Activity>>(okResult.Value);
            Assert.Equal(2, activities.Count());
        }

        [Fact]
        public async Task GetActivitiesBySport_ReturnsFilteredActivities()
        {
            // Arrange
            using var context = GetInMemoryDbContext();
            // Seed the in-memory database with test data
            context.Activities.AddRange(
                new Activity { Activity_Id = "1", Name = "Morning Run", Sport = "running", Training_Load = 10, Distance = 5.0f, Start_Time = System.DateTime.Now },
                new Activity { Activity_Id = "2", Name = "Evening Cycle", Sport = "cycling", Training_Load = 20, Distance = 15.0f, Start_Time = System.DateTime.Now },
                new Activity { Activity_Id = "3", Name = "Afternoon Run", Sport = "running", Training_Load = 15, Distance = 8.0f, Start_Time = System.DateTime.Now }
            );
            await context.SaveChangesAsync();

            var controller = new ActivitiesController(context, NullLogger<ActivitiesController>.Instance);

            // Act: Filter by "running"
            var result = await controller.GetActivitiesBySport("running");

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var activities = Assert.IsAssignableFrom<IEnumerable<Activity>>(okResult.Value);
            Assert.Equal(2, activities.Count());
            Assert.All(activities, a => Assert.Equal("running", a.Sport));
        }
    }
}
