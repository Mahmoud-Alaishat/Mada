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
    public class RequestRepository : IRequestRepository
    {

        private readonly IDBContext context;
        public RequestRepository(IDBContext context)
        {
            this.context = context;
        }


        public RequestCount CountRequest(string receiverId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofreceiver", receiverId, dbType: DbType.String, direction: ParameterDirection.Input);

            var result = context.dbConnection.Query<RequestCount>("Requset_package_api.CountRequset", parameter, commandType: CommandType.StoredProcedure);
            return result.SingleOrDefault();
        }

        public List<Request> CRUDOP(Request request, string operation)
        {

            var parameter = new DynamicParameters();
            List<Request> re = new List<Request>();
            parameter.Add("idofrequeset", request.Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("idofreceiver", request.ReceiverId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("idofsender", request.SenderId ,dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("senddate", request.DateOfSend, dbType: DbType.DateTime, direction: ParameterDirection.Input);
         
            parameter.Add("operation", operation, dbType: DbType.String, direction: ParameterDirection.Input);
            if (operation == "read" | operation == "readbyid")
            {
                var result = context.dbConnection.Query<Request>("Requset_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();
            }
            else
            {
                context.dbConnection.ExecuteAsync("Requset_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return re;
            }
        }
    }
}
