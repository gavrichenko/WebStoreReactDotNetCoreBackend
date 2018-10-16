﻿using System.Threading.Tasks;
using GavrReactDotNetCoreBackend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace GavrReactDotNetCoreBackend.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
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
                return this.Ok(response);
            }
            return this.BadRequest();
        }

        //[Route("login")]
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Login([FromBody]LoginModel model)
        //{
        //    var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, false);
        //    if (result.Succeeded)
        //    {
        //        // проверяем, принадлежит ли URL приложению
        //        if (!string.IsNullOrEmpty(model.ReturnUrl) && Url.IsLocalUrl(model.ReturnUrl))
        //        {
        //            return Redirect(model.ReturnUrl);
        //        }
        //        else
        //        {
        //            return this.Unauthorized();
        //        }
        //    }
        //    else
        //    {
        //        return this.BadRequest();
        //    }
        //}
    }
}
