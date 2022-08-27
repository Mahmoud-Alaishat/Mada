using project.core.Domain;
using project.core.Repository;
using System;
using System.Collections.Generic;
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
    }
}
