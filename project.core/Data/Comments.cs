using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        public IFormFile ImgVid { get; set; }
    }
}
