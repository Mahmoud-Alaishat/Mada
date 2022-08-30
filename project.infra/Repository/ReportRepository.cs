using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using Dapper;
using project.core.Data;
using project.core.Domain;
using project.core.DTO;
using project.core.Repository;

namespace project.infra.Repository
{
    public class ReportRepository : IReportRepository
    {

        private readonly IDBContext context;
        public ReportRepository(IDBContext context)
        {
            this.context = context;
        }

        public List<Reports> AreRepoet(string userId, int postId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofPost", postId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("idofuser", userId, dbType: DbType.String, direction: ParameterDirection.Input);
            var result = context.dbConnection.Query<Reports>("Report_package_api.AreRepoet", parameter, commandType: CommandType.StoredProcedure);
            return result.ToList();
        }

        public List<Reports> CRUDOP(Reports report, string operation)
        {
            var parameter = new DynamicParameters();
            List<Reports> re = new List<Reports>();
            parameter.Add("idofReport", report.Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("idofPost", report.PostId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("idofStatus", report.StatusId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("idofuser", report.UserId, dbType: DbType.String, direction: ParameterDirection.Input);

            parameter.Add("operation", operation, dbType: DbType.String, direction: ParameterDirection.Input);
            if (operation == "read" || operation == "readbyid")
            {
                var result = context.dbConnection.Query<Reports>("Report_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();
            }
            else
            {
                context.dbConnection.ExecuteAsync("Report_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return re;
            }
        }
    }
}
