using project.core.Data;
using project.core.Repository;
using project.core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace project.infra.Service
{
    public class ContactUsService : IContactUsService
    {
        private readonly IContactUsRepository contactUsRepository;

        public ContactUsService(IContactUsRepository contactUsRepository)
        {
            this.contactUsRepository = contactUsRepository;
        }
        public ContactUs Create(ContactUs contact)
        {
            return contactUsRepository.CRUDOP(contact, "insert").ToList().SingleOrDefault();

        }

        public void Delete(int contactId)
        {
            ContactUs contact = new ContactUs();
            contact.Id = contactId;

            contactUsRepository.CRUDOP(contact, "delete");
        }

        public List<ContactUs> GetEmails()
        {
            ContactUs contact = new ContactUs();
            return contactUsRepository.CRUDOP(contact, "read");
        }

        public ContactUs GetContactUsById(int contactId)
        {
            ContactUs contact = new ContactUs();
            contact.Id = contactId;
            return contactUsRepository.CRUDOP(contact, "readbyid").ToList().SingleOrDefault();
        }

        public ContactUs Update(ContactUs contact)
        {
            return contactUsRepository.CRUDOP(contact, "update").ToList().SingleOrDefault();
        }
    }
}
