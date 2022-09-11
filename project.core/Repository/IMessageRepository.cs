using project.core.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Repository
{
    public interface IMessageRepository
    {
        public List<Message> CRUDOP(Message message, string operation);
        public void SaveMessage(Message message);
    }
}
