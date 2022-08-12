using project.core.Data;
using project.core.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Repository
{
    public interface IAttachmentRepository
    {
        public List<Attachment> CRUDOP(Attachment attachment, string operation);
        public AttachmentCount CountAttachment();
        public List<AttachmentData> GetPostAttachment(int postId);

    }
}
