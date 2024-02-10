using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TaskManagementSystem.Server.Services;
using TaskManagementSystem.Server.ViewModels.UserViewModels;

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
            var countries = _constantsService.GetCountries();
            return Ok(countries); 
        }
    }
}
