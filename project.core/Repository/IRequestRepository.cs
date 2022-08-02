using project.core.Data;
using project.core.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Repository
{
    public interface IRequestRepository
    {
        public List<Request> CRUDOP(Request request, string operation);
        public RequestCount  CountRequest(string receiverId);
    }
}
