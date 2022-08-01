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
        public int FirstUserId { get; set; }
        public int SecondUserId { get; set; }
        public int StatusInFUser { get; set; }
        public int StatusInSUser { get; set; }

    }
}
