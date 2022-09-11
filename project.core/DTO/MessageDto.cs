using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.DTO
{
    public class MessageDto
    {
        public string sender { get; set; }
        public string receiver { get; set; }
        public string msgText { get; set; }
        public int chatId { get; set; }
        public DateTime messageDate { get; set; }
    }
}
