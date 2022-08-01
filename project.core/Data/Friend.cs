using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace project.core.Data
{
    public class Friend
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }
        public string FriendId { get; set; }
        public DateTime Datee { get; set; }
        [ForeignKey("UserId")]
 
        public virtual Users Users { get; set; }
        [ForeignKey("FriendId")]
        public virtual Users User { get; set; }
    }

}
