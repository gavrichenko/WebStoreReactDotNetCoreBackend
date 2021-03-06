﻿using GavrReactDotNetCoreBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;


namespace GavrReactDotNetCoreBackend.Controllers
{
    [Authorize(Roles = "admin")]
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

        [Route("getRoleByUserName")]
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetRoleByUserName(string userName)
        {
            var user = await this._userManager.FindByNameAsync(userName);
            if (user == null)
            {
                return this.BadRequest("User was not found");
            }
            var role = await this._userManager.GetRolesAsync(user);
            return this.Ok(role);
        }

        [HttpGet]
        public IActionResult Index()
        {
            // get all exist roles from db
            var result = _roleManager.Roles.ToList();
            return this.Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(string roleName)
        {          
            if (!string.IsNullOrEmpty(roleName))
            {
                var result = await _roleManager.CreateAsync(new IdentityRole(roleName));
                if (result.Succeeded)
                {
                    return this.Ok();
                }              
            }
            return this.BadRequest();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string id)
        {
            var role = await _roleManager.FindByIdAsync(id);
            if (role != null)
            {
                var result = await _roleManager.DeleteAsync(role);
                if (result.Succeeded)
                    return this.Ok(id);
            }
            return this.BadRequest();
        }

        [Route("assign")]
        [HttpPost]
        public async Task<IActionResult> AssignRole(string userName, string roleName)
        {
            if (!string.IsNullOrEmpty(userName))
            {
                var user = await this._userManager.FindByNameAsync(userName);
                if (user != null)
                {
                    var result = await this._userManager.AddToRoleAsync(user, roleName);
                    if (result.Succeeded)
                    {
                        return this.Ok();
                    }                   
                }
            }
            return this.BadRequest();
        }
    }
}
