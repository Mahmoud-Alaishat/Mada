using Dapper;
using project.core.Data;
using project.core.Domain;
using project.core.DTO;
using project.core.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace project.infra.Repository
{
    public class ReplyRepository : IReplyRepository
    {
        private readonly IDBContext context;
        public ReplyRepository(IDBContext context)
        {
            this.context = context;
        }
        public List<ReplyToComment> CRUDOP(ReplyToComment reply, string operation)
        {
            var parameter = new DynamicParameters();
            List<ReplyToComment> re = new List<ReplyToComment>();
            parameter.Add("idofreplay", reply.Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("idofcomment", reply.CommentId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("idofuser", reply.UserId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("contentofreplay", reply.Content, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("dateofreplay", reply.ReplayDate, dbType: DbType.DateTime, direction: ParameterDirection.Input);
            parameter.Add("itemofreplay", reply.Item, dbType: DbType.String, direction: ParameterDirection.Input);

            parameter.Add("operation", operation, dbType: DbType.String, direction: ParameterDirection.Input);
            if (operation == "read" | operation == "readbyid")
            {
                var result = context.dbConnection.Query<ReplyToComment>("Replay_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();
            }
            else
            {
                context.dbConnection.ExecuteAsync("Replay_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return re;
            }
        }
        public ReplyCount CountReply(int commentId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofcomment", commentId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            var result = context.dbConnection.Query<ReplyCount>("Replay_package_api.CountReplys", parameter, commandType: CommandType.StoredProcedure);
            return result.ToList().SingleOrDefault();
        }

        public List<ReplyData> GetReplayByCommentId(int commentId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofcomment", commentId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            var result = context.dbConnection.Query<ReplyData>("Replay_package_api.GetReplayByCommentId", parameter, commandType: CommandType.StoredProcedure);
            return result.ToList();
        }
    }
}
