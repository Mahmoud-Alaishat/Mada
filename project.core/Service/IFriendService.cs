using project.core.Data;
using project.core.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Service
{
    public interface IFriendService
    {
        public Friend Create(Friend friend);
        public void Delete(string friendId);
        public Friend GetFriendById(string friendId);
        public List<Friend> GetAllFriends(string userId);

        public FriendsCount CountFriends();
    }
}
