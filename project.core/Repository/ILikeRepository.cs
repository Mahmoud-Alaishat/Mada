using project.core.Data;
using project.core.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Repository
{
    public interface ILikeRepository
    {
        public List<Likes> CRUDOP(Likes like, string operation);
        public LikesCount CountLikes();
        public List<PostLikeData> GetPostLikes(int postId);
        public LikeId HitLike(HitLikeByUser likeByUser);

    }
}
