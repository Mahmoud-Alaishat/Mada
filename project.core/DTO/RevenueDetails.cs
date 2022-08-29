using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.DTO
{
    public class RevenueDetails
    {
        public string Service { get; set; }
        public int TotalRevenue { get; set; }
        public int NumberOfSubscribers { get; set; }
        public int NumberOfAllSubscribers { get; set; }
    }
}
