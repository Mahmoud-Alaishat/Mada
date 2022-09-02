﻿using project.core.Data;
using project.core.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Service
{
    public interface IAdminService
    {
        public List<Useractivities> GetUseractivities();
        public DashboardCounter DashboardCounters();
        public void BlockAdvertisement(int postId);
        public void UnBlockAdvertisement(int postId);
        public void DeleteUser(string userId);
        public List<FeedBackDto> GetLast2FeedBack();
        public List<ReportDto> GetLast2Reports();
        public List<FeedBackDto> GetFeedBack();
        public List<ReportDto> GetReport();
        public ReportDto AcceptReport(ReportDto report);
        public void RejectReport(ReportDto report);
        public List<UserAd> GetUserAndAd();
        public List<UserStory> UserStory();
        public void BlockStory(int storyId);
        public void UnBlockStory(int storyId);
        public List<RevenueDetails> RevenueDetails();
        public Design UpdateDesign(Design design);
        public Design GetDesignById(string id);
        public List<TopPostSeen> GetTopPostSeen();
        public ReportDto GetReportById(int reportId);
        public void AcceptFeedback(int feedbackId);
        public void RejectFeedback(int feedbackId);
        public List<PostDetails> GetPostById(int postId);


    }
}
