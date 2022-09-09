using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.DTO
{
    public class FeedBackDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string FeedbackText { get; set; }
        public int FeedbackStatus { get; set; }
        public string StatusName { get; set; }
        public string ProfilePath { get; set; }
    }
}
