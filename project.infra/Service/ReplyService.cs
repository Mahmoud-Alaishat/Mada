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
    public class ReplyService : IReplyService
    {
        private readonly IReplyRepository replyRepository;
        public ReplyService(IReplyRepository replyRepository)
        {
            this.replyRepository = replyRepository;
        }
        public void Delete(int replyId)
        {
            ReplyToComment reply = new ReplyToComment();
            reply.Id = replyId;
            replyRepository.CRUDOP(reply, "delete");
        }

        public ReplyToComment GetReplyById(int replyId)
        {

            ReplyToComment reply = new ReplyToComment();
            reply.Id = replyId;
           return replyRepository.CRUDOP(reply, "readbyid").ToList().SingleOrDefault();
        }

        public List<ReplyToComment> GetReplys()
        {
            ReplyToComment reply = new ReplyToComment();
            return replyRepository.CRUDOP(reply, "read");
        }

        public ReplyToComment Update(ReplyToComment reply)
        {
            return replyRepository.CRUDOP(reply,"update").ToList().SingleOrDefault();
        }
        public ReplyCount CountReply(int commentId)
        {
            return replyRepository.CountReply(commentId);
        }

        public ReplyToComment Create(ReplyToComment reply)
        {
            return replyRepository.CRUDOP(reply, "insert").ToList().SingleOrDefault();
        }

        public List<ReplyData> GetReplayByCommentId(int commentId)
        {
            return replyRepository.GetReplayByCommentId(commentId);
        }
    }
}
