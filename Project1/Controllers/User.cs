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
    public class User : ControllerBase
    {
        private readonly ICommentService commentService;
        private readonly IContactUsService contactUsService;
        private readonly IUserService userService;
        private readonly IFriendService friendService;

        public User(ICommentService commentService, IContactUsService contactUsService, IUserService userService, IFriendService friendService)
        {
            this.commentService = commentService;
            this.contactUsService = contactUsService;
            this.userService = userService;
            this.friendService = friendService; 
        }

        [HttpPost]
        [Route("ContactUs")]
        public IActionResult ContactUs(ContactUs contactUs)
        {
            contactUsService.Create(contactUs);
            return Ok();
        }
        [HttpGet]
        [Route("GetUserInfo/{Id}")]
        public IActionResult GetUserById(string Id)
        {
            var user = userService.GetUserById(Id);
            UserInfo userInfo = new UserInfo();
            userInfo.FirstName = user.FirstName;
            userInfo.LastName = user.LastName;
            userInfo.ProfilePath = user.ProfilePath;
            userInfo.CoverPath = user.CoverPath;
            userInfo.Address = user.Address;
            userInfo.Bio = user.Bio;
            userInfo.Relationship = user.Relationship;
            return Ok(userInfo);
        }
        [HttpGet]
        [Route("CountFriends/{userId}")]
        public IActionResult CountFriends(string userId)
        {
            return Ok(friendService.CountFriends(userId));

        }
    }
}
