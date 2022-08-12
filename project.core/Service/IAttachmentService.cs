using project.core.Data;
using project.core.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Service
{
    public interface IAttachmentService
    {
        public Attachment Create(Attachment attachment);
        public void Delete(int attachmentId);
        public Attachment GetAttachmentById(int attachmentId);
        public List<Attachment> GetAllAttachments();
        public Attachment Update(Attachment attachment);
        public AttachmentCount CountAttachment();
        public List<AttachmentData> GetPostAttachment(int postId);

    }
}
