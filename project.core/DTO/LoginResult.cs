using Microsoft.AspNetCore.Identity;
using project.core.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.DTO
{
   public class LoginResult
    {
        public string Email { get; set; }
        public string RoleName { get; set; }
        public string UserName { get; set; }
        public string Id { get; set; }
    }
}
