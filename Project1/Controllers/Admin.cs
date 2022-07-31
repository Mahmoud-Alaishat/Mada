using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project.core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Admin : ControllerBase
    {
        private readonly IUserService userService;

        public Admin(IUserService userService)
        {
            this.userService = userService;
        }
        public ActionResult UserCount()
        {
            var uCount = userService.CountUsers();
            return Ok(uCount);
        }
    }
}
