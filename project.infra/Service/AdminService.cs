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

        public List<Useractivities> GetUseractivities()
        {
            return adminRepository.GetUseractivities();
        }

        public void UnBlockAdvertisement(int postId)
        {
            adminRepository.UnBlockAdvertisement(postId);
        }
    }
}
