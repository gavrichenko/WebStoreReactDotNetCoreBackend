using System;
using System.Collections.Generic;
using System.Linq;
using GavrReactDotNetCoreBackend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace GavrReactDotNetCoreBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : Controller
    {
        private readonly ApplicationContext _appDbContext;

        public OrderController(ApplicationContext appDbContext)
        {
            _appDbContext = appDbContext;
        }


        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody]OrderModel model)
        {
            try
            {
            var productsColection = new List<ProductModel>();

            foreach (var item in model.Items)
            {
                var product = _appDbContext.Products.Find(item.Product.Id);
                if (product == null)
                {
                    return this.BadRequest($"Product with ID '{item.Product.Id}' was not found");
                }
                else
                {
                    product.Quantity = item.Product.Quantity;
                    productsColection.Add(product);
                }
            }
                var order = new OrderModel()
                {
                    AdditionalInfo = model.AdditionalInfo,
                    Customer = model.Customer,
                    Phone = model.Phone,
                    PurchaseDate = DateTime.Now,
                };
                await this._appDbContext.Orders.AddAsync(order);
                await this._appDbContext.SaveChangesAsync();

                foreach (var product in productsColection)
                {
                    var orderItem = new OrderItemModel()
                    {
                        Product = product,
                        Order = order,
                        Quantity = product.Quantity,
                    };           
                    await this._appDbContext.OrderItems.AddAsync(orderItem);
                    await this._appDbContext.SaveChangesAsync();
                }

                await this._appDbContext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                this.BadRequest(e);
                throw;
            }
            return this.Ok();

        }
    }
}