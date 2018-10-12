using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GavrReactDotNetCoreBackend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace GavrReactDotNetCoreBackend.Controllers
{
    [Route("api/[controller]")]
    public class RolesController : Controller
    {
        RoleManager<IdentityRole> _roleManager;
        UserManager<User> _userManager;

        public RolesController(RoleManager<IdentityRole> roleManager, UserManager<User> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }

        [Route("create")]
        [HttpPost]
        public async Task<IActionResult> CreateRole(string roleName)
        {          
            if (!string.IsNullOrEmpty(roleName))
            {
                IdentityResult result = await _roleManager.CreateAsync(new IdentityRole(roleName));
                if (result.Succeeded)
                {
                    return Ok();
                }              
            }
            return this.BadRequest();
        }

        [Route("assign")]
        [HttpPost]
        public async Task<IActionResult> AssignRole(string userName)
        {
            if (!string.IsNullOrEmpty(userName))
            {
                var user = await this._userManager.FindByNameAsync(userName);
                if (user != null)
                {
                    var result = await this._userManager.AddToRoleAsync(user, "admin");
                    if (result.Succeeded)
                    {
                        return Ok();
                    }                   
                }
            }
            return this.BadRequest();
        }

        //[HttpPost]
        //public async Task<IActionResult> Delete(string id)
        //{
        //    IdentityRole role = await _roleManager.FindByIdAsync(id);
        //    if (role != null)
        //    {
        //        IdentityResult result = await _roleManager.DeleteAsync(role);
        //    }
        //    return RedirectToAction("Index");
        //}

        //public IActionResult UserList() => View(_userManager.Users.ToList());

        //public async Task<IActionResult> Edit(string userId)
        //{
        //    // получаем пользователя
        //    User user = await _userManager.FindByIdAsync(userId);
        //    if (user != null)
        //    {
        //        // получем список ролей пользователя
        //        var userRoles = await _userManager.GetRolesAsync(user);
        //        var allRoles = _roleManager.Roles.ToList();
        //        ChangeRoleViewModel model = new ChangeRoleViewModel
        //        {
        //            UserId = user.Id,
        //            UserEmail = user.Email,
        //            UserRoles = userRoles,
        //            AllRoles = allRoles
        //        };
        //        return View(model);
        //    }

        //    return NotFound();
        //}
        //[HttpPost]
        //public async Task<IActionResult> Edit(string userId, List<string> roles)
        //{
        //    // получаем пользователя
        //    User user = await _userManager.FindByIdAsync(userId);
        //    if (user != null)
        //    {
        //        // получем список ролей пользователя
        //        var userRoles = await _userManager.GetRolesAsync(user);
        //        // получаем все роли
        //        var allRoles = _roleManager.Roles.ToList();
        //        // получаем список ролей, которые были добавлены
        //        var addedRoles = roles.Except(userRoles);
        //        // получаем роли, которые были удалены
        //        var removedRoles = userRoles.Except(roles);

        //        await _userManager.AddToRolesAsync(user, addedRoles);

        //        await _userManager.RemoveFromRolesAsync(user, removedRoles);

        //        return RedirectToAction("UserList");
        //    }

        //    return NotFound();
        //}
    }
}
