using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace project.core.Data
{
    public class Post
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Content { get; set; }
        public int TypePost { get; set; }
        public DateTime PostDate { get; set; }
        public int Clicks  { get; set; }
        public int IsBlocked { get; set; }
        [ForeignKey("UserId")]
        public virtual Users Users { get; set; }
        public ICollection<Comments> Commentss { get; set; }
        public ICollection<Attachment> Attachments { get; set; }
        public ICollection<Likes> Likess { get; set; }
        public int ShowAd { get; set; }

        public DateTime EndDate { get; set; }

    }
    }
