using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
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
        public int IsBlocked { get; set; }
        
    }
}
