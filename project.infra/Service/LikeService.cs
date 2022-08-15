using project.core.Data;
using project.core.DTO;
using project.core.Repository;
using project.core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace project.infra.Service
{
    public class LikeService : ILikeService
    {
        private readonly ILikeRepository likeRepository;
        public LikeService(ILikeRepository likeRepository)
        {
            this.likeRepository = likeRepository;
        }

        public LikesCount Countlike()
        {
            return likeRepository.CountLikes();
        }

        public void Create(Likes like)
        {
             likeRepository.CRUDOP(like, "insert").ToList().SingleOrDefault();
        }

        public void Delete(int likeId)
        {
            Likes like = new Likes();
            like.Id = likeId;
            likeRepository.CRUDOP(like, "delete");
        }

        public List<Likes> GetAllikes()
        {
            Likes like = new Likes();
            return likeRepository.CRUDOP(like, "read");
        }

        public Likes GetLikeById(int likeId)
        {
            Likes like = new Likes();
            like.Id = likeId;
            return likeRepository.CRUDOP(like, "readbyid").ToList().SingleOrDefault();
        }

        public List<PostLikeData> GetPostLikes(int postId)
        {
            return likeRepository.GetPostLikes(postId); 
        }

        public LikeId HitLike(HitLikeByUser likeByUser)
        {
            return likeRepository.HitLike(likeByUser);
        }
    }
}
