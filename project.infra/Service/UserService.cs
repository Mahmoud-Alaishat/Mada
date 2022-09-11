using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using project.core.Data;
using project.core.DTO;
using project.core.Repository;
using project.core.Service;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace project.infra.Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        public UserService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }
        public void Delete(string userId)
        {
            Users user = new Users();
            user.Id = userId;
            userRepository.CRUDOP(user, "delete");
        }

        public Users GetUserById(string userId)
        {
            Users user = new Users();
            user.Id = userId;
           return userRepository.CRUDOP(user, "readbyid").ToList().SingleOrDefault();
        }

        public List<Users> GetUsers()
        {
            Users user = new Users();
            return userRepository.CRUDOP(user, "read");
        }

        public string Login(Login login)
        {
            var result = userRepository.Login(login);
            if (result == null)
            {
                return null;
            }
            else
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var tokenKey = Encoding.ASCII.GetBytes("[SECRET USED TO SIGN AND VERIFY JWT TOKENS, IT CAN BE ANYSTRING]");
                var tokenDescriptor = new SecurityTokenDescriptor
                {

                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Email, result.Email),
                        new Claim(ClaimTypes.Role, result.RoleName),
                        new Claim(ClaimTypes.Name, result.UserName),
                        new Claim("Id",result.Id),
                    }),
                    Expires = DateTime.UtcNow.AddHours(1),
                    SigningCredentials = new SigningCredentials(new
                    SymmetricSecurityKey(tokenKey),
                    SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
        }

        public string Register(Users user)
        {
            user.Id = Guid.NewGuid().ToString();

            userRepository.Register(user);
            return user.Id; 
        }

        public Users Update(Users user)
        {
            return userRepository.CRUDOP(user, "update").ToList().SingleOrDefault();
        }
        public UserCount CountUsers()
        {
            return userRepository.CountUsers();
        }

        public void ConfirmEmail(ConfirmEmail confirmEmail)
        {
             userRepository.ConfirmEmail(confirmEmail);
        }

        public CheckEmailReceiver CheckEmail(CheckEmailSender checkEmail)
        {
            return userRepository.CheckEmail(checkEmail);
        }

        public CheckUserNameReceiver CheckUserName(CheckUserNameSender checkUserName)
        {
            return userRepository.CheckUserName(checkUserName); 
        }
        public bool UpdateUserProfile(string userId, UserInfo user)
        {

            return userRepository.UpdateUserProfile(userId, user);
        }

        public SubscriptionIDPostNum GetSubPostNumByUserId(string userId)
        {
            return userRepository.GetSubPostNumByUserId(userId);  
        }

        public void BuySubscription(BuySubscription buySubscription)
        {
            userRepository.BuySubscription(buySubscription); 
        }

        public void BuyAd(BuyAd buyAd)
        {
             userRepository.BuyAd(buyAd); 
        }

        public void EndSubscription(string userId)
        {
            userRepository.EndSubscription(userId); 
        }

        public NumOfPost NumberOFPostByUserId(string userId)
        {
            return userRepository.NumberOFPostByUserId(userId);
        }

        public PostId GetLastPost(string userId)
        {
            return userRepository.GetLastPost(userId);
        }

        public List<FeedBackDto> GetAcceptedFeedback()
        {
            return userRepository.GetAcceptedFeedback();
        }

        public List<UserChat> GetChatsByUserId(string userId)
        {
            return userRepository.GetChatsByUserId(userId);
        }

        public List<ChatMessages> GetMessagesByChatId(int chatId)
        {
            return userRepository.GetMessagesByChatId(chatId);
        }

        public UserImage GetUserImage(string userId)
        {
            return userRepository.GetUserImage(userId);
        }

        public UserFirstName GetUserFirstName(string userId)
        {
            return userRepository.GetUserFirstName(userId); 
        }

        public UserLastName GetUserLastName(string userId)
        {
            return userRepository.GetUserLastName(userId);  
        }

        public FullNameById GetFullNameByUserId(string userId)
        {
            return userRepository.GetFullNameByUserId(userId);
        }

        public LastMessage GetLastMessageByChatId(int chatId)
        {
            return userRepository.GetLastMessageByChatId(chatId);
        }
    }
}
