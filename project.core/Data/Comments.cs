using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace project.core.Data
{
   public class Comments
    {
        [Key]
        public int ID { get; set; }
        public int POSTID { get; set; }

        public string USERID { get; set; }
       
        public string CONTENT { get; set; }
        public DateTime COMMENTDAT { get; set; }
        public string ITEM { get; set; }
        [NotMapped]
        public IFormFile ImgVid { get; set; }
        [ForeignKey("POSTID")]
        public virtual Post Post { get; set; }
        [ForeignKey("USERID")]
        public virtual Users Users { get; set; }
        public ICollection<ReplyToComment> ReplyToComments { get; set; }

    }
}
