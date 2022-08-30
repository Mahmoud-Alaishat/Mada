using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace project.core.DTO
{
    public class UserSubscription
    {
        [Key]
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int SubscriptionId { get; set; }
        public DateTime SubscribeDate { get; set; }
        public double Price { get; set; }
    }
}
