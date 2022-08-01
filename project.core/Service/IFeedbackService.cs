using project.core.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Service
{
   public interface IFeedbackService
    {
        public Feedback Create(Feedback feedback);
        public void Delete(int feedbackId);
        public Feedback GetFeedbackById(int feedbackId);
        public List<Feedback> GetAllFeedbacks();
        public Feedback Update(Feedback feedback);
    }
}
