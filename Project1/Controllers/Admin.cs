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
            return Ok(userService.CountUsers());
        }

        [HttpGet]
        [Route("commentCount")]
        public IActionResult CommentCount()
        {
            return Ok(commentService.CountComments());
        }

        [HttpGet]
        [Route("GetUseractivities")]
        public IActionResult GetUseractivities()
        {
            return Ok(adminService.GetUseractivities());
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

        [HttpDelete]
        [Route("DeleteUser/{userId}")]
        public IActionResult DeleteUser(string userId)
        {
            adminService.DeleteUser(userId);
            return Ok();
        }

        [HttpGet]
        [Route("GetLast2FeedBack")]
        public IActionResult GetLast2FeedBack()
        {
            return Ok(adminService.GetLast2FeedBack());
        }

        [HttpGet]
        [Route("GetLast2Reports")]
        public IActionResult GetLast2Reports()
        {
            return Ok(adminService.GetLast2Reports());
        }

        [HttpGet]
        [Route("GetFeedBack")]
        public IActionResult GetFeedBack()
        {
            return Ok(adminService.GetFeedBack());
        }

        [HttpGet]
        [Route("GetReport")]
        public IActionResult GetReport()
        {
            return Ok(adminService.GetReport());
        }

        [HttpPost]
        [Route("AcceptReport")]
        public IActionResult AcceptReport(ReportDto report)
        {
            adminService.AcceptReport(report);
            EmailDto emailDto = new EmailDto();
            emailDto.To = report.Email;
            emailDto.Subject = "#"+report.Id+" Report result";
            emailDto.Body = "Hello "+report.FirstName+" "+report.LastName+"<br> "+ "at Mada we are always seeking for a safe environment where everybody can talk whatever they want but,still, there are some rules to follow, and unfortunately we found that the content that you have posted goes against these rules and therefore we have decided to delete that content<br>"+
                            "Post content: "+"<strong>"+report.Content+"<strong/>"+"<br>"+
                            "if you have any questions please contact us on the contact us page and, provide us with the report number in the subject section<br>"+
                            "<strong>Mada Team<strong/>";
            emailService.SendEmail(emailDto);
            return Ok();
        }

        [HttpPost]
        [Route("RejectReport")]
        public IActionResult RejectReport(ReportDto report)
        {
            adminService.RejectReport(report);
            return Ok();
        }
    }
}
