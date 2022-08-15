using project.core.Data;
using project.core.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Service
{
    public interface ILikeService
    {
        public void Create(Likes like);

        public void Delete(int likeId);
        public Likes GetLikeById(int likeId);
        public List<Likes> GetAllikes();
    
        public LikesCount Countlike();
        public List<PostLikeData> GetPostLikes(int postId);
        public LikeId HitLike(HitLikeByUser likeByUser);


    }
}
