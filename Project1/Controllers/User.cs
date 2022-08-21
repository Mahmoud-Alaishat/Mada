using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using project.core.Data;
using project.core.DTO;
using project.core.Service;
using Project1.Hubs;
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
    public class User : ControllerBase
    {
        private readonly ICommentService commentService;
        private readonly IContactUsService contactUsService;
        private readonly IUserService userService;
        private readonly IFriendService friendService;
        private readonly IPostService postService;
        private readonly IReplyService  replyService;
        private readonly ILikeService likeService; 
        private readonly ISubscriptionService subscriptionService;
        private readonly IBankService bankService;
        private readonly IHubContext<ChatHub> chatHub; 

        private readonly IAttachmentService attachmentService;
        public User(ICommentService commentService, IContactUsService contactUsService,
            IUserService userService, IFriendService friendService, IPostService postService, IReplyService replyService,
            IAttachmentService attachmentService, ILikeService likeService, ISubscriptionService subscriptionService, IBankService bankService, IHubContext<ChatHub> chatHub)
            
        {
            this.commentService = commentService;
            this.contactUsService = contactUsService;
            this.userService = userService;
            this.friendService = friendService;
            this.postService = postService;
            this.replyService = replyService;
            this.attachmentService = attachmentService;
            this.likeService = likeService;
            this.bankService = bankService;
            this.subscriptionService = subscriptionService;
            this.chatHub = chatHub;
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
        [Route("GetAllSubscriptions")]
        public List<Subscription> GetAllSubscriptions()
        {
            return subscriptionService.GetAllSubscriptions();
        }

        [HttpGet]
        [Route("CountFriends/{userId}")]
        public IActionResult CountFriends(string userId)
        {
            return Ok(friendService.CountFriends(userId));

        }
        [HttpGet]
        [Route("FriendPost/{userId}")]
        public IActionResult FriendPost(string userId)
        {
            return Ok(friendService.GetFriendPosts(userId));

        }

        [HttpGet]
        [Route("MyFriends/{userId}")]
        public IActionResult MyFriends(string userId)
        {
            return Ok(friendService.GetFriends(userId));

        }

        [HttpGet]
        [Route("PostComment/{PostId}")]
        public IActionResult PostComment(int PostId)
        {
            return Ok(commentService.GetCommentByPostId(PostId));

        }

        [HttpGet]
        [Route("ReplyToComment/{commentId}")]
        public IActionResult ReplyToComment(int commentId)
        {
            return Ok(replyService.GetReplayByCommentId(commentId));
        }



        [HttpGet]
        [Route("PostAttachment/{postId}")]
        public IActionResult PostAttachment(int postId)
        {
            return Ok(attachmentService.GetPostAttachment(postId));

        }

        [HttpGet]
        [Route("MyPost/{userId}")]
        public IActionResult MyPost(string userId)
        {
            return Ok(postService.MyPosts(userId));
        }

        [HttpGet]
        [Route("PostLike/{postId}")]
        public IActionResult PostLike(int postId)
        {
            return Ok(likeService.GetPostLikes(postId));
        }
        [HttpDelete]
        [Route("DeletePost/{postId}")]
        public void DeletePost(int postId)
        {
            postService.Delete(postId);
        }
        [HttpGet]
        [Route("MyLast6Friends/{userId}")]
        public IActionResult MyLast6Friends(string userId)
        {
            return Ok(friendService.GetLast6Friends(userId));

        }
        [HttpPost]
        [Route("UpdateUserProfile/{userId}")]
        public IActionResult UpdateUserProfile(string userId, [FromBody] UserInfo user)
        {
            userService.UpdateUserProfile(userId, user);
            return Ok();
        }

        [HttpPost]
        [Route("HitLike")]
        public IActionResult HitLike(HitLikeByUser likeByUser)
        {
            return Ok(likeService.HitLike(likeByUser));
        }
        [HttpPost]
        [Route("InsertLike")]
        public IActionResult InsertLike(Likes likes)
        {
            likeService.Create(likes);
            return Ok();
        }
        [HttpDelete]
        [Route("DeleteLike/{LikeId}")]
        public IActionResult DeleteLike(int likeId)
        {

            likeService.Delete(likeId);
            return Ok();
        }
        [HttpGet]
        [Route("GetLikes/{postId}")]
        public IActionResult GetLikes(int postId)
        {
            return Ok(postService.CountLikes(postId));
        }
      
        [HttpGet]
        [Route("GetUserVisa/{userId}")]
        public IActionResult GetUserVisa(string userId)
        {
            return Ok(bankService.GetUserVisa(userId));
        }
        [HttpDelete]
        [Route("DeleteVisa/{visaId}")]
        public IActionResult DeleteVisa(int visaId)
        {
            bankService.Delete(visaId);
            return Ok();
        }
        [HttpPost]
        [Route("AddCard")]
        public IActionResult AddCard(Bank bank)
        {
            bankService.Create(bank);
            return Ok();
        }
        [HttpDelete]
        [Route("DeleteAccount/{userId}")]
        public IActionResult DeleteAccount(string userId)
        {
            userService.Delete(userId);
            return Ok();
        }

        [HttpPost, DisableRequestSizeLimit]
        [Route("UploadProfileImg")]
        public async Task<IActionResult> UploadProfileImgAsync()
        {
            try
            {
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();
                var folderName = Path.Combine("Resources", "Images","user","profile");
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
                    return Ok(new ProfileImg { ProfilePath= fileName });
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
        [Route("UploadCoverImg")]
        public async Task<IActionResult> UploadCoverImgAsync()
        {
            try
            {
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();
                var folderName = Path.Combine("Resources", "Images", "user","cover");
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
                    return Ok(new CoverImg { CoverPath = fileName });
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
        [Route("BuySubscription")]
        public IActionResult BuySubscription([FromBody]BuySubscription buySubscription)
        {
            userService.BuySubscription(buySubscription);   
            return Ok();
        }
        [HttpPost]
        [Route("GetSubPostNumByUserId/{userId}")]
        public IActionResult GetSubPostNumByUserId(string userId)
        {
            return Ok(userService.GetSubPostNumByUserId(userId));
        }
        [HttpPost]
        [Route("MakeComment")]
        public IActionResult MakeComment([FromBody]Comments comments)
        {
            commentService.Create(comments);
            return Ok();
        }

        [HttpPost]
        [Route("sendmessage")]
        public async Task<IActionResult> SendMessage(string user, string message)
        {
            await chatHub.Clients.All.SendAsync("ReceiveOne", user, message);
            return Ok();
        }
        [Route("send")]                                          
        [HttpPost]
        public IActionResult SendRequest([FromBody] MessageDto msg)
        {
            chatHub.Clients.All.SendAsync("ReceiveMessage", msg.user, msg.msgText);
            return Ok();
        }
    }
}
