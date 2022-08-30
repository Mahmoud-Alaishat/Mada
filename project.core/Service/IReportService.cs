using System;
using System.Collections.Generic;
using System.Text;
using project.core.Data;

namespace project.core.Service
{
    public interface IReportService
    {
        public void Delete(int reportId);
        public Reports Update(Reports report);
        public List<Reports> GetAllReports(int reportId);
        public Reports Create(Reports report);
        public List<Reports> AreRepoet(string userId, int postId);
    }
}
