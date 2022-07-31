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
            postService.deletepost(id);
            return "Deleted successfully";
        }
        [HttpGet]//retrevie all data 
        public List<Post> read()
        {
            return postService.read();
        }
        [HttpPut] //update
        public string updatepost([FromBody] Post pp)
        {
            return "Updated successfully-new post: " + postService.updatepost(pp).Id.ToString();
        }

        [HttpGet("{id}")] // retrive data by id
        public Post readbyid(int id)
        {

            return postService.readbyid(id);
        }

        [HttpPost]//insert new record in database
        public string insertpost([FromBody] Post pp)
        {

            return postService.insertpost(pp).Id.ToString() + " Was Added";
        }

        [HttpGet("CommentLikeCount/{id}")] // retrive data by id
        public CommentLikeCount CommentLikeCount(int id)
        {

            return postService.CountLikesAndCommments(id);
        }



    }
}
