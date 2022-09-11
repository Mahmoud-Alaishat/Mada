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
    public class MessageRepository : IMessageRepository
    {
        private readonly IDBContext context;
        public MessageRepository(IDBContext context)
        {
            this.context = context;
        }
        public List<Message> CRUDOP(Message message, string operation)
        {
            var parameter = new DynamicParameters();
            List<Message> re = new List<Message>();
            parameter.Add("idofmessage", message.Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("idofchat", message.ChatId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("idofsender", message.SenderId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("mssgcontent", message.MessageContent, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("mssgdate", message.MessageDate, dbType: DbType.DateTime, direction: ParameterDirection.Input);
            parameter.Add("operation", operation, dbType: DbType.String, direction: ParameterDirection.Input);


            if (operation == "read" || operation == "readbyid")
            {
                var result = context.dbConnection.Query<Message>("Message_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
            else
            {
                context.dbConnection.ExecuteAsync("Message_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return re;
            }
        }

        public void SaveMessage(Message message)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofchat", message.ChatId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("idofsender", message.SenderId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("mssgcontent", message.MessageContent, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("mssgdate", message.MessageDate, dbType: DbType.DateTime, direction: ParameterDirection.Input);
            context.dbConnection.ExecuteAsync("Message_package_api.SaveMessage", parameter, commandType: CommandType.StoredProcedure);
        }
    }
}
