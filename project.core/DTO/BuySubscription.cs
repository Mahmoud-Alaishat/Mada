using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.DTO
{
    public class BuySubscription
    {
        public string UserId { get; set; }
        public int SubscriptionId { get; set; }
        public int Price { get; set; }
        public int VisaID { get; set; }
    }
}
