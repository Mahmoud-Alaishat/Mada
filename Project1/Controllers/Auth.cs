﻿using Microsoft.AspNetCore.Http;
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
                return Ok(new AuthenticatedResponse { Token = token });
            }
        }

        [HttpPost]
        [Route("Register")]
        public IActionResult Register([FromBody] Users user)
        {
            return Ok(new UserToken {Userid= userService.Register(user) } ); 
            
        }
        [HttpGet]
        [Route("GenerateCode")]
        public IActionResult GenerateCode([FromBody] CodeVerification code)
        {
            var random = new Random().Next(100000,1000000).ToString();
            if(random == code.Code)
            {
                return Ok(random);
            }
            return BadRequest();             
        }
        [HttpPost]
        [Route("EmailConfirmation")]
        public void EmailConfirmation([FromBody] ConfirmEmail confirmEmail)
        {
            userService.ConfirmEmail(confirmEmail);
            
        }




    }
}
