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

    }
}
