using project.core.Data;
using project.core.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Service
{
    public interface IPostService
    {
        public Post Create(Post post);
        public Post Update (Post post);
        public void Delete (int id);
        public List<Post> GetAllPost ();
        public Post GetPostById (int id);
        public LikeCount CountLikes(int id);
        public PostCount CountPosts();
        public List<Post> Top2SeenPost();
        public List<Post> Top10SeenPost();
        public List<Post> MyPosts(string userId);


    }
}
