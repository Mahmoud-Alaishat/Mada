using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace project.core.Data
{
    public class User : IdentityUser
    {
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String ProfilePath { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }
    }
}
