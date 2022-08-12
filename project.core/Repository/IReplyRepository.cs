using project.core.Data;
using project.core.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Repository
{
   public interface IReplyRepository
    {
        public List<ReplyToComment> CRUDOP(ReplyToComment reply, string operation);
        public ReplyCount CountReply(int commentId);
        public List<ReplyData> GetReplayByCommentId(int commentId);
    }
}
