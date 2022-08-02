using project.core.Data;
using project.core.DTO;
using project.core.Repository;
using project.core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace project.infra.Service
{
    public class RequestService : IRequestService
    {

        private readonly IRequestRepository requestRepository;
        public RequestService(IRequestRepository requestRepository)
        {
            this.requestRepository = requestRepository;
        }

        public RequestCount CountRequest(string receiverId)
        {
         
            return requestRepository.CountRequest(receiverId);
        }

        public Request Create(Request request)
        {
            return requestRepository.CRUDOP(request, "insert").ToList().SingleOrDefault();
        }

        public void Delete(string senderId)
        {
            Request request = new Request();
            request.SenderId = senderId;
            requestRepository.CRUDOP(request, "delete");
        }

        public Request GetRequestById(string senderId)
        {

            Request request = new Request();
            request.SenderId = senderId;
           return   requestRepository.CRUDOP(request, "readbyid").ToList().SingleOrDefault();

        }

        public List<Request> GetRequests(string receiverId)
        {
            Request request = new Request();
            request.ReceiverId = receiverId;
            return requestRepository.CRUDOP(request, "read");
        }
    }
}
