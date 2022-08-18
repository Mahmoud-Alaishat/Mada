using Microsoft.AspNetCore.Identity;
using project.core.Data;
using project.core.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace project.core.Repository
{
   public interface IUserRepository
    {
        public List<Users> CRUDOP(Users user,string operation);
        public LoginResult Login(Login login);
        public string Register(Users user);
        public UserCount CountUsers();
        public void ConfirmEmail(ConfirmEmail confirmEmail);
        public CheckEmailReceiver CheckEmail(CheckEmailSender  checkEmail);
        public CheckUserNameReceiver CheckUserName(CheckUserNameSender checkUserName);
        public bool UpdateUserProfile(string userId, UserInfo user);
        public SubscriptionIDPostNum GetSubPostNumByUserId(string userId);


    }
}
