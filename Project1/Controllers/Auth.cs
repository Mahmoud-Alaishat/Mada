using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project.core.Data;
using project.core.DTO;
using project.core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Auth : ControllerBase
    {
        private readonly IUserService userService;

        public Auth(IUserService userService)
        {
            this.userService = userService;
        }
        [HttpPost]
        [Route("Login")]
        public ActionResult Login([FromBody]Login login)
        {
            var token = userService.Login(login);
            if (token == null)
            {
                return Unauthorized();
            }
            else
            {
                return Ok(token);
            }
        }

        [HttpPost]
        [Route("Register")]
        public void Register([FromBody] User user)
        {
            userService.Register(user);
        }

   


    }
}
