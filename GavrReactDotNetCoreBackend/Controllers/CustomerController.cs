using System.Threading.Tasks;
using GavrReactDotNetCoreBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace GavrReactDotNetCoreBackend.Controllers
{
    [Authorize(Roles = "admin, user")]
    [Route("api/[controller]")]
    public class CustomerController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ApplicationContext _appDbContext;

        public CustomerController(UserManager<User> userManager, SignInManager<User> signInManager, ApplicationContext appDbContext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appDbContext = appDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetCustomer(string userName)
        {
            var user = await this._userManager.FindByNameAsync(userName);
            var customer = await _appDbContext.Customers.Include(c => c.Identity).SingleAsync(c => c.Identity.Id == user.Id);
            if (customer != null)
            {
                return new OkObjectResult(new
                {
                    customer.Identity.Email,
                    customer.FirstName,
                    customer.LastName,
                    customer.Birthday,
                    customer.Gender,
                    customer.Location,
                    customer.Phone
                });
            }
            return this.BadRequest();
        }
    }
}
