using Microsoft.AspNetCore.Identity;
using project.core.Data;
using project.core.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace project.core.Service
{
   public interface IUserService
    {
        public User Update(User user);

        public void Delete(string userId);

        public List<User> GetUsers();

        public User GetUserById(string userId);
        public string Login(Login login);
        public void Register(User user);
    }
}
