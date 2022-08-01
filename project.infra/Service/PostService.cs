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

        public CommentLikeCount CountLikesAndCommments(int id)
        {
            return postRepository.CountLikesAndCommments(id);   
        }

        public PostCount CountPosts()
        {
            return postRepository.CountPosts();
        }

        public void deletepost(int id)
        {
            Post p = new Post();
            p.Id = id;
            postRepository.CRUDOP(p,"delete").ToList().FirstOrDefault();
        }

        public Post insertpost(Post post)
        {
            postRepository.CRUDOP(post,"insert").ToList().FirstOrDefault();
            return post;
        }

        public List<Post> read()
        {
            return postRepository.CRUDOP(new Post(), "read");
        }

        public Post readbyid(int id)
        {
            Post p = new Post();
            p.Id = id;
            return postRepository.CRUDOP(p, "readbyid").ToList().FirstOrDefault();
        }

        public Post updatepost(Post post)
        {
            postRepository.CRUDOP(post, "update").ToList().FirstOrDefault();
            return post;
        }
    }
}
