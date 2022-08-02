using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace project.core.Data
{
    public class Request
    {
        [Key]
        public int Id { get; set; }
        public string ReceiverId { get; set; }
        public string SenderId { get; set; }
        public DateTime DateOfSend { get; set; }
        [ForeignKey("UserId")]

        public virtual Users Users { get; set; }
        [ForeignKey("SenderId")]
        public virtual Users User { get; set; }


    }
}
