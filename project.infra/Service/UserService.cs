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
                        //new Claim(ClaimTypes.GivenName, result.FirstName),
                        //new Claim(ClaimTypes.Surname, result.LastName),
                        new Claim(ClaimTypes.Name, result.UserName),
                        //new Claim("profileImage",result.ProfilePath),
                        //new Claim("coverImage",result.CoverPath),
                        //new Claim("bio",result.Bio),
                        //new Claim("address",result.Address),
                        //new Claim("relationship",result.Relationship),
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
            //var tokenHandler = new JwtSecurityTokenHandler();
            //var tokenKey = Encoding.ASCII.GetBytes("[SECRET USED TO SIGN AND VERIFY JWT TOKENS, IT CAN BE ANYSTRING]");
            //var tokenDescriptor = new SecurityTokenDescriptor
            //{

            //    Subject = new ClaimsIdentity(new Claim[]
            //    {
            //            new Claim(ClaimTypes.Name, user.UserName),
                        
            //    }),
            //    Expires = DateTime.UtcNow.AddHours(1),
            //    SigningCredentials = new SigningCredentials(new
            //    SymmetricSecurityKey(tokenKey),
            //    SecurityAlgorithms.HmacSha256Signature)
            //};
            //var token = tokenHandler.CreateToken(tokenDescriptor);
            
            userRepository.Register(user);
            return user.Id; //tokenHandler.WriteToken(token);
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
    }
}
