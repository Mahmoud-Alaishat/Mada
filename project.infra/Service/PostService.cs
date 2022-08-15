using project.core.Data;
using project.core.DTO;
using project.core.Repository;
using project.core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace project.infra.Service
{
    public class PostService : IPostService
    {
        private readonly IPostRepository postRepository;

        public PostService(IPostRepository postRepository)
        {
            this.postRepository = postRepository;   

        }

        public LikeCount CountLikes(int id)
        {
            return postRepository.CountLikes(id);   
        }

        public PostCount CountPosts()
        {
            return postRepository.CountPosts();
        }

        public void Delete(int id)
        {
            Post p = new Post();
            p.Id = id;
            postRepository.CRUDOP(p,"delete").ToList().FirstOrDefault();
        }

        public Post Create(Post post)
        {
            postRepository.CRUDOP(post,"insert").ToList().FirstOrDefault();
            return post;
        }

        public List<Post> GetAllPost()
        {
            return postRepository.CRUDOP(new Post(), "read");
        }

        public Post GetPostById(int id)
        {
            Post p = new Post();
            p.Id = id;
            return postRepository.CRUDOP(p, "readbyid").ToList().FirstOrDefault();
        }

        public List<Post> Top10SeenPost()
        {
            return postRepository.Top10SeenPost();
        }

        public List<Post> Top2SeenPost()
        {
            return postRepository.Top2SeenPost();
        }

        public Post Update(Post post)
        {
            postRepository.CRUDOP(post, "update").ToList().FirstOrDefault();
            return post;
        }

        public List<Post> MyPosts(string userId)
        {
            return postRepository.MyPosts(userId);
        }
    }
}
