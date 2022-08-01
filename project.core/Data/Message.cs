using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Data
{
    public class Message
    {
        public int  Id { get; set; }
        public string SenderId { get; set; }
        public string MessageContent { get; set; }
        public int ChatId { get; set; }
        public DateTime MessageDate { get; set; }

    }
}
