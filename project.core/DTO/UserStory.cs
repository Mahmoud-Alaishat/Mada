using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.DTO
{
    public class UserStory
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int StoryId { get; set; }
        public string StoryContent { get; set; }
        public int IsBlocked { get; set; }
    }
}
