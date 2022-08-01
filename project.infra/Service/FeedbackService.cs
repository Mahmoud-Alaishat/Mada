using project.core.Data;
using project.core.Repository;
using project.core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace project.infra.Service
{
    public class FeedbackService : IFeedbackService
    {
        private readonly IFeedbackRepository feedbackRepository;
        
        public FeedbackService(IFeedbackRepository feedbackRepository)
        {
            this.feedbackRepository = feedbackRepository;
        }
        public Feedback Create(Feedback feedback)
        {
           var result= feedbackRepository.CRUDOP(feedback, "insert").ToList().SingleOrDefault();
           return result;
        }
        public void Delete(int feedbackId)
        {

            Feedback feedback = new Feedback();
            feedback.Id = feedbackId;
            feedbackRepository.CRUDOP(feedback, "delete");
        }

        public List<Feedback> GetAllFeedbacks()
        {
            Feedback feedback = new Feedback();
            return feedbackRepository.CRUDOP(feedback, "read");

        }

        public Feedback GetFeedbackById(int feedbackId)
        {
            Feedback feedback = new Feedback();
            feedback.Id = feedbackId;
            return feedbackRepository.CRUDOP(feedback, "readbyid").ToList().SingleOrDefault();
        }

        public Feedback Update(Feedback feedback)
        {
            return feedbackRepository.CRUDOP(feedback, "update").ToList().SingleOrDefault();
        }
    }
}
