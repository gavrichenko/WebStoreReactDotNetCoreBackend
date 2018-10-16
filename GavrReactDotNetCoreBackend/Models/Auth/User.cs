using Microsoft.AspNetCore.Identity;

namespace GavrReactDotNetCoreBackend.Models
{
    public class User : IdentityUser
    {
        public int testProp { get; set; }
    }
}
