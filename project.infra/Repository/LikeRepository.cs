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
    public class LikeRepository : ILikeRepository
    {
        
            private readonly IDBContext context;
            public LikeRepository(IDBContext context)
            {
                this.context = context;
            }

       public LikesCount CountLikes()
         {
            var result = context.dbConnection.Query<LikesCount>("Likes_package_api.CountLikes", commandType: CommandType.StoredProcedure);
            return result.SingleOrDefault();
        }

        public List<Likes> CRUDOP(Likes like, string operation)
                {
                    var parameter = new DynamicParameters();
                    List<Likes> re = new List<Likes>();
                    parameter.Add("idoflike", like.Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
                    parameter.Add("idofpost", like.PostId, dbType: DbType.Int32, direction: ParameterDirection.Input);
                    parameter.Add("idofuser", like.UserId, dbType: DbType.String, direction: ParameterDirection.Input);
                    parameter.Add("operation", operation, dbType: DbType.String, direction: ParameterDirection.Input);



                    if (operation == "read" | operation == "readbyid")
                    {
                        var result = context.dbConnection.Query<Likes>("Likes_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                        return result.ToList();
                        }
                    else
                    {
                        context.dbConnection.ExecuteAsync("Likes_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                        return re;
                    }
        }

        public List<PostLikeData> GetPostLikes(int postId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofpost", postId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            var result = context.dbConnection.Query<PostLikeData>("Likes_package_api.GetPostLikes", parameter, commandType: CommandType.StoredProcedure);
            return result.ToList();
        }

        public LikeId HitLike(HitLikeByUser likeByUser)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofpost", likeByUser.PostId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("idofuser", likeByUser.UserId, dbType: DbType.String, direction: ParameterDirection.Input);
            var result = context.dbConnection.Query<LikeId>("Likes_package_api.HitLike", parameter, commandType: CommandType.StoredProcedure);
            return result.FirstOrDefault();

        }
    }
}
