using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;

namespace GavrReactDotNetCoreBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileUploadController : Controller
    {
        //todo: role shall be is admin only
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> AddFile(IFormFile file)
        {
            var subDomenName = "\\image.gavrichenko.ru";
            var currentAppDirectory = Directory.GetCurrentDirectory();
            var pathToStore = Path.Combine(Directory.GetParent(currentAppDirectory).FullName + subDomenName, "flowers", file.FileName);
            if (file.Length > 0)
            {
                using (var stream = new FileStream(pathToStore, FileMode.Create, FileAccess.Write))
                    await file.CopyToAsync(stream);
            }
            else
            {
                return this.BadRequest();
            }
            var url = $"http://image.gavrichenko.ru/flowers/{file.FileName}";
            return this.Ok(new { url = url });
        }
    }
}