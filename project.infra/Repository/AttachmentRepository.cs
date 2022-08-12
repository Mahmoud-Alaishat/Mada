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
    public class AttachmentRepository : IAttachmentRepository
    {

        private readonly IDBContext context;
        public AttachmentRepository(IDBContext context)
        {
            this.context = context;
        }

        public AttachmentCount CountAttachment()
        {
            var result = context.dbConnection.Query<AttachmentCount>("Attachment_package_api.CountAttachment", commandType: CommandType.StoredProcedure);
            return result.SingleOrDefault();
        }

        public List<Attachment> CRUDOP(Attachment attachment, string operation)
        {
            var parameter = new DynamicParameters();
            List<Attachment> re = new List<Attachment>();
            parameter.Add("idofattachment", attachment.Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("idofpost", attachment.PostId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("item", attachment.Item, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("operation", operation, dbType: DbType.String, direction: ParameterDirection.Input);

            if(operation == "read" | operation == "readbyid")
            {
                var result = context.dbConnection.Query<Attachment>("Attachment_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();
            }
            else
            {
                context.dbConnection.ExecuteAsync("Attachment_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return re;
            }
        }
        public List<AttachmentData> GetPostAttachment(int postId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofpost", postId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            var result = context.dbConnection.Query<AttachmentData>("Attachment_package_api.GetPostAttachment", parameter, commandType: CommandType.StoredProcedure);
            return result.ToList();
        }
    }
}
