using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project.core.Data;
using project.core.DTO;
using project.core.Service;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
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
        private readonly IContactUsService contactUsService;
        private readonly IDesignService  designService;
        private readonly ISubscriptionService  subscriptionService;
        public Admin(IUserService userService,
               ICommentService commentService,
               IAdminService adminService,
               IEmailService emailService,
               IContactUsService contactUsService,
               IDesignService designService,
               ISubscriptionService subscriptionService)
        {
            this.userService = userService;
            this.commentService = commentService;
            this.adminService = adminService;
            this.emailService = emailService;
            this.contactUsService = contactUsService;
            this.designService = designService;
            this.subscriptionService = subscriptionService;
        }


        [HttpGet]
        [Route("DashboardCounters")]
        public IActionResult DashboardCounters()
        {
            return Ok(adminService.DashboardCounters());
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
        [Route("GetUserAndAd")]
        public IActionResult GetUserAndAd()
        {
            return Ok(adminService.GetUserAndAd());
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
        [HttpPost]
        [Route("UpdateDesign")]
        public IActionResult UpdateDesign([FromBody]Design design)
        {
            adminService.UpdateDesign(design);
            return Ok();
        }

        [HttpGet]
        [Route("GetDesignById/{designId}")]
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
        [Route("RejectReport/{reportId}")]
        public IActionResult RejectReport(int reportId)
        {
            adminService.RejectReport(reportId);
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

        [HttpPost]
        [Route("AcceptFeedback/{feedbackId}")]
        public IActionResult AcceptFeedback(int feedbackId)
        {
            adminService.AcceptFeedback(feedbackId);
            return Ok();
        }

        [HttpPost]
        [Route("RejectFeedback/{feedbackId}")]
        public IActionResult RejectFeedback(int feedbackId)
        {
            adminService.RejectFeedback(feedbackId);
            return Ok();
        }
        [HttpGet]
        [Route("GetPostById/{postId}")]
        public IActionResult GetPostById(int postId)
        {
            return Ok(adminService.GetPostById(postId));  
        }
        [HttpPost]
        [Route("AcceptReport")]
        public IActionResult AcceptReport(ReportDto report)
        {
            adminService.AcceptReport(report.Id);
            EmailDto email = new EmailDto();
            email.To = report.Email;
            email.Subject = "#" + report.Id + " Report result";
            email.Body = "Hello " + "<strong>" + report.FirstName + " " + report.LastName + "</strong>" + "<br><br>" +
                         "Here at Mada we are always seeking for a safe environment where everyone can express their thoughts,<br>still, there are some rules that everybody should follow to ensure a safe and healthy atmosphere.<br><br>" +
                         "And after taking a close look at the last content you posted we found that this content goes against our rules and therefore we decided to <strong style='color:red'>delete</strong> it<br><br>" +
                         "We believe in the open door approach so, you can always contact us if you believe something is wrong " +
                         "please put the report number in the email subject so we could help you easily you can also use our contact us form page<br><br><br>" +
                         "<strong>Mada Team</strong>";
            emailService.SendEmail(email);
            return Ok();
        }

        [HttpGet]
        [Route("GetEmails")]
        public IActionResult GetEmails()
        {
            return Ok(contactUsService.GetEmails());
        }

        [HttpGet]
        [Route("GetEmailDetails/{emailId}")]
        public IActionResult GetEmailDetails(int emailId)
        {
            return Ok(contactUsService.GetContactUsById(emailId));
        }

        
        [HttpGet]
        [Route("GetFeedbackByStatus/{status}")]
        public IActionResult GetFeedbackByStatus(int status)
        {
            return Ok(adminService.GetFeedbackByStatus(status));
        }
        [HttpPost, DisableRequestSizeLimit]
        [Route("UploadHomeImg")]
        public async Task<IActionResult> UploadHomeImgAsync()
        {
            try
            {
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fileName = Guid.NewGuid().ToString() + "_" + (ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"'));
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    return Ok(new HomeImg { HomePath= fileName });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }


        [HttpPost, DisableRequestSizeLimit]
        [Route("UploadAboutImg")]
        public async Task<IActionResult> UploadAboutImgAsync()
        {
            try
            {
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();
                var folderName = Path.Combine("Resources", "Images","AboutUs");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fileName = Guid.NewGuid().ToString() + "_" + (ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"'));
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    return Ok(new AboutImg { AboutPath = fileName });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
        [HttpPost]
        [Route("SendMessage")]
        public IActionResult SendMessage([FromBody] ContactUs contact)
        {
            EmailDto email=new EmailDto();  
            email.Subject = "Re " + contact.Subject;
            email.To = contact.Email;
            email.Body = contact.Message;
            emailService.SendEmail(email);
            return Ok();
        }

        [HttpGet]
        [Route("RevenueByDate/{year}/{month}")]
        public IActionResult RevenueByDate(string year, string month = null)
        {
            return Ok(adminService.GetRevenueByDate(year, month));
        }
        [HttpPost]
        [Route("UpdateService")]
        public IActionResult UpdateService(Subscription subscription)
        {
            subscriptionService.Update(subscription);
            return Ok();    
        }
    }
}
