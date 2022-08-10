using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project.core.Data;
using project.core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class User : ControllerBase
    {
        private readonly ICommentService commentService;
        private readonly IContactUsService contactUsService;

        public User(ICommentService commentService, IContactUsService contactUsService)
        {
            this.commentService = commentService;
            this.contactUsService = contactUsService;   
        }

        [HttpPost]
        [Route("ContactUs")]
        public IActionResult ContactUs(ContactUs contactUs)
        {
            contactUsService.Create(contactUs);
            return Ok();
        }
    }
}
