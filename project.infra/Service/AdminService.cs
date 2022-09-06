using project.core.Data;
using project.core.DTO;
using project.core.Repository;
using project.core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public void BlockAdvertisement(int postId)
        {
            adminRepository.BlockAdvertisement(postId);
        }

        public DashboardCounter DashboardCounters()
        {
            return adminRepository.DashboardCounters();
        }


        public void DeleteUser(string userId)
        {
            adminRepository.DeleteUser(userId);
        }

        public List<Useractivities> GetUseractivities()
        {
            return adminRepository.GetUseractivities();
        }

        public List<FeedBackDto> GetLast2FeedBack()
        {
            return adminRepository.GetLast2FeedBack();
        }

        public void UnBlockAdvertisement(int postId)
        {
            adminRepository.UnBlockAdvertisement(postId);
        }

        public List<ReportDto> GetLast2Reports()
        {
            return adminRepository.GetLast2Reports();
        }

        public List<FeedBackDto> GetFeedBack()
        {
            FeedBackDto feedBack = new FeedBackDto();
            return adminRepository.CRUDOPFeedback(feedBack, "read");
        }

        public List<ReportDto> GetReport()
        {
            ReportDto report = new ReportDto();
            return adminRepository.CRUDOPReport(report, "read");
        }

        //public ReportDto AcceptReport(ReportDto report)
        //{
        //    report.StatusId = 2;
        //    adminRepository.CRUDOPReport(report, "update");
        //   return GetReportById(report.Id);
        //}

        //public void RejectReport(ReportDto report)
        //{
        //    report.StatusId = 3;
        //    adminRepository.CRUDOPReport(report, "update");
        //}

        public List<UserAd> GetUserAndAd()
        {
            return adminRepository.GetUserAndAd();
        }

        public List<UserStory> UserStory()
        {
            return adminRepository.UserStory();
        }

        public void BlockStory(int storyId)
        {
             adminRepository.BlockStory(storyId);
        }

        public void UnBlockStory(int storyId)
        {
             adminRepository.UnBlockStory(storyId);
        }

        public List<RevenueDetails> RevenueDetails()
        {
            return adminRepository.RevenueDetails();
        }

        public Design UpdateDesign(Design design)
        {
            return adminRepository.CRUDOPDesign(design, "update").ToList().FirstOrDefault();
        }

        public Design GetDesignById(string id)
        {
            Design design = new Design();
            design.Id = id;
            return adminRepository.CRUDOPDesign(design, "readbyid").ToList().FirstOrDefault();
        }

        public List<TopPostSeen> GetTopPostSeen()
        {
            return adminRepository.GetTopPostSeen();
        }

        public ReportDto GetReportById(int reportId)
        {
            ReportDto report = new ReportDto();
            report.Id = reportId;
            return adminRepository.CRUDOPReport(report, "readbyid").ToList().SingleOrDefault();
        }
        public List<FeedBackDto> GetFeedbackByStatus(int status)
        {
            FeedBackDto feedBack = new FeedBackDto();
            feedBack.FeedbackStatus= status;
            return adminRepository.CRUDOPFeedback(feedBack, "readbyid");
        }
        public void AcceptFeedback(int feedbackId)
        {
           adminRepository.AcceptFeedback(feedbackId);
        }

        public void RejectFeedback(int feedbackId)
        {
            adminRepository.RejectFeedback(feedbackId);
        }

        public List<PostDetails> GetPostById(int postId)
        {
            return adminRepository.GetPostById(postId); 
        }

        public void AcceptReport(int postId)
        {
            adminRepository.AcceptReport(postId);    
        }

        public void RejectReport(int reportId)
        {
            adminRepository.RejectReport(reportId); 
        }

        public List<RevenueByDate> GetRevenueByDate(string year, string month)
        {
            return adminRepository.GetRevenueByDate(year, month);
        }
    }
}
