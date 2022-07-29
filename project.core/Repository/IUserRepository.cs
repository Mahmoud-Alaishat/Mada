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
        public List<User> CRUDOP(User user,string operation);
        public LoginResult Login(Login login);
        public void Register(User user);
    }
}
