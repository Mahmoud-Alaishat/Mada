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

    }
}
