using System;
using System.Collections.Generic;
using System.Text;
using project.core.Data;

namespace project.core.Service
{
    public interface IRevenueService
    {
        public Revenue Create(Revenue revenue);
        public Revenue Update(Revenue revenue);
        public void Delete(int id);
        public List<Revenue> GetAllRevenue();
        public Revenue GetRevenueById(int id);
    }
}
