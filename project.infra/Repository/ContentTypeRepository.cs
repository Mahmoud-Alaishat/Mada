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
    public class ContentTypeRepository : IContentTypeRepository
    {
        private readonly IDBContext context;

        public ContentTypeRepository(IDBContext context)
        {
            this.context = context;
        }
        public List<ContentType> CRUDOP(ContentType contentType, string operation)
        {
            var parameter = new DynamicParameters();
            List<ContentType> re = new List<ContentType>();
            parameter.Add("idofcontenttype", contentType.Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("typee", contentType.Type, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("operation", operation, dbType: DbType.String, direction: ParameterDirection.Input);
            if (operation == "read" || operation == "readbyid")
            {
                var result = context.dbConnection.Query<ContentType>("ContentType_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
            else
            {
                context.dbConnection.ExecuteAsync("ContentType_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return re;
            }
        }
    }
}
