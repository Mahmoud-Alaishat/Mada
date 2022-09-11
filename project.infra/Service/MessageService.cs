using project.core.Data;
using project.core.Repository;
using project.core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace project.infra.Service
{
    public class MessageService : IMessageService
    {
        private readonly IMessageRepository  messageRepository;

        public MessageService(IMessageRepository messageRepository)
        {
            this.messageRepository = messageRepository;
        }

        public void Delete(int id)
        {
            Message m = new Message();
            m.Id = id;
            messageRepository.CRUDOP(m,"delete").ToList().FirstOrDefault(); 

        }

        public List<Message> GetAllMessage()
        {
            return messageRepository.CRUDOP(new Message(), "read");
        }

        public Message GetMessageById(int id)
        {
            Message m = new Message();
            m.Id=id;
            return messageRepository.CRUDOP(m, "readbyid").ToList().FirstOrDefault();
        }

        public Message Create(Message message)
        {
            messageRepository.CRUDOP(message,"insert").ToList().FirstOrDefault();
            return message;
        }

        public Message Update(Message message)
        {
            messageRepository.CRUDOP(message, "update").ToList().FirstOrDefault();
            return message;
        }
        public void SaveMessage(Message message)
        {
            messageRepository.SaveMessage(message);
        }

    }
}
