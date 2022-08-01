using project.core.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Service
{
   public interface IChatService
    {
        public void Delete(int chatId);
        public Chat GetChatById(int chatId);
        public List<Chat> GetAllChats();
        public Chat Update(Chat chat);
    }
}
