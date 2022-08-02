using project.core.Data;
using project.core.Repository;
using project.core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace project.infra.Service
{
   public class ChatService: IChatService
    {
        private readonly IChatRepository chatRepository;

        public ChatService(IChatRepository chatRepository)
        {
            this.chatRepository = chatRepository;
        }

        public Chat Create(Chat chat)
        {
            return chatRepository.CRUDOP(chat, "insert").ToList().SingleOrDefault();
        }

        public void Delete(int chatId,string userId)
        {
            Chat chat = new Chat();
            chat.Id = chatId;
            chat.FirstUserId = userId;
            chatRepository.CRUDOP(chat, "delete");
        }

        public List<Chat> GetAllChats()
        {
            Chat chat = new Chat();
            return chatRepository.CRUDOP(chat, "read");
        }

        public Chat GetChatById(int chatId)
        {
            Chat chat = new Chat();
            chat.Id = chatId;
           return chatRepository.CRUDOP(chat, "readbyid").ToList().SingleOrDefault();
        }

        public Chat Update(Chat chat)
        {
            return chatRepository.CRUDOP(chat, "update").ToList().SingleOrDefault();
        }
    }
}
