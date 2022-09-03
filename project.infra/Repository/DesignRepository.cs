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
    public class DesignRepository : IDesignRepository
    {
        private readonly IDBContext context;
        public DesignRepository(IDBContext context)
        {
            this.context = context;
        }
        public List<Design> CRUDOP(Design design, string operation)
        {
            var parameter = new DynamicParameters();
            List<Design> re = new List<Design>();
            parameter.Add("idofdesign", design.Id, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("SlideImagee1", design.SlideImage1, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("SlideImagee2", design.SlideImage2, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("SlideImagee3", design.SlideImage3, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("SubTextt1", design.SubText1, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("SubTextt2", design.SubText2, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("SubTextt3", design.SubText3, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("MainTextt1", design.MainText1, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("MainTextt2", design.MainText2, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("MainTextt3", design.MainText3, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("UserIdd", design.UserId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("operation", operation, dbType: DbType.String, direction: ParameterDirection.Input);

            if (operation == "read" | operation == "readbyid")
            {
                var result = context.dbConnection.Query<Design>("Design_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();
            }
            else
            {
                context.dbConnection.Execute("Design_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return re;
            }
        }
    }
}
