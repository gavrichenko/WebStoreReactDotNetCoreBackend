using GavrReactDotNetCoreBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;


namespace GavrReactDotNetCoreBackend.Controllers
{

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

        [Route("{userName}")]
        [Authorize(Roles = "admin, user")]
        [HttpGet]
        public async Task<IActionResult> GetCustomer([FromRoute] string userName)
        {
            var user = await this._userManager.FindByNameAsync(userName);
            var customer = await _appDbContext.Customers
                .Include(c => c.Identity)
                .SingleAsync(c => c.Identity.Id == user.Id);
            if (customer != null)
            {
                return new OkObjectResult(new
                {
                    customer.Identity.Email,
                    customer.FirstName,
                    customer.LastName,
                    customer.Birthday,
                    customer.Gender,
                    customer.City,
                    customer.Phone
                });
            }
            return this.BadRequest();
        }

        [Route("{userName}")]
        [Authorize(Roles = "admin, user")]
        [HttpPut]
        public async Task<IActionResult> UpdateCustomer([FromRoute] string userName,[FromBody]CustomerModel model)
        {
            var user = await this._userManager.FindByNameAsync(userName);
            var customer = await _appDbContext.Customers
                .Include(c => c.Identity)
                .SingleAsync(c => c.Identity.Id == user.Id);
            if (model.FirstName == null || model.LastName == null) return this.BadRequest("The firstname and lastname is required");

            customer.FirstName = model.FirstName;
            customer.LastName = model.LastName;
            customer.Birthday = model.Birthday;
            customer.Gender = model.Gender;
            customer.City = model.City;
            customer.Phone = model.Phone;

            await this._appDbContext.SaveChangesAsync();
            var res = new {customer.FirstName, customer.LastName};
            return this.Ok(res);
        }

        [Authorize(Roles = "admin")]
        [Route("customers")]
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = this._appDbContext.Customers
                .Include(c => c.Identity.UserName)
                .Select(c => new { Email = c.Identity.UserName , c.FirstName, c.LastName })
                .OrderBy(c => c.LastName);
            return this.Ok(users);
        }
    }
}
