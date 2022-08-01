using project.core.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Repository
{
   public interface IChatRepository
    {
        public List<Chat> CRUDOP(Chat chat, string operation);
    }
}
