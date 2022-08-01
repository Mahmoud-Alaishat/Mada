using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace project.core.Data
{
    public class Users : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ProfilePath { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }
        public ICollection<Post> Posts { get; set; }
        public ICollection<Comments> Commentss { get; set; }
        public ICollection<Likes> Likess { get; set; }
        public ICollection<ReplyToComment> ReplyToComments { get; set; }
        

    }
}
