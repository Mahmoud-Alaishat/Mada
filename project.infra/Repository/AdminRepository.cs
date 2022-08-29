using Dapper;
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
    public class AdminRepository: IAdminRepository
    {
        private readonly IDBContext context;
        public AdminRepository(IDBContext context)
        {
            this.context = context;
        }

        public void BlockAdvertisement(int postId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofpost", postId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            context.dbConnection.ExecuteAsync("Admin_package_api.BlockAd",parameter, commandType: CommandType.StoredProcedure);
        }

        public LikeCommentPostAdCount CountLikeCommentPostAd()
        {
            var result = context.dbConnection.Query<LikeCommentPostAdCount>("Admin_package_api.CountLikeCommentPostAd", commandType: CommandType.StoredProcedure);
            return result.SingleOrDefault();
        }

        public VideoImageCount CountVideoImage()
        {
            var result = context.dbConnection.Query<VideoImageCount>("Admin_package_api.CountVideoImage", commandType: CommandType.StoredProcedure);
            return result.SingleOrDefault();
        }

        public void DeleteUser(string userId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofuser", userId, dbType: DbType.String, direction: ParameterDirection.Input);
            context.dbConnection.ExecuteAsync("Admin_package_api.DeleteUser", parameter, commandType: CommandType.StoredProcedure);
        }

        public List<Useractivities> GetUseractivities()
        {
            var result = context.dbConnection.Query<Useractivities>("Admin_package_api.UserActivities", commandType: CommandType.StoredProcedure);
            return result.ToList();
        }

        public List<FeedBackDto> GetLast2FeedBack()
        {
            var result = context.dbConnection.Query<FeedBackDto>("Admin_package_api.Last2FeedBack", commandType: CommandType.StoredProcedure);
            return result.ToList();
        }

        public void UnBlockAdvertisement(int postId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofpost", postId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            context.dbConnection.ExecuteAsync("Admin_package_api.UnBlockAd",parameter, commandType: CommandType.StoredProcedure);
        }

        public List<ReportDto> GetLast2Reports()
        {
            var result = context.dbConnection.Query<ReportDto>("Admin_package_api.Last2Reports", commandType: CommandType.StoredProcedure);
            return result.ToList();
        }

        public List<FeedBackDto> CRUDOPFeedback(FeedBackDto feedBack, string operation)
        {
            var parameter = new DynamicParameters();
            List<FeedBackDto> re = new List<FeedBackDto>();
            parameter.Add("idoffeedback", feedBack.Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("feedbacktextt", feedBack.FeedbackText, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("feedbackstatuss", feedBack.FeedbackStatus, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("useridd", feedBack.UserId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("operation", operation, dbType: DbType.String, direction: ParameterDirection.Input);

            if (operation == "read" | operation == "readbyid")
            {
                var result = context.dbConnection.Query<FeedBackDto>("Feedback_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();
            }
            else
            {
                context.dbConnection.ExecuteAsync("Feedback_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return re;
            }
        }

        public List<ReportDto> CRUDOPReport(ReportDto report, string operation)
        {
            var parameter = new DynamicParameters();
            List<ReportDto> re = new List<ReportDto>();
            parameter.Add("idofRepoet", report.Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("idofPost", report.PostId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("idofStatus", report.StatusId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("idofuser", report.UserId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("operation", operation, dbType: DbType.String, direction: ParameterDirection.Input);

            if (operation == "read" | operation == "readbyid")
            {
                var result = context.dbConnection.Query<ReportDto>("Feedback_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();
            }
            else
            {
                context.dbConnection.ExecuteAsync("Feedback_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return re;
            }
        }

        public List<RevenueDetails> RevenueDetails()
        {
            var result = context.dbConnection.Query<RevenueDetails>("Admin_package_api.RevenueDetails", commandType: CommandType.StoredProcedure);
            return result.ToList();
        }
    }
}
