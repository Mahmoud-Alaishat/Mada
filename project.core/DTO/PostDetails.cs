using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.DTO
{
    public class PostDetails
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime PostDate { get; set; }
        public string UserId { get; set; }
        public string Item { get; set; }
    }
}
