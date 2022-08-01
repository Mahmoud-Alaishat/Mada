using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project.core.Data;
using project.core.DTO;
using project.core.Service;
using System.Collections.Generic;

namespace Project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostService postService;
        public PostController(IPostService postService)
        {
            this.postService = postService; 
        }
        [HttpDelete("delete/{id}")]
        public string deletepost(int id)
        {
            postService.Delete(id);
            return "Deleted successfully";
        }
        [HttpGet]//retrevie all data 
        public List<Post> read()
        {
            return postService.GetAllPost();
        }
        [HttpPut] //update
        public string updatepost([FromBody] Post pp)
        {
            return "Updated successfully-new post: " + postService.Update(pp).Id.ToString();
        }

        [HttpGet("{id}")] // retrive data by id
        public Post readbyid(int id)
        {

            return postService.GetPostById(id);
        }

        [HttpPost]//insert new record in database
        public string Createpost([FromBody] Post pp)
        {

            return postService.Create(pp).Id.ToString() + " Was Added";
        }

        [HttpGet("CommentLikeCount/{id}")] // retrive data by id
        public CommentLikeCount CommentLikeCount(int id)
        {

            return postService.CountLikesAndCommments(id);
        }

        [HttpGet("top2")]//retrevie all data 
        public List<Post> Top2SeenPost()
        {
            return postService.Top2SeenPost();
        }
        [HttpGet("top10")]//retrevie all data 
        public List<Post> Top10SeenPost()
        {
            return postService.Top10SeenPost();
        }



    }
}
