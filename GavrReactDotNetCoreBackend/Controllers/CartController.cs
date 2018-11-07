using GavrReactDotNetCoreBackend.Models;

using Microsoft.AspNetCore.Mvc;

namespace GavrReactDotNetCoreBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : Controller
    {
        private readonly ApplicationContext _appDbContext;

        public CartController(ApplicationContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
    }
}