using project.core.Data;
using project.core.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Service
{
    public interface ILikeService
    {
        public void Delete(int likeId);
        public Likes GetLikeById(int likeId);
        public List<Likes> GetAllikes();
        public Likes Update(Likes like);
        public LikesCount Countlike();
    }
}
