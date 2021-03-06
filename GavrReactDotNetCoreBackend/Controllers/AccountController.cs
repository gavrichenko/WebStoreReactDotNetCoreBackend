﻿using GavrReactDotNetCoreBackend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace GavrReactDotNetCoreBackend.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ApplicationContext _appDbContext;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, ApplicationContext appDbContext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appDbContext = appDbContext;
        }

        [Route("logout")]
        [HttpPost]
        public async Task<IActionResult> Logout(string userName)
        {
            var user = await this._userManager.FindByNameAsync(userName);
            if (user == null)
            {
                return this.BadRequest("User was not found");
            }
            var result = await _userManager.UpdateSecurityStampAsync(user);
            return this.Ok(result);


        }

        [Route("register")]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody]RegisterModel model)
        {           
            var user = new User { Email = model.Email, UserName = model.Email };
            // creating user          
            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                // set "user" role by default
                await this._userManager.AddToRoleAsync(user, "user");
                var response = new { user.Id, user.UserName };

                await _appDbContext.Customers.AddAsync(new CustomerModel { IdentityId = user.Id, FirstName = model.FirstName, LastName = model.LastName});
                await _appDbContext.SaveChangesAsync();

                return this.Ok(response);
            }
            return this.BadRequest();
        }
    }
}
