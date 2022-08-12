using project.core.Data;
using project.core.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Repository
{
    public interface IFriendRepository
    {
        public List<Friend> CRUDOP(Friend friend, string operation);
        public FriendsCount CountFriends(string userId);
        public List<FirendPost> GetFriendPosts(string userId);

        public List<UserFriend> GetFriends(string userId);  


    }
}
