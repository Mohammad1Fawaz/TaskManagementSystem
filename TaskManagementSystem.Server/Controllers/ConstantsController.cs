using Microsoft.AspNetCore.Mvc;
using TaskManagementSystem.Server.Services;

namespace TaskManagementSystem.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ConstantsController : ControllerBase
    {
        private readonly ConstantsService _constantsService;
        private readonly ILogger<ConstantsController> _logger;

        public ConstantsController(ILogger<ConstantsController> logger, ConstantsService constantsService)
        {
            _logger = logger;
            _constantsService = constantsService;
        }

        [HttpGet("countries")]
        public IActionResult GetCountries()
        {
            try
            {
                var countries = _constantsService.GetCountries();
                return Ok(countries);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error fetching user roles: " + ex.Message);
                return BadRequest(new
                {
                    success = false,
                    message = "Something went wrong,please contact support."
                });
            }
        }

        [HttpGet("permissions")]
        public IActionResult GetPermissions()
        {
            try
            {
                var permissions = _constantsService.GetPermissions();
                return Ok(permissions);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error fetching user roles: " + ex.Message);
                return BadRequest(new
                {
                    success = false,
                    message = "Something went wrong,please contact support."
                });
            }
        }
    }
}
