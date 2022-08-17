using project.core.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Service
{
    public interface IBankService
    {
        public Bank Create(Bank bank);
        public Bank Update(Bank bank);
        public void Delete(int id);
        public List<Bank> GetAllBank();
        public List<Bank> GetUserVisa(string userId);
    }
}
