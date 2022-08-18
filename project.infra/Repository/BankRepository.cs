using Dapper;
using project.core.Data;
using project.core.Domain;
using project.core.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace project.infra.Repository
{
    public class BankRepository : IBankRepository
    {
        private readonly IDBContext context;
        public BankRepository(IDBContext context)
        {
            this.context = context;
        }
        public List<Bank> CRUDOP(Bank bank, string operation)
        {
            var parameter = new DynamicParameters();
            List<Bank> re = new List<Bank>();
            parameter.Add("idofbank", bank.Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("cardnumberr", bank.CardNumber, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("ccvnumber", bank.CCV, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("expirymonthh", bank.ExpiryMonth, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("expiryyearr", bank.ExpiryYear, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("holderidd", bank.HolderId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("Balancee", bank.Balance, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("holdername", bank.HolderName, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("operation", operation, dbType: DbType.String, direction: ParameterDirection.Input);

            if (operation == "read" | operation == "readbyid")
            {
                var result = context.dbConnection.Query<Bank>("Bank_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();
            }
            else
            {
                context.dbConnection.ExecuteAsync("Bank_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return re;
            }
        }
    }
}
