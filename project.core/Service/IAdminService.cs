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
        public void AcceptReport(ReportDto report);
        public void RejectReport(ReportDto report);

    }
}
