using System;
using System.Collections.Generic;
using System.Text;
using project.core.Data;

namespace project.core.Repository
{
    public interface IReportRepository
    {
        public List<Reports> CRUDOP(Reports report, string operation);
        public List<Reports> AreRepoet(string userId, int postId);
    }
}
