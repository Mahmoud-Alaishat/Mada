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

        public void BlockAdvertisement(int postId)
        {
            adminRepository.BlockAdvertisement(postId);
        }

        public LikeCommentPostAdCount CountLikeCommentPostAd()
        {
            return adminRepository.CountLikeCommentPostAd();
        }

        public VideoImageCount CountVideoImage()
        {
            return adminRepository.CountVideoImage();
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

        public void AcceptReport(ReportDto report)
        {
            report.StatusId = 2;
            adminRepository.CRUDOPReport(report, "update");
        }

        public void RejectReport(ReportDto report)
        {
            report.StatusId = 3;
            adminRepository.CRUDOPReport(report, "update");
        }

        public List<UserSubscription> GetUserAndSubscription()
        {
            return adminRepository.GetUserAndSubscription();
        }

        public List<RevenueDetails> RevenueDetails()
        {
            return adminRepository.RevenueDetails();
        }
    }
}
