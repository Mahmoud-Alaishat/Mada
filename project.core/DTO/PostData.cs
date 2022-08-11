using project.core.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.DTO
{
    public class PostData
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Content { get; set; }
        public DateTime PostDate { get; set; }
        public List<Likes> Likes { get; set; }
        public List<Comments> Commentss { get; set; }
        public List<Attachment> Attachments { get; set; }
    }
}
