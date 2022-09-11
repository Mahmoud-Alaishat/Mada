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
        public List<Users> CRUDOP(Users user, string operation);
        public LoginResult Login(Login login);
        public string Register(Users user);
        public UserCount CountUsers();
        public void ConfirmEmail(ConfirmEmail confirmEmail);
        public CheckEmailReceiver CheckEmail(CheckEmailSender checkEmail);
        public CheckUserNameReceiver CheckUserName(CheckUserNameSender checkUserName);
        public bool UpdateUserProfile(string userId, UserInfo user);
        public SubscriptionIDPostNum GetSubPostNumByUserId(string userId);
        public void BuySubscription(BuySubscription buySubscription);
        public void BuyAd(BuyAd buyAd);
        public void EndSubscription(string userId);
        public NumOfPost NumberOFPostByUserId(string userId);
        public PostId GetLastPost(string userId);
        public List<FeedBackDto> GetAcceptedFeedback();
        public List<UserChat> GetChatsByUserId(string userId);
        public List<ChatMessages> GetMessagesByChatId(int chatId);
        public UserImage GetUserImage(string userId);   
        public UserFirstName GetUserFirstName(string userId);   
        public UserLastName GetUserLastName(string userId);
        public LastMessage GetLastMessageByChatId(int chatId);
        public FullNameById GetFullNameByUserId(string userId);
    }
}
