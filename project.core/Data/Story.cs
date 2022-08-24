using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace project.core.Data
{
    public class Story
    {
        [Key]
        public int Id { get; set; }
        public string Item { get; set; }
        public string UserId { get; set; }
        public DateTime StoryDate { get; set; }
        public int IsBlocked { get; set; }

    }
}
