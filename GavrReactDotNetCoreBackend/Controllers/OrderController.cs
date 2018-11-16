using GavrReactDotNetCoreBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
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
        public async Task<IActionResult> CreateOrder([FromBody] OrderModel model)
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

        [AllowAnonymous]
        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetOrder([FromRoute] int id)
        {
            var order = await this._appDbContext.Orders.FirstOrDefaultAsync(o => o.Id == id);
            if (order != null)
            {
                var items = this._appDbContext.OrderItems.Include(i => i.Product)
                    .Where(i => i.Order.Id == id)
                    .ToList()
                    .Select(model => new {model.Quantity, model.Product});

                var res = new
                {
                    order.Id,
                    order.PurchaseDate,
                    order.Customer,
                    order.Phone,
                    order.AdditionalInfo,
                    items
                };

                return this.Ok(res);
            }

            return this.NotFound($"Order with ID '{id}' was not found");
        }

        [AllowAnonymous]
        [Route("user/{userName}")]
        [HttpGet]
        public async Task<IActionResult> GetOrdersByCustomer([FromRoute] string userName)
        {
  
            var orders = await this._appDbContext.Orders
                .Include(o => o.Items)
                .ThenInclude(i => i.Product)
                .Where(u => u.Customer == userName)
                .ToListAsync();

            var res = new ArrayList();

            foreach (var order in orders)
            {
                var items = this._appDbContext.OrderItems.Include(i => i.Product)
                    .Where(i => i.Order.Id == order.Id)
                    .ToList()
                    .Select(model => new { model.Quantity, model.Product });

                var ItemsOrder = new
                {
                    order.Id,
                    order.PurchaseDate,
                    order.Customer,
                    order.Phone,
                    order.AdditionalInfo,
                    items
                };

                res.Add(ItemsOrder);
            }

            return this.Ok(res);
        }

        //todo: admin only
        [AllowAnonymous]
        [HttpGet]
        public OkObjectResult GetAll()
        {
            var orders = this._appDbContext.Orders
                .ToList()
                .Select(o => new { o.Id, o.Customer, o.Phone, o.AdditionalInfo, o.PurchaseDate, o.isLogged });
            return this.Ok(orders);
        }

        //todo: admin only
        [AllowAnonymous]
        [Route("GetAllWithPrice")]
        [HttpGet]
        public OkObjectResult GetAllWithTotalPrice()
        {
            var totalPrice = 0;
            var orders = this._appDbContext.Orders
                .Include(o => o.Items)
                .ThenInclude(i => i.Product)
                .ToList();

            foreach (var order in orders)
            {

                var orderPrice = 0;

                foreach (var item in order.Items)
                {
                    var price = item.Product.Price;
                    var quantity = item.Quantity;
                    totalPrice += price * quantity;
                    orderPrice += price * quantity;
                }

                order.AdditionalInfo = orderPrice.ToString();

            }

            var res = new
            {
                totalPrice,
                orders = orders.Select(o => new
                {
                    o.Id,
                    o.Customer,
                    o.Phone,
                    o.PurchaseDate,
                    o.isLogged,
                    totalPrice = Convert.ToInt32(o.AdditionalInfo)
                })
            };

            return this.Ok(res);
        }

    }
}