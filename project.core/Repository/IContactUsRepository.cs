using project.core.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Repository
{
    public interface IContactUsRepository
    {
        public List<ContactUs> CRUDOP(ContactUs contact, string operation);

    }
}
