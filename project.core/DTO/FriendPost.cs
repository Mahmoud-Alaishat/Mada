using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Data
{
    public class FriendPost
    {
        public int PostId { get; set; }
        public string Content { get; set; }
        public DateTime PostDate { get; set; }
        public string UserId { get; set; }
        public string ProfilePath { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int TypePost { get; set; }
    }
}
