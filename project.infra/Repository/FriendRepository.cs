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
    public class FriendRepository : IFriendRepository
    {

        private readonly IDBContext context;
        public FriendRepository(IDBContext context)
        {
            this.context = context;
        }
        public FriendsCount CountFriends(string userId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofuser", userId, dbType: DbType.String, direction: ParameterDirection.Input);

            var result = context.dbConnection.Query<FriendsCount>("Friend_package_api.CountFriends", parameter, commandType: CommandType.StoredProcedure);
            return result.SingleOrDefault();
        }

        public List<Friend> CRUDOP(Friend friend, string operation)
        {
            var parameter = new DynamicParameters();
            List<Friend> re = new List<Friend>();
            parameter.Add("idoff", friend.Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("idofuser", friend.UserId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("idoffriend", friend.FriendId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("frienddate", friend.Datee, dbType: DbType.DateTime, direction: ParameterDirection.Input);

            parameter.Add("operation", operation, dbType: DbType.String, direction: ParameterDirection.Input);

            if (operation == "read" | operation == "readbyid")
            {
                var result = context.dbConnection.Query<Friend>("Friend_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();
            }
            else
            {
                context.dbConnection.ExecuteAsync("Friend_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return re;
            }
        }

        public List<FirendPost> GetFriendPosts(string userId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofuser", userId, dbType: DbType.String, direction: ParameterDirection.Input);
            var result = context.dbConnection.Query<FirendPost>("Friend_package_api.GetFriendPosts", parameter, commandType: CommandType.StoredProcedure);
            return result.ToList();

        }

        public List<UserFriend> GetFriends(string userId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofuser", userId, dbType: DbType.String, direction: ParameterDirection.Input);
            var result = context.dbConnection.Query<UserFriend>("Friend_package_api.GetFriends", parameter, commandType: CommandType.StoredProcedure);
            return result.ToList();
        }
    }
}
