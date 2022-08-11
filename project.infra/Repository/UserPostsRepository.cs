using Dapper;
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
    public class UserPostsRepository : IUserPostsRepository
    {
        private readonly IDBContext context;
        public UserPostsRepository(IDBContext context)
        {
            this.context = context;
        }

        public List<PostData> GetUserPosts(string userId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofuser", userId, dbType: DbType.String, direction: ParameterDirection.Input);
            var result = context.dbConnection.Query<PostData>("User_package_api.GetUserPosts", parameter, commandType: CommandType.StoredProcedure);
            return result.ToList();
        }
    }
}
