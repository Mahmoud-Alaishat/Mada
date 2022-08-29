using project.core.Data;
using project.core.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Service
{
    public interface IAdminService
    {
        public List<Useractivities> GetUseractivities();
        public VideoImageCount CountVideoImage();
        public LikeCommentPostAdCount CountLikeCommentPostAd();
        public void BlockAdvertisement(int postId);
        public void UnBlockAdvertisement(int postId);
        public void DeleteUser(string userId);
        public List<FeedBackDto> GetLast2FeedBack();
        public List<ReportDto> GetLast2Reports();
        public List<FeedBackDto> GetFeedBack();
        public List<ReportDto> GetReport();
        public ReportDto AcceptReport(ReportDto report);
        public void RejectReport(ReportDto report);
        public List<UserSubscription> GetUserAndSubscription();
        public List<UserStory> UserStory();
        public void BlockStory(int storyId);
        public void UnBlockStory(int storyId);
        public List<RevenueDetails> RevenueDetails();
        public Design UpdateDesign(Design design);
        public Design GetDesignById(string id);



        public List<TopPostSeen> GetTopPostSeen();
        public ReportDto GetReportById(int reportId);

    }
}
