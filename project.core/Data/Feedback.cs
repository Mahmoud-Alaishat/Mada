using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace project.core.Data
{
   public class Feedback
    {
        [Key]
        public int Id { get; set; }
        public string FeedbackText { get; set; }
        public int FeedbackStatus { get; set; }
        public string UserId { get; set; }
    }
}
