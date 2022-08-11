using project.core.DTO;
using project.core.Repository;
using project.core.Service;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.infra.Service
{
    public class UserPostsService: IUserPostsService
    {
        private readonly IUserPostsRepository userPostsRepository;

        public UserPostsService(IUserPostsRepository userPostsRepository)
        {
            this.userPostsRepository = userPostsRepository;
        }

        public List<PostData> GetUserPosts(string userId)
        {
            return userPostsRepository.GetUserPosts(userId);
        }
    }
}
