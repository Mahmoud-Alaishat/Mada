using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace project.core.Data
{
    public class ReplyToComment
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }
        public int CommentId { get; set; }
        public string Content { get; set; }
        public DateTime ReplayDate { get; set; }
        public string Item { get; set; }

        [NotMapped]
        public IFormFile ItemFile { get; set; }

        [ForeignKey("UserId")]
        public virtual Users Users { get; set; }
        [ForeignKey("CommentId")]
        public virtual Comments Comments { get; set; }

    }
}
