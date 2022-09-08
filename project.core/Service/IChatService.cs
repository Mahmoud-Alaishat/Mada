using project.core.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Service
{
   public interface IChatService
    {
        public Chat Create(Chat chat);
        public void Delete(int chatId, string userId);
        public Chat GetChatById(int chatId);
        public List<Chat> GetAllChats();
        public List<Chat> FindChat(string fUserId, string sUserId);

    }
}
