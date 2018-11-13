using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using GavrReactDotNetCoreBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace GavrReactDotNetCoreBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileUploadController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ApplicationContext _appDbContext;
        private readonly IHostingEnvironment _appEnvironment;

        public FileUploadController(UserManager<User> userManager, SignInManager<User> signInManager,
            ApplicationContext appDbContext, IHostingEnvironment appEnvironment)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appDbContext = appDbContext;
            _appEnvironment = appEnvironment;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> AddFile(IFormFile file)
        {
            //// Full path to file in temp location
            ////var filePath = Path.GetTempFileName();
            //string filePath = "/image.gavrichenko.ru/" + file.FileName;

            //if (file.Length > 0)
            //    using (var stream = new FileStream(filePath, FileMode.Create))
            //        await file.CopyToAsync(stream);

            //// Process uploaded files

            //return Ok(new { count = 1, path = filePath });
          //  Console.WriteLine(_appEnvironment);
            return Ok(new { count = 1, path = _appEnvironment.ContentRootPath });
        }
        //[AllowAnonymous]
        //[HttpPost]
        //public async Task<IActionResult> AddFile(IFormFile uploadedFile)
        //{
        //    if (uploadedFile != null)
        //    {
        //        string path = "/image.gavrichenko.ru/" + uploadedFile.FileName;
        //        using (var fileStream = new FileStream(_appEnvironment.WebRootPath + path, FileMode.Create))
        //        {
        //            await uploadedFile.CopyToAsync(fileStream);
        //        }

        //        FileModel file = new FileModel {Name = uploadedFile.FileName, Path = path};
        //        return this.Ok(file);

        //    }

        //    return this.BadRequest("ERROROROR");
        //}
    }
}