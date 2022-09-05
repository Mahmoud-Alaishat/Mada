using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace project.core.Data
{
    public class Users : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ProfilePath { get; set; }
        public int SubscriptionId { get; set; } 
        [NotMapped]
        public IFormFile ImageFile { get; set; }
        public ICollection<Post> Posts { get; set; }
        public ICollection<Comments> Commentss { get; set; }
        public ICollection<Likes> Likess { get; set; }
        public ICollection<ReplyToComment> ReplyToComments { get; set; }
        public ICollection<Request> Request { get; set; }
        public string CoverPath { get; set; }
        [NotMapped]
        public IFormFile ImageFile1 { get; set; }
        public string Address { get; set; }
        public string Relationship { get; set; }
        public string Bio { get; set; }
        public DateTime SubscribeExpiry { get; set; }
        public int StaticNumPost { get; set; }
        public int IsFirstPost { get; set; }
    }
}
