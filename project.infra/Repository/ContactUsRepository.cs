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
    public class ContactUsRepository : IContactUsRepository
    {
        private readonly IDBContext context;
        public ContactUsRepository(IDBContext context)
        {
            this.context = context;
        }

        public List<ContactUs> CRUDOP(ContactUs contact, string operation)
        {
            var parameter = new DynamicParameters();
            DateTime localDate = DateTime.Now;
            List<ContactUs> re = new List<ContactUs>();
            parameter.Add("idofcontactus", contact.Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("nameofuser", contact.Name, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("emailofuser", contact.Email, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("phoneofuser", contact.Phone, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("subjectt", contact.Subject, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("messageofcontactus", contact.Message, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("dateofcontactus", localDate, dbType: DbType.DateTime, direction: ParameterDirection.Input);
            parameter.Add("showhidee", contact.ShowHide, dbType: DbType.Int32, direction: ParameterDirection.Input);


            parameter.Add("operation", operation, dbType: DbType.String, direction: ParameterDirection.Input);
            if (operation == "read" | operation == "readbyid")
            {
                var result = context.dbConnection.Query<ContactUs>("ContactUs_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();
            }
            else
            {
                context.dbConnection.ExecuteAsync("ContactUs_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return re;
            }
        }
    }
}
