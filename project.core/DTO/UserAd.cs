using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace project.core.DTO
{
    public class UserAd
    {
        [Key]
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime PostDate { get; set; }
        public double Price { get; set; }
        public string Content { get; set; }
        public int Id { get; set; }
        public string UserId { get; set; }
    }
}
