using System.Threading.Tasks;
using GavrReactDotNetCoreBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GavrReactDotNetCoreBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
    {
        private readonly ApplicationContext _appDbContext;

        public ProductController(ApplicationContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        //[Authorize(Roles = "admin")]
        [Route("products")]
        [HttpGet]
        public IActionResult GetAllProducts()
        {
            var products = this._appDbContext.Products;
            return this.Ok(products);
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetProduct([FromRoute] int id)
        {
            var product = await this._appDbContext.Products.SingleAsync(model => model.Id == id );
            if (product != null)
            {
                return this.Ok(product);
            }
            return this.BadRequest($"The product was not found by id {id}");
        }

        //[Authorize(Roles = "admin")]
        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody]ProductModel model)
        {
            var product = new ProductModel()
            {
                Name = model.Name,
                Description = model.Description,
                Price = model.Price,
                Rating = model.Rating,
                Image = model.Image
            };

            await this._appDbContext.Products.AddAsync(product);
            await this._appDbContext.SaveChangesAsync();
            return this.Ok(product.Id);
        }

        //[Authorize(Roles = "admin")]
        [Route("{id}")]
        [HttpPut]
        public async Task<IActionResult> UpdateProduct([FromRoute] int id, [FromBody]ProductModel model)
        {
            var product = await this._appDbContext.Products.SingleAsync(p => p.Id == id);
            if (product != null)
            {
                product.Name = model.Name;
                product.Description = model.Description;
                product.Price = model.Price;
                product.Rating = model.Rating;
                product.Image = model.Image;

                await this._appDbContext.SaveChangesAsync();
                return this.Ok(product.Id);
            }
            return this.BadRequest($"The product was not updated by id {id}");
        }

        //[Authorize(Roles = "admin")]
        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteProduct([FromRoute] int id)
        {
            var product = await this._appDbContext.Products.SingleAsync(model => model.Id == id);
            if (product != null)
            {
                this._appDbContext.Products.Remove(product);
                await this._appDbContext.SaveChangesAsync();
                return this.Ok(product.Id);
            }
            return this.BadRequest($"The product was not deleted by id {id}");
        }
    }
}
