using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.DTO
{
    public class ChatMessages
    {
        public string SenderId { get; set; }
        public string MessageContent { get; set; }
        public int ChatId { get; set; }
        public DateTime MessageDate { get; set; }

    }
}
