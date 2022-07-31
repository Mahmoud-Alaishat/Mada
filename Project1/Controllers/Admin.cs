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
        private readonly ICommentService commentService;

        public Admin(IUserService userService,
               ICommentService commentService)
        {
            this.userService = userService;
            this.commentService = commentService;
        }
        [HttpGet]
        [Route("userCount")]
        public ActionResult UserCount()
        {
            var uCount = userService.CountUsers();
            return Ok(uCount);
        }
        [HttpGet]
        [Route("commentCount")]
        public ActionResult CommentCount()
        {
            var cCount = commentService.CountComments();
            return Ok(cCount);
        }
    }
}
