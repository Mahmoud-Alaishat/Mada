using project.core.DTO;
using project.core.Repository;
using project.core.Service;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.infra.Service
{
    public class AdminService: IAdminService
    {
        private readonly IAdminRepository adminRepository;
        public AdminService(IAdminRepository adminRepository)
        {
            this.adminRepository = adminRepository;
        }

        public List<Useractivities> GetUseractivities()
        {
            return this.GetUseractivities();
        }
    }
}
