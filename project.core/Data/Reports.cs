using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace project.core.Data
{
    public class Reports
    {
        [Key]

        public int Id { get; set; }
        public int PostId { get; set; }
        public int StatusId { get; set; }
        public string UserId { get; set; }
        
    }
}
