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
        private readonly IPostService postService;
        private readonly IReplyService  replyService;
        private readonly ILikeService likeService;
        

        private readonly IAttachmentService attachmentService;
        public User(ICommentService commentService, IContactUsService contactUsService,
            IUserService userService, IFriendService friendService, IPostService postService, IReplyService replyService,
            IAttachmentService attachmentService, ILikeService likeService)
        {
            this.commentService = commentService;
            this.contactUsService = contactUsService;
            this.userService = userService;
            this.friendService = friendService;
            this.postService = postService;
            this.replyService = replyService;   
            this.attachmentService = attachmentService;
            this.likeService = likeService; 
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
    }
}
