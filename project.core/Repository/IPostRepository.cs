﻿using project.core.Data;
using project.core.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Repository
{
    public interface IPostRepository
    {
        public List<Post> CRUDOP(Post post,string operation);
        public CommentLikeCount CountLikesAndCommments(int id);
        public PostCount CountPosts();
        public List<Post> Top2SeenPost();
        public List<Post> Top10SeenPost();
    }
}
