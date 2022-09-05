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

        public DashboardCounter DashboardCounters()
        {
            var result = context.dbConnection.Query<DashboardCounter>("Admin_package_api.DashboardCounters", commandType: CommandType.StoredProcedure);
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
            parameter.Add("feedbackstatuss", feedBack.FeedbackStatus, dbType: DbType.Int32, direction: ParameterDirection.Input);
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
            parameter.Add("idofReport", report.Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("idofPost", report.PostId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("idofStatus", report.StatusId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("idofuser", report.UserId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("operation", operation, dbType: DbType.String, direction: ParameterDirection.Input);

            if (operation == "read" | operation == "readbyid")
            {
                var result = context.dbConnection.Query<ReportDto>("Report_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();
            }
            else
            {
                context.dbConnection.ExecuteAsync("Report_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return re;
            }
        }

        public List<UserAd> GetUserAndAd()
        {
            var result = context.dbConnection.Query<UserAd>("Admin_package_api.GetUserAndAd", commandType: CommandType.StoredProcedure);
            return result.ToList();
        }

        public List<UserStory> UserStory()
        {
            var result = context.dbConnection.Query<UserStory>("Admin_package_api.UserStory", commandType: CommandType.StoredProcedure);
            return result.ToList();
        }

        public void BlockStory(int storyId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofstory", storyId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            context.dbConnection.ExecuteAsync("Admin_package_api.BlockStory", parameter, commandType: CommandType.StoredProcedure);
        }

        public void UnBlockStory(int storyId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofstory", storyId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            context.dbConnection.ExecuteAsync("Admin_package_api.UnBlockStory", parameter, commandType: CommandType.StoredProcedure);

        }

        public List<RevenueDetails> RevenueDetails()
        {
            var result = context.dbConnection.Query<RevenueDetails>("Admin_package_api.RevenueDetails", commandType: CommandType.StoredProcedure);
            return result.ToList();
        }

        public List<Design> CRUDOPDesign(Design design, string operation)
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

            if (operation == "readbyid")
            {
                var result = context.dbConnection.Query<Design>("Design_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();
            }
            else
            {
                context.dbConnection.ExecuteAsync("Design_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return re;
            }

        }
        

        public List<TopPostSeen> GetTopPostSeen()
        {
            var result = context.dbConnection.Query<TopPostSeen>("Admin_package_api.TopPostSeen", commandType: CommandType.StoredProcedure);
            return result.ToList();
        }

        public void AcceptFeedback(int feedbackId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idoffeedbcak", feedbackId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            context.dbConnection.ExecuteAsync("Admin_package_api.AcceptFeedback", parameter, commandType: CommandType.StoredProcedure);
        }

        public void RejectFeedback(int feedbackId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idoffeedbcak", feedbackId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            context.dbConnection.ExecuteAsync("Admin_package_api.RejectFeedback", parameter, commandType: CommandType.StoredProcedure);
        }

        public List<PostDetails> GetPostById(int postId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofposts", postId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            var result = context.dbConnection.Query<PostDetails>("Admin_package_api.GetPostById", parameter, commandType: CommandType.StoredProcedure);
            return result.ToList();
        }

        public void AcceptReport(int postId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofreport", postId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            context.dbConnection.ExecuteAsync("Admin_package_api.AcceptReport", parameter, commandType: CommandType.StoredProcedure);

        }

        public void RejectReport(int reportId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofreport", reportId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            context.dbConnection.ExecuteAsync("Admin_package_api.RejectReport", parameter, commandType: CommandType.StoredProcedure);
        }

        public List<RevenueByDate> GetRevenueByDate(string year, string month)
        {
            var parameter = new DynamicParameters();
            parameter.Add("yearr", year, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("monthh", month, dbType: DbType.String, direction: ParameterDirection.Input);

            var result = context.dbConnection.Query<RevenueByDate>("Admin_package_api.GetRevenueByDate", parameter, commandType: CommandType.StoredProcedure);
            return result.ToList();
        }
    }
}
