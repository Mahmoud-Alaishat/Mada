using project.core.Data;
using project.core.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Service
{
   public interface ICommentService
    {
        public Comments Update(Comments comment);

        public void Delete(int commentId);

        public List<Comments> GetComments();

        public Comments GetCommentById(int commentId);
        public CommentCount CountComments();

    }
}
