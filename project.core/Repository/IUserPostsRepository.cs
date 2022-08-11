using project.core.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Repository
{
    public interface IUserPostsRepository
    {
        public List<PostData> GetUserPosts(string userId);
    }
}
