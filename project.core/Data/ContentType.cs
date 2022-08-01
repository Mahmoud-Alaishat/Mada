using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace project.core.Data
{
   public class ContentType
    {
        [Key]
        public int Id { get; set; }
        public string Type { get; set; }
    }
}
