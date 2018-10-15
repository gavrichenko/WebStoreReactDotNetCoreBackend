using System.Threading.Tasks;
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
            User user = new User { Email = model.Email, UserName = model.Email };
            // добавляем пользователя
            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                var response = new { user.Id, user.UserName };
                return Ok(response);
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
        //        return this.Ok();
        //    }
        //    else
        //    {
        //        return this.Unauthorized();
        //    }
            //if (result.Succeeded)
            //{
            //    // проверяем, принадлежит ли URL приложению
            //    if (!string.IsNullOrEmpty(model.ReturnUrl) && Url.IsLocalUrl(model.ReturnUrl))
            //    {
            //        return Redirect(model.ReturnUrl);
            //    }
            //    else
            //    {
            //        return RedirectToAction("Index", "Home");
            //    }
            //}
            //else
            //{
            //    ModelState.AddModelError("", "Неправильный логин и (или) пароль");
            //}          
        //}
    }
}
