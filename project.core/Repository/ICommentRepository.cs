using project.core.Data;
using project.core.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Repository
{
   public interface ICommentRepository
    {
        public List<Comments> CRUDOP(Comments comments, string operation);
        public CommentCount CountComments();
        public List<CommentData> GetCommentByPostId(int postId);

    }
}
