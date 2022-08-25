using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace project.core.Data
{
    public class Attachment
    {
        [Key]
        public int Id { get; set; }
        public int PostId { get; set; }
        
        public string Item { get; set; }

        [ForeignKey("PostId")]
        public virtual Post Post { get; set; }
    }
}
