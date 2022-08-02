using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Data
{
    public class Bank
    {
        public int Id { get; set; }
        public string CardNumber { get; set; }
        public int CCV { get; set; }
        public int ExpiryMonth { get; set; }
        public int ExpiryYear { get; set; }
        public string HolderId { get; set; }
        public decimal Balance { get; set; }
        public string HolderName { get; set; }
    }
}
