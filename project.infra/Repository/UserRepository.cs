using Dapper;
using Microsoft.AspNetCore.Identity;
using project.core.Data;
using project.core.Domain;
using project.core.DTO;
using project.core.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace project.infra.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly IDBContext context;


        public UserRepository(IDBContext context)
        {
            this.context = context;
        }

        public List<Users> CRUDOP(Users user, string operation)
        {
            var parameter = new DynamicParameters();
            List<Users> re = new List<Users>();
            parameter.Add("idofuser", user.Id, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("userfname", user.FirstName, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("userlname", user.LastName, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("username", user.UserName, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("emailofuser", user.Email, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("phoneofuser", user.PhoneNumber, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("imageofuser", user.ProfilePath, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("usercove", user.CoverPath, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("useraddress", user.Address, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("userbio", user.Bio, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("userrelationship", user.Relationship, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("idofsubscription", user.SubscriptionId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("expdate", user.SubscribeExpiry, dbType: DbType.DateTime, direction: ParameterDirection.Input);
            parameter.Add("staticpost", user.StaticNumPost, dbType: DbType.Int32, direction: ParameterDirection.Input);


            parameter.Add("operation", operation, dbType: DbType.String, direction: ParameterDirection.Input);
            if (operation == "read" | operation == "readbyid")
            {
                var result = context.dbConnection.Query<Users>("User_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();
            }
            else
            {
                context.dbConnection.ExecuteAsync("User_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return re;
            }
        }

        public LoginResult Login(Login login)
        {
            var parameter = new DynamicParameters();
           
            parameter.Add("emailofuser", login.Email, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("passofuser", login.PasswordHash, dbType: DbType.String, direction: ParameterDirection.Input);

            var result = context.dbConnection.Query<LoginResult>("User_package_api.Login", parameter, commandType: CommandType.StoredProcedure);
            return result.SingleOrDefault();
        }

        public string Register(Users user)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofuser", user.Id, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("userfname", user.FirstName, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("userlname", user.LastName, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("username", user.UserName, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("emailofuser", user.Email, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("phoneofuser", user.PhoneNumber, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("imageofuser", user.ProfilePath, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("passofuser", user.PasswordHash, dbType: DbType.String, direction: ParameterDirection.Input);

            context.dbConnection.ExecuteAsync("User_package_api.Register", parameter, commandType: CommandType.StoredProcedure);
            return "Yes";
        }
        public UserCount CountUsers()
        {
            var result = context.dbConnection.Query<UserCount>("User_package_api.CountUsers", commandType: CommandType.StoredProcedure);
            return result.SingleOrDefault();
        }

        public void ConfirmEmail(ConfirmEmail  confirmEmail)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofuser", confirmEmail.Id, dbType: DbType.String, direction: ParameterDirection.Input);
            context.dbConnection.ExecuteAsync("User_package_api.ConfirmEmail", parameter, commandType: CommandType.StoredProcedure);

        }

        public CheckEmailReceiver CheckEmail(CheckEmailSender checkEmail)
        {
            var parameter = new DynamicParameters();
            parameter.Add("emailofuser", checkEmail.Email, dbType: DbType.String, direction: ParameterDirection.Input);
            var result = context.dbConnection.Query<CheckEmailReceiver>("User_package_api.CheckEmail", parameter, commandType: CommandType.StoredProcedure);
            return result.FirstOrDefault();


        }

        public CheckUserNameReceiver CheckUserName(CheckUserNameSender checkUserName)
        {
            var parameter = new DynamicParameters();
            parameter.Add("username", checkUserName.UserName, dbType: DbType.String, direction: ParameterDirection.Input);
            var result = context.dbConnection.Query<CheckUserNameReceiver>("User_package_api.CheckUserName", parameter, commandType: CommandType.StoredProcedure);
            return result.FirstOrDefault();
        }
        public bool UpdateUserProfile(string userId, UserInfo user)
        {

            var parameter = new DynamicParameters();
            List<UserInfo> re = new List<UserInfo>();
            parameter.Add("idofuser", userId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("userfname", user.FirstName, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("userlname", user.LastName, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("imageofuser", user.ProfilePath, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("usercove", user.CoverPath, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("useraddress", user.Address, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("userbio", user.Bio, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("userrelationship", user.Relationship, dbType: DbType.String, direction: ParameterDirection.Input);

            context.dbConnection.ExecuteAsync("User_package_api.UpdateUserProfile", parameter, commandType: CommandType.StoredProcedure);
            return true;
        }

        public SubscriptionIDPostNum GetSubPostNumByUserId(string userId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofuser", userId, dbType: DbType.String, direction: ParameterDirection.Input);
            var result = context.dbConnection.Query<SubscriptionIDPostNum>("User_package_api.GetSubPostNumByUserId", parameter, commandType: CommandType.StoredProcedure);
            return result.FirstOrDefault();

        }

        public void BuySubscription(BuySubscription buySubscription)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofuser", buySubscription.UserId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("idofsubscription", buySubscription.SubscriptionId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("priceofsubscription", buySubscription.Price, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("visaid", buySubscription.VisaID, dbType: DbType.Int32, direction: ParameterDirection.Input);

            context.dbConnection.ExecuteAsync("User_package_api.BuySubscription", parameter, commandType: CommandType.StoredProcedure);



        }

        public void BuyAd(BuyAd buyAd)
        {
            var parameter = new DynamicParameters();
            parameter.Add("priceofad", buyAd.Price, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("visaid", buyAd.VisaId, dbType: DbType.Int32, direction: ParameterDirection.Input);

            context.dbConnection.ExecuteAsync("User_package_api.BuyAd", parameter, commandType: CommandType.StoredProcedure);

        }

        public void EndSubscription(string userId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofuser", userId, dbType: DbType.String, direction: ParameterDirection.Input);

            context.dbConnection.ExecuteAsync("User_package_api.EndSubscription", parameter, commandType: CommandType.StoredProcedure);

        }

        public NumOfPost NumberOFPostByUserId(string userId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofuser", userId, dbType: DbType.String, direction: ParameterDirection.Input);
            var result = context.dbConnection.Query<NumOfPost>("User_package_api.NumberOFPostByUserId", parameter, commandType: CommandType.StoredProcedure);
            return result.FirstOrDefault();
        }

        public PostId GetLastPost(string userId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofuser", userId, dbType: DbType.String, direction: ParameterDirection.Input);
            var result = context.dbConnection.Query<PostId>("User_package_api.GetLastPost", parameter, commandType: CommandType.StoredProcedure);
            return result.FirstOrDefault();
        }

        public List<FeedBackDto> GetAcceptedFeedback()
        {
            var result = context.dbConnection.Query<FeedBackDto>("User_package_api.GetAcceptedFeedback", commandType: CommandType.StoredProcedure);
            return result.ToList();
        }

        public List<UserChat> GetChatsByUserId(string userId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofuser", userId, dbType: DbType.String, direction: ParameterDirection.Input);
            var result = context.dbConnection.Query<UserChat>("User_package_api.GetChatsByUserId", parameter, commandType: CommandType.StoredProcedure);
            return result.ToList();
        }

        public List<ChatMessages> GetMessagesByChatId(int chatId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofchat", chatId, dbType: DbType.String, direction: ParameterDirection.Input);
            var result = context.dbConnection.Query<ChatMessages>("User_package_api.GetMessagesByChatId", parameter, commandType: CommandType.StoredProcedure);
            return result.ToList();
        }

        public UserImage GetUserImage(string userId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofuser", userId, dbType: DbType.String, direction: ParameterDirection.Input);
            var result = context.dbConnection.Query<UserImage>("User_package_api.GetUserImage", parameter, commandType: CommandType.StoredProcedure);
            return result.FirstOrDefault();
        }

        public UserFirstName GetUserFirstName(string userId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofuser", userId, dbType: DbType.String, direction: ParameterDirection.Input);
            var result = context.dbConnection.Query<UserFirstName>("User_package_api.GetUserFirstName", parameter, commandType: CommandType.StoredProcedure);
            return result.FirstOrDefault();
        }

        public UserLastName GetUserLastName(string userId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofuser", userId, dbType: DbType.String, direction: ParameterDirection.Input);
            var result = context.dbConnection.Query<UserLastName>("User_package_api.GetUserLastName", parameter, commandType: CommandType.StoredProcedure);
            return result.FirstOrDefault();
        }

        public FullNameById GetFullNameByUserId(string userId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofuser", userId, dbType: DbType.String, direction: ParameterDirection.Input);
            var result = context.dbConnection.Query<FullNameById>("User_package_api.GetFullNameByUserId", parameter, commandType: CommandType.StoredProcedure);
            return result.FirstOrDefault();
        }

        public LastMessage GetLastMessageByChatId(int chatId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofchat", chatId, dbType: DbType.String, direction: ParameterDirection.Input);
            var result = context.dbConnection.Query<LastMessage>("User_package_api.GetLastMessageByChatId", parameter, commandType: CommandType.StoredProcedure);
            return result.FirstOrDefault();
        }
    }
}
