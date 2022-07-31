using project.core.Data;
using project.core.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Service
{
    public interface IPostService
    {
        public Post insertpost (Post post);
        public Post updatepost (Post post);
        public void deletepost (int id);
        public List<Post> read ();
        public Post readbyid (int id);
        public CommentLikeCount CountLikesAndCommments(int id);

    }
}
