using project.core.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Service
{
    public interface IContactUsService
    {
        public ContactUs Create(ContactUs contact);
        public ContactUs Update(ContactUs contact);
        public void Delete(int contactId);
        public ContactUs GetContactUsById(int contactId);
        public List<ContactUs> GetEmails();
    }
}
