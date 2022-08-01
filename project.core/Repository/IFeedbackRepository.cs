using project.core.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Repository
{
   public interface IFeedbackRepository
    {
        public List<Feedback> CRUDOP(Feedback feedback, string operation);

    }
}
