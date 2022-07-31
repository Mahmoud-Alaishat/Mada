using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace project.core.Data
{
    public class Likes
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }
        public int PostId { get; set; }
        [ForeignKey("UserId")]
        public virtual Users Users { get; set; }
        [ForeignKey("PostId")]
        public virtual Post Post { get; set; }
    }
}
