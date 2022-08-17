using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using Dapper;
using project.core.Data;
using project.core.Domain;
using project.core.Repository;

namespace project.infra.Repository
{
    public class RevenueRepository: IRevenueRepository
    {
       
            private readonly IDBContext context;
            public RevenueRepository(IDBContext context)
            {
                this.context = context;
            }

        public List<Revenue> CRUDOP(Revenue revenue, string operation)
        {
            var parameter = new DynamicParameters();
            List<Revenue> re = new List<Revenue>();
            parameter.Add("idofRevenue", revenue.Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("servicee", revenue.Service, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("totalofRevenue", revenue.TotalRevenue, dbType: DbType.Double, direction: ParameterDirection.Input);
          
            if (operation == "read" || operation == "readbyid")
            {
                var result = context.dbConnection.Query<Revenue>("Revenue_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
            else
            {
                context.dbConnection.ExecuteAsync("Revenue_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return re;
            }
        }
    }
}
