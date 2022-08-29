﻿using Microsoft.AspNetCore.Authorization;
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
        [Route("UserStory")]
        public IActionResult UserStory()
        {
            return Ok(adminService.UserStory());
        }

        [HttpPost]
        [Route("BlockStory/{storyId}")]
        public IActionResult BlockStory(int storyId)
        {
            adminService.BlockStory(storyId);
            return Ok();
        }

        [HttpPost]
        [Route("UnBlockStory/{storyId}")]
        public IActionResult UnBlockStory(int storyId)
        {
            adminService.UnBlockStory(storyId);
            return Ok();
        }
        [HttpGet]
        [Route("RevenueDetails")]
        public IActionResult RevenueDetails()
        {
            return Ok(adminService.RevenueDetails());  
        }
        [HttpGet]
        [Route("UpdateDesign")]
        public IActionResult UpdateDesign(Design design)
        {
            return Ok(adminService.UpdateDesign(design));
        }

        [HttpGet]
        [Route("GetDesignById")]
        public IActionResult GetDesignById(string designId)
        {
            return Ok(adminService.GetDesignById(designId));
        }

        [HttpGet]
        [Route("GetUseractivities")]
        public IActionResult GetUseractivities()
        {
            return Ok(adminService.GetUseractivities());
        }

        [HttpDelete]
        [Route("DeleteUser/{userId}")]
        public IActionResult DeleteUser(string userId)
        {
            adminService.DeleteUser(userId);
            return Ok();
        }

        [HttpGet]
        [Route("GetLast2Reports")]
        public IActionResult GetLast2Reports()
        {
            return Ok(adminService.GetLast2Reports());
        }

        [HttpGet]
        [Route("GetLast2FeedBack")]
        public IActionResult GetLast2FeedBack()
        {
            return Ok(adminService.GetLast2FeedBack());
        }

        [HttpGet]
        [Route("GetReport")]
        public IActionResult GetReport()
        {
            return Ok(adminService.GetReport());
        }

        [HttpGet]
        [Route("GetFeedBack")]
        public IActionResult GetFeedBack()
        {
            return Ok(adminService.GetFeedBack());
        }

        [HttpPost]
        [Route("AcceptReport")]
        public IActionResult AcceptReport(ReportDto report)
        {
          var result = adminService.AcceptReport(report);
            EmailDto email = new EmailDto();
            email.To = result.Email;
            email.Subject = "#"+result.Id+" Report result";
            email.Body = "Hello "+"<strong>"+result.FirstName+" "+ result.LastName+"</strong>"+"<br><br>"+
                         "Here at Mada we are always seeking for a safe environment where everyone can express their thoughts,<br>still, there are some rules that everybody should follow to ensure a safe and healthy atmosphere.<br><br>"+
                         "And after taking a close look at the last content you posted we found that this content goes against our rules and therefore we decided to <strong style='color:red'>delete</strong> it<br><br>"+
                         "We believe in the open door approach so, you can always contact us if you believe something is wrong "+
                         "please put the report number in the email subject so we could help you easily you can also use our contact us form page<br><br><br>"+
                         "<strong>Mada Team</strong>";
            emailService.SendEmail(email);
            return Ok();
        }

        [HttpPost]
        [Route("RejectReport")]
        public IActionResult RejectReport(ReportDto report)
        {
            adminService.RejectReport(report);
            return Ok();
        }

        [HttpGet]
        [Route("GetTopPostSeen")]
        public IActionResult GetTopPostSeen()
        {
            return Ok(adminService.GetTopPostSeen());

        }
        [HttpPost]
        [Route("ReplyContactUs")]
        public IActionResult ReplyContactUs([FromBody]EmailDto email)
        {
            emailService.SendEmail(email);
            return Ok();
        }

    }
}
