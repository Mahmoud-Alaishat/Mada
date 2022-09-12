using Dapper;
using project.core.Data;
using project.core.Domain;
using project.core.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace project.infra.Repository
{
    public class ChatRepository : IChatRepository
    {
        private readonly IDBContext context;
        public ChatRepository(IDBContext context)
        {
            this.context = context;
        }

        public List<Chat> CRUDOP(Chat chat, string operation)
        {
            var parameter = new DynamicParameters();
            List<Chat> re = new List<Chat>();
            parameter.Add("chatid", chat.Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("fuserid", chat.FirstUserId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("suserid", chat.SecondUserId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("statusfuser", chat.StatusInFUser, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("statussuser", chat.StatusInSUser, dbType: DbType.Int32, direction: ParameterDirection.Input);
           
    
            parameter.Add("operation", operation, dbType: DbType.String, direction: ParameterDirection.Input);
            if (operation == "read" | operation == "readbyid")
            {
                var result = context.dbConnection.Query<Chat>("Chat_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();
            }
            else
            {
                context.dbConnection.ExecuteAsync("Chat_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return re;
            }
        }

        public List<Chat> FindChat(string fUserId, string sUserId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("suserId", fUserId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("suserId", sUserId, dbType: DbType.String, direction: ParameterDirection.Input);

            var result = context.dbConnection.Query<Chat>("Chat_package_api.FindChat", parameter, commandType: CommandType.StoredProcedure);
            return result.ToList();
        }
    }
}
