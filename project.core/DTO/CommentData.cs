using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.DTO
{
    public class CommentData
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Commentdat { get; set; }
        public string Item { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ProfilePath { get; set; }
        public string UserId { get; set; }
    }
}
