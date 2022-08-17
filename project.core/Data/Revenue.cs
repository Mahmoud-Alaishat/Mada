using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace project.core.Data
{
    public class Revenue
    {
        [Key]
        public int Id { get; set; }
        public string Service { get; set; }
        public double TotalRevenue { get; set; }
        

    }
}
