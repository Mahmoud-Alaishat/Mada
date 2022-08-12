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
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository commentRepository;

        public CommentService(ICommentRepository commentRepository)
        {
            this.commentRepository = commentRepository;
        }
        public CommentCount CountComments()
        {
            return commentRepository.CountComments();
        }

        public Comments Create(Comments comment)
        {
            return commentRepository.CRUDOP(comment, "insert").ToList().SingleOrDefault();
        }

        public void Delete(int commentId)
        {
            Comments comment = new Comments();
            comment.ID = commentId;
            commentRepository.CRUDOP(comment, "delete");
        }

        public Comments GetCommentById(int commentId)
        {
            Comments comment = new Comments();
            comment.ID = commentId;
           return commentRepository.CRUDOP(comment, "readbyid").ToList().SingleOrDefault();
        }

        public List<CommentData> GetCommentByPostId(int postId)
        {
            return commentRepository.GetCommentByPostId(postId);
        }

        public List<Comments> GetComments()
        {
            Comments comment = new Comments();
            return commentRepository.CRUDOP(comment, "read");
        }

        public Comments Update(Comments comment)
        {
            return commentRepository.CRUDOP(comment, "update").ToList().SingleOrDefault();
        }
    }
}
