﻿using Microsoft.AspNetCore.Identity;
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
            User user = new User();
            user.Id = userId;
            userRepository.CRUDOP(user, "delete");
        }

        public User GetUserById(string userId)
        {
            User user = new User();
            user.Id = userId;
           return userRepository.CRUDOP(user, "readbyid").ToList().SingleOrDefault();
        }

        public List<User> GetUsers()
        {
            throw new NotImplementedException();
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

        public void Register(User user)
        {
             userRepository.Register(user);
        }

        public User Update(User user)
        {
            throw new NotImplementedException();
        }
    }
}
