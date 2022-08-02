using project.core.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Repository
{
    public interface IBankRepository
    {
        public List<Bank> CRUDOP(Bank  bank, string operation);

    }
}
