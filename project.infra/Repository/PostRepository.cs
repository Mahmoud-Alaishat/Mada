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
    public class PostRepository : IPostRepository
    {
        private readonly IDBContext context;
        public PostRepository(IDBContext context)
        {
            this.context = context; 
        }

        public LikeCount CountLikes(int id)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofpost", id, dbType: DbType.Int32, direction: ParameterDirection.Input);

            var result = context.dbConnection.Query<LikeCount>("Post_package_api.CountLikes", parameter, commandType: CommandType.StoredProcedure);
            return result.ToList().SingleOrDefault();

        }

        public PostCount CountPosts()
        {
            var result = context.dbConnection.Query<PostCount>("Post_package_api.CountPost", commandType: CommandType.StoredProcedure);
            return result.ToList().SingleOrDefault();
        }

        public List<Post> CRUDOP(Post post, string operation)
        {
            var parameter = new DynamicParameters();
            List<Post> re = new List<Post>();
            DateTime localDate = DateTime.Now;

            parameter.Add("idofpost", post.Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("idofuser", post.UserId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("contentofpost", post.Content, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("typeofpost", post.TypePost, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("dateofpost", localDate, dbType: DbType.DateTime, direction: ParameterDirection.Input);
            parameter.Add("isblockedpost", post.IsBlocked, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("operation", operation, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("numOfclicks", post.Clicks, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("expirydate", post.EndDate, dbType: DbType.DateTime, direction: ParameterDirection.Input);
            parameter.Add("showadv", post.ShowAd, dbType: DbType.Int32, direction: ParameterDirection.Input);

            if (operation == "read" || operation== "readbyid")
            {
                var result = context.dbConnection.Query<Post>("Post_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
            else
            {
                context.dbConnection.ExecuteAsync("Post_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return re;
            }

        }

        public List<Post> MyPosts(string userId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofuser", userId, dbType: DbType.String, direction: ParameterDirection.Input);

            var result = context.dbConnection.Query<Post>("Post_package_api.GetPostByUserId", parameter, commandType: CommandType.StoredProcedure);
            return result.ToList();
        }

        public List<Post> Top10SeenPost()
        {
            var parameter = new DynamicParameters();
            var result = context.dbConnection.Query<Post>("Post_package_api.Top10SeenPost", parameter, commandType: CommandType.StoredProcedure);
            return result.ToList();
        }

        public List<Post> Top2SeenPost()
        {
            var parameter = new DynamicParameters();
            var result = context.dbConnection.Query<Post>("Post_package_api.Top2SeenPost", parameter, commandType: CommandType.StoredProcedure);
            return result.ToList();
        }
    }
}
