using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using project.core.Data;
using project.core.Repository;
using project.core.Service;
using project.infra.Repository;

namespace project.infra.Service
{
    public class ReportService: IReportService
    {
        private readonly IReportRepository reportRepository;

        public ReportService(IReportRepository reportRepository)
        {
            this.reportRepository = reportRepository;

        }

        public List<Reports> AreRepoet(string userId, int postId)
        {
            return reportRepository.AreRepoet(userId, postId);
        }

        public Reports Create(Reports report)
        {
            return reportRepository.CRUDOP(report, "insert").ToList().SingleOrDefault();
            
        }

        public void Delete(int reportId)
        {

            Reports R = new Reports();
            R.Id = reportId;
            reportRepository.CRUDOP(R, "delete").ToList().FirstOrDefault();
        }

        public List<Reports> GetAllReports(int reportId)
        {
            return reportRepository.CRUDOP(new Reports(), "read");
        }

        public Reports Update(Reports report)
        {

            reportRepository.CRUDOP(report, "update").ToList().FirstOrDefault();
            return report;
        }
    }
}
