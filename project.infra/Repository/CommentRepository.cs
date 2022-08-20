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
   public class CommentRepository : ICommentRepository
    {

        private readonly IDBContext context;
        public CommentRepository(IDBContext context)
        {
            this.context = context;
        }

        public CommentCount CountComments()
        {
            var result = context.dbConnection.Query<CommentCount>("Comments_package_api.CountComments", commandType: CommandType.StoredProcedure);
            return result.SingleOrDefault();
        }

        public List<Comments> CRUDOP(Comments comments, string operation)
        {
            var parameter = new DynamicParameters();
            DateTime localDate = DateTime.Now;

            List<Comments> re = new List<Comments>();
            parameter.Add("idofcomment", comments.ID, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("idofpost", comments.POSTID, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("idofuser", comments.USERID, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("contentofcomment", comments.CONTENT, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("datefcomment", localDate, dbType: DbType.DateTime, direction: ParameterDirection.Input);
            parameter.Add("item", comments.ITEM, dbType: DbType.String, direction: ParameterDirection.Input);

            parameter.Add("operation", operation, dbType: DbType.String, direction: ParameterDirection.Input);
            if (operation == "read" | operation == "readbyid")
            {
                var result = context.dbConnection.Query<Comments>("Comments_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();
            }
            else
            {
                context.dbConnection.ExecuteAsync("Comments_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return re;
            }
        }

        public List<CommentData> GetCommentByPostId(int postId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofpost", postId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            var result = context.dbConnection.Query<CommentData>("Comments_package_api.GetCommentByPostId", parameter, commandType: CommandType.StoredProcedure);
            return result.ToList();

        }
    }
}
