using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace project.core.Data
{
    public class Bank
    {
        [Key]
        public int Id { get; set; }
        public string CardNumber { get; set; }
        public string CCV { get; set; }
        public string ExpiryMonth { get; set; }
        public string ExpiryYear { get; set; }
        public string HolderId { get; set; }
        public decimal Balance { get; set; }
        public string HolderName { get; set; }
    }
}
