using project.core.Data;
using project.core.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Repository
{
    public interface IAdminRepository
    {
        public List<Useractivities> GetUseractivities();
        public DashboardCounter DashboardCounters();
        public void BlockAdvertisement(int postId);
        public void UnBlockAdvertisement(int postId);
        public void DeleteUser(string userId);
        public List<FeedBackDto> GetLast2FeedBack();
        public List<ReportDto> GetLast2Reports();
        public List<FeedBackDto> CRUDOPFeedback(FeedBackDto feedBack, string operation);
        public List<ReportDto> CRUDOPReport(ReportDto report, string operation);
        public List<UserAd> GetUserAndAd();
        public List<TopPostSeen> GetTopPostSeen();
        public List<UserStory> UserStory();
        public void BlockStory(int storyId);
        public void UnBlockStory(int storyId);
        public List<RevenueDetails> RevenueDetails();
        public List<Design> CRUDOPDesign(Design design, string operation);
        public void AcceptFeedback(int feedbackId);
        public void RejectFeedback(int feedbackId);
        public void AcceptReport(int postId);   
        public void RejectReport(int reportId);   
        public List<PostDetails> GetPostById(int postId);
        public List<RevenueByDate> GetRevenueByDate(string year,string month);
    }
}
