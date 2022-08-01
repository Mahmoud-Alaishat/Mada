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
   public class FeedbackRepository: IFeedbackRepository
    {
        private readonly IDBContext context;
        public FeedbackRepository(IDBContext context)
        {
            this.context = context;
        }

        public List<Feedback> CRUDOP(Feedback feedback, string operation)
        {
            var parameter = new DynamicParameters();
            List<Feedback> re = new List<Feedback>();
            parameter.Add("idoffeedback", feedback.Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("feedbacktextt", feedback.FeedbackText, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("feedbackstatuss", feedback.FeedbackStatus, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("useridd", feedback.UserId, dbType: DbType.String, direction: ParameterDirection.Input);

            parameter.Add("operation", operation, dbType: DbType.String, direction: ParameterDirection.Input);
            if (operation == "read" | operation == "readbyid")
            {
                var result = context.dbConnection.Query<Feedback>("Feedback_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();
            }
            else
            {
                context.dbConnection.ExecuteAsync("Feedback_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return re;
            }
        }
    }
}
