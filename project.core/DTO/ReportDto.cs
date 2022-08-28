using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.DTO
{
    public class ReportDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int PostId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Content { get; set; }
        public int StatusId { get; set; }
        public string StatusName { get; set; }
    }
}
