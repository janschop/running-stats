using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.Mvc.Testing;

namespace RunningStats.IntegrationTests
{
    public class ActivitiesApiTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;

        public ActivitiesApiTests(WebApplicationFactory<Program> factory)
        {
            // Create a client for the test server
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task GetActivities_ReturnsOk()
        {
            // Act: send a GET request to /api/activities
            var response = await _client.GetAsync("/api/activities");

            // Assert: verify that the response is OK (HTTP 200)
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task GetActivitiesBySport_ReturnsFilteredData()
        {
            // Act: send a GET request to /api/activities/bySport?sport=running
            var response = await _client.GetAsync("/api/activities/bySport?sport=running");

            // Assert: verify that the response is OK and contains expected data
            response.EnsureSuccessStatusCode(); // Throws if not 2xx

            var content = await response.Content.ReadAsStringAsync();
            Assert.Contains("running", content, System.StringComparison.InvariantCultureIgnoreCase);
        }
    }
}