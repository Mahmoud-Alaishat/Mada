using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.DTO
{
    public class UserChat
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ProfilePath { get; set; }
        public DateTime ChatDate { get; set; }
        public string FirstUserId { get; set; }
        public string SecondUserId { get; set; }
    }
}
