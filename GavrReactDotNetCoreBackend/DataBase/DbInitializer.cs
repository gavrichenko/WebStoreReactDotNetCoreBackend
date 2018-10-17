using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GavrReactDotNetCoreBackend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace GavrReactDotNetCoreBackend.DataBase
{
    public class DbInitializer
    {
        // creating admin user and add "user" and "admin" roles
        public static async Task InitializeAsync(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, ApplicationContext appDbContext)
        {
            string adminEmail = "admin@admin.com";
            string password = "paswrd123";

            if (await roleManager.FindByNameAsync("admin") == null)
            {
                await roleManager.CreateAsync(new IdentityRole("admin"));
            }
            if (await roleManager.FindByNameAsync("user") == null)
            {
                await roleManager.CreateAsync(new IdentityRole("user"));
            }
            if (await userManager.FindByNameAsync(adminEmail) == null)
            {
                var admin = new User { Email = adminEmail, UserName = adminEmail };
                var result = await userManager.CreateAsync(admin, password);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, "admin");
                    var _c = new CustomerModel()
                    {
                        Birthday = null,
                        FirstName = "Ilya",
                        LastName = "GavrAdmin",
                        Gender = "male",
                        Location = "rus",
                        Phone =  89605459169 as int?,
                        
                    };
                    await appDbContext.Customers.AddAsync(new CustomerModel
                    {
                        IdentityId = admin.Id,
                        Birthday = _c.Birthday,
                        FirstName = _c.FirstName,
                        LastName = _c.LastName,
                        Gender = _c.Gender,
                        Location = _c.Location,
                        Phone = _c.Phone
                    });
                    await appDbContext.SaveChangesAsync();
                }
            }
        }

        internal static Task InitializeAsync(UserManager<User> userManager, RoleManager<IdentityRole> rolesManager, DbSet<CustomerModel> dbContext)
        {
            throw new NotImplementedException();
        }
    }
}
