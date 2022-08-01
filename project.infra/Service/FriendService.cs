﻿using project.core.Data;
using project.core.DTO;
using project.core.Repository;
using project.core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace project.infra.Service
{
    public class FriendService : IFriendService
    {
        private readonly IFriendRepository friendRepository;

        public FriendService(IFriendRepository friendRepository)
        {
            this.friendRepository = friendRepository;

        }

        public FriendsCount CountFriends()
        {
            return friendRepository.CountFriends();
        }

        public Friend Create(Friend friend)
        {
            return friendRepository.CRUDOP(friend, "insert").ToList().SingleOrDefault();
        }

        public void Delete(string friendId)
        {
            Friend friend = new Friend();
            friend.FriendId = friendId;
            friendRepository.CRUDOP(friend, "delete");
        }

        public List<Friend> GetAllFriends(string userId)
        {
            Friend friend = new Friend();
            friend.UserId = userId;
           return friendRepository.CRUDOP(friend, "read");
        }

        public Friend GetFriendById(string friendId)
        {
            Friend friend = new Friend();
            friend.FriendId = friendId;
            return friendRepository.CRUDOP(friend, "readbyid").ToList().SingleOrDefault();
        }


    }
}
