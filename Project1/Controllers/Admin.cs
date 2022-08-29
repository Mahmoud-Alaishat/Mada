using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    public class Admin : ControllerBase
    {
        private readonly IUserService userService;
        private readonly ICommentService commentService;
        private readonly IAdminService adminService;
        private readonly IEmailService emailService;

        public Admin(IUserService userService,
               ICommentService commentService,
               IAdminService adminService,
               IEmailService emailService)
        {
            this.userService = userService;
            this.commentService = commentService;
            this.adminService = adminService;
            this.emailService = emailService;
        }
        [HttpGet]
        [Route("userCount")]
        public IActionResult UserCount()
        {
            var uCount = (userService.CountUsers().Count)-1;
            return Ok(new UserCount { Count = uCount });
        }

        [HttpGet]
        [Route("commentCount")]
        public IActionResult CommentCount()
        {
            return Ok(commentService.CountComments());
        }



        [HttpGet]
        [Route("CountVideoImage")]
        public IActionResult CountVideoImage()
        {
            return Ok(adminService.CountVideoImage());
        }

        [HttpGet]
        [Route("CountLikeCommentPostAd")]
        public IActionResult CountLikeCommentPostAd()
        {
            return Ok(adminService.CountLikeCommentPostAd());
        }

        [HttpPost]
        [Route("BlockAdvertisement/{postId}")]
        public IActionResult BlockAdvertisement(int postId)
        {
            adminService.BlockAdvertisement(postId);
            return Ok();
        }

        [HttpPost]
        [Route("UnBlockAdvertisement/{postId}")]
        public IActionResult UnBlockAdvertisement(int postId)
        {
            adminService.UnBlockAdvertisement(postId);
            return Ok();
        }
        [HttpGet]
        [Route("GetUserAndSubscription")]
        public IActionResult GetUserAndSubscription()
        {
            return Ok(adminService.GetUserAndSubscription());
        }

        [HttpGet]
        [Route("GetUseractivities")]
        public IActionResult GetUseractivities()
        {
            return Ok(adminService.GetUseractivities());
        }
    }
}
