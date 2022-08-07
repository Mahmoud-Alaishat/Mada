using project.core.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Service
{
    public interface IEmailService
    {
        void SendEmail(EmailDto request);
    }
}
