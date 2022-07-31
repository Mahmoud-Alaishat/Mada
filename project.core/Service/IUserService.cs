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
        public Users Update(Users user);

        public void Delete(string userId);

        public List<Users> GetUsers();

        public Users GetUserById(string userId);
        public string Login(Login login);
        public void Register(Users user);
        public UserCount CountUsers();
    }
}
