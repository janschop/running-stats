using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RunningStats.Data;
using RunningStats.Models;
using Microsoft.Extensions.Logging;

namespace RunningStats.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivitiesController : ControllerBase
    {
        private readonly RunningStatsContext _context;
        private readonly ILogger<ActivitiesController> _logger;

        public ActivitiesController(RunningStatsContext context, ILogger<ActivitiesController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/activities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Activity>>> GetActivities()
        {
            var activities = await _context.Activities.ToListAsync();
            return Ok(activities);
        }
        // GET: api/activities/bySport?sport=running
        [HttpGet("bySport")]
        public async Task<ActionResult<IEnumerable<Activity>>> GetActivitiesBySport([FromQuery] string sport)
        {
            _logger.LogInformation("Fetching activities for sport: {Sport}", sport);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var activities = await _context.Activities
                    .Where(a => a.Sport == sport)
                    .OrderByDescending(a => a.Training_Load)
                    // .Select(a => a.Training_Load)
                    .ToListAsync();

                _logger.LogInformation("Fetched {Count} activities", activities.Count);
                return Ok(activities);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching activities for sport: {Sport}", sport);
                return StatusCode(500, "An error occurred while retrieving data.");
            }
        }
    }
}
