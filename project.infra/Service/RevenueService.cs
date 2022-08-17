using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Extensions.Hosting;
using project.core.Data;
using project.core.Repository;
using project.core.Service;
using project.infra.Repository;

namespace project.infra.Service
{
    public class RevenueService : IRevenueService
    {

        private readonly IRevenueRepository revenueRepository;
        public RevenueService(IRevenueRepository revenueRepository)
        {
            this.revenueRepository = revenueRepository;

        }
        public Revenue Create(Revenue revenue)
        {
            revenueRepository.CRUDOP(revenue, "insert").ToList().FirstOrDefault();
            return revenue;
        }

        public void Delete(int id)
        {
            Revenue R= new Revenue();
            R.Id = id;
            revenueRepository.CRUDOP(R, "delete").ToList().FirstOrDefault();
        }

        public List<Revenue> GetAllRevenue()
        {
            return revenueRepository.CRUDOP(new Revenue(), "read");
        }

        public Revenue GetRevenueById(int id)
        {
            Revenue R = new Revenue();
            R.Id = id;
            return revenueRepository.CRUDOP(R, "readbyid").ToList().FirstOrDefault();
        }

        public Revenue Update(Revenue revenue)
        {
            revenueRepository.CRUDOP(revenue, "update").ToList().FirstOrDefault();
            return revenue;
        }
    }
}
