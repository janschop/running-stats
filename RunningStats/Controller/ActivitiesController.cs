using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RunningStats.Data;
using RunningStats.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RunningStats.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivitiesController : ControllerBase
    {
        private readonly RunningStatsContext _context;

        public ActivitiesController(RunningStatsContext context)
        {
            _context = context;
        }

        // GET: api/activities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Activity>>> GetActivities()
        {
            return await _context.Activities.ToListAsync();
        }

        [HttpGet("bySport")]
        public async Task<ActionResult<IEnumerable<Activity>>> GetActivitiesBySport([FromQuery] string sport)
        {
            var activities = await _context.Activities
                .Where(a => a.Sport == sport)
                .OrderByDescending(a => a.Training_Load)
                // .Select(a => a.Training_Load)
                .ToListAsync();

            return Ok(activities);
        }

    }
}
