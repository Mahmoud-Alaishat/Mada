using System;
using System.Collections.Generic;
using System.Text;
using project.core.Data;

namespace project.core.Repository
{
    public interface IRevenueRepository
    {
        public List<Revenue> CRUDOP(Revenue revenue, string operation);
    }
}
