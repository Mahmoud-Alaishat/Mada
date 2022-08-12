using project.core.Data;
using project.core.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Service
{
   public interface IReplyService
    {
        public ReplyToComment Create(ReplyToComment reply);
        public ReplyToComment Update(ReplyToComment reply);

        public void Delete(int replyId);

        public List<ReplyToComment> GetReplys();

        public ReplyToComment GetReplyById(int replyId);
        public ReplyCount CountReply(int commentId);
        public List<ReplyData> GetReplayByCommentId(int commentId);
    }
}
