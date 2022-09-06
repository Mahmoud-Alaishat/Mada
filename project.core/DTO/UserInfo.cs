using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace project.core.DTO
{
    public class UserInfo
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ProfilePath { get; set; }   
        public string CoverPath { get; set; }
        public string Address { get; set; }
        public string Relationship { get; set; }
        public string Bio { get; set; }     
        public int SubscriptionId { get; set; }
        public DateTime Subscribeexpiry { get; set; }
        public int StaticNumPost { get; set; }
        public int IsFristPost { get; set; }

    }
}
