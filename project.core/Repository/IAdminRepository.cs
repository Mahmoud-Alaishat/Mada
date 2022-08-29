using project.core.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Repository
{
    public interface IAdminRepository
    {
        public List<Useractivities> GetUseractivities();
        public VideoImageCount CountVideoImage();
        public LikeCommentPostAdCount CountLikeCommentPostAd();
        public void BlockAdvertisement(int postId);
        public void UnBlockAdvertisement(int postId);
        public void DeleteUser(string userId);
        public List<FeedBackDto> GetLast2FeedBack();
        public List<ReportDto> GetLast2Reports();
        public List<FeedBackDto> CRUDOPFeedback(FeedBackDto feedBack, string operation);
        public List<ReportDto> CRUDOPReport(ReportDto report, string operation);
        public List<UserSubscription> GetUserAndSubscription();
        public List<UserStory> UserStory();


    }
}
