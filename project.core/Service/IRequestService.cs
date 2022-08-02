using project.core.Data;
using project.core.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Service
{
    public interface IRequestService
    {

        public void Delete(string senderId);

        public List<Request> GetRequests(string receiverId);

        public Request GetRequestById(string senderId);
        public Request Create(Request request);
        public RequestCount CountRequest(string receiverId);
    }
}
