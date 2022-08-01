using project.core.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Service
{
    public interface IMessageService
    {
        public Message Insert(Message  message);
        public Message Update(Message  message);
        public void Delete(int id);
        public List<Message> GetAllMessage();
        public Message GetMessageById(int id);
    }
}
