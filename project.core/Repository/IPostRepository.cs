using project.core.Data;
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
    }
}
