using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.DTO
{
   public class Login
    {
        [ProtectedPersonalData]
        public virtual string Email { get; set; }
        public virtual string PasswordHash { get; set; }
    }
}
