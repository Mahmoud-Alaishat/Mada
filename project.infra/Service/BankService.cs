using project.core.Data;
using project.core.Repository;
using project.core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace project.infra.Service
{
    public class BankService : IBankService
    {
        private readonly IBankRepository bankRepository;
        public BankService(IBankRepository bankRepository)
        {
            this.bankRepository = bankRepository;
        }
        public Bank Create(Bank bank)
        {
            return bankRepository.CRUDOP(bank, "insert").ToList().FirstOrDefault();
        }

        public void Delete(int id)
        {
            Bank b = new Bank();
            b.Id = id;
            bankRepository.CRUDOP(b, "delete");
        }

        public List<Bank> GetAllBank()
        {
            Bank b = new Bank();
            return bankRepository.CRUDOP(b, "read");
        }

        public List<Bank> GetUserVisa(string userId)
        {
            Bank b = new Bank(); 
            b.HolderId=userId;
            return bankRepository.CRUDOP(b, "readbyid");
        }

        public Bank Update(Bank bank)
        {
            bankRepository.CRUDOP(bank, "update").ToList().FirstOrDefault();
            return bank;
        }
    }
}
