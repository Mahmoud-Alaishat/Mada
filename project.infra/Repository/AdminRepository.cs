using Dapper;
using project.core.Domain;
using project.core.DTO;
using project.core.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace project.infra.Repository
{
    public class AdminRepository: IAdminRepository
    {
        private readonly IDBContext context;
        public AdminRepository(IDBContext context)
        {
            this.context = context;
        }
        public List<Useractivities> GetUseractivities()
        {
            var result = context.dbConnection.Query<Useractivities>("Admin_package_api.UserActivities", commandType: CommandType.StoredProcedure);
            return result.ToList();
        }
    }
}
