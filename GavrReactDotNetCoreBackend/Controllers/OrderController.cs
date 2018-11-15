using GavrReactDotNetCoreBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GavrReactDotNetCoreBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : Controller
    {
        private readonly ApplicationContext _appDbContext;
        private readonly UserManager<User> _userManager;

        public OrderController(UserManager<User> userManager, ApplicationContext appDbContext)
        {
            _appDbContext = appDbContext;
            _userManager = userManager;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] OrderModel model)
        {
            var productsColection = new List<ProductModel>();
            User customer = null;

            // check user
            if (model.isLogged)
            {
                var user = await this._userManager.FindByNameAsync(model.Customer);
                if (user == null)
                {
                    return this.NotFound($"User {model.Customer} was not found");
                }

                customer = user;
            }

            // creating order
            var order = new OrderModel()
            {
                AdditionalInfo = model.AdditionalInfo,
                Customer = model.Customer,
                Phone = model.Phone,
                PurchaseDate = DateTime.Now,
            };
            if (model.isLogged)
            {
                order.isLogged = true;
                order.Identity = customer;
            }

            await this._appDbContext.Orders.AddAsync(order);

            foreach (var item in model.Items)
            {
                // check product
                var product = _appDbContext.Products.Find(item.Product.Id);
                if (product == null)
                {
                    return this.NotFound($"Product with ID '{item.Product.Id}' was not found");
                }

                productsColection.Add(product);

                //creating orderItem
                var orderItem = new OrderItemModel() {Product = product, Order = order, Quantity = item.Quantity};
                await this._appDbContext.OrderItems.AddAsync(orderItem);
            }

            await this._appDbContext.SaveChangesAsync();

            return this.Created("orderId", new {orderId = order.Id});
        }
    }
}