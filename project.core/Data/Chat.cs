using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace project.core.Data
{
   public class Chat
    {
        [Key]
        public int Id { get; set; }
        public string FirstUserId { get; set; }
        public string SecondUserId { get; set; }
        public int StatusInFUser { get; set; }
        public int StatusInSUser { get; set; }

    }
}
