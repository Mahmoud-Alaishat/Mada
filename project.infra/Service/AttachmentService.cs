using project.core.Data;
using project.core.DTO;
using project.core.Repository;
using project.core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace project.infra.Service
{
    public class AttachmentService : IAttachmentService
    {

        private readonly IAttachmentRepository attachmentRepository;
        public AttachmentService(IAttachmentRepository attachmentRepository)
        {
            this.attachmentRepository = attachmentRepository;
        }

        public void Delete(int attachmentId)
        {
            Attachment attachment = new Attachment();
            attachment.Id = attachmentId;
            attachmentRepository.CRUDOP(attachment, "delete");
        }

        public Attachment GetAttachmentById(int attachmentId)
        {
            Attachment attachment = new Attachment();
            attachment.Id = attachmentId;
            return attachmentRepository.CRUDOP(attachment, "readbyid").ToList().SingleOrDefault();
        }
        public List<Attachment> GetAllAttachments()
        {
            Attachment attachment = new Attachment();
            return attachmentRepository.CRUDOP(attachment,"read");
        }
        public Attachment Update(Attachment attachment)
        {
           return attachmentRepository.CRUDOP(attachment, "update").ToList().SingleOrDefault();
        }
       
        public AttachmentCount CountAttachment()
        {
            return attachmentRepository.CountAttachment();
        }

        public Attachment Create(Attachment attachment)
        {
            return attachmentRepository.CRUDOP(attachment, "insert").ToList().SingleOrDefault();
        }
        public List<AttachmentData> GetPostAttachment(int postId)
        {
            return attachmentRepository.GetPostAttachment(postId);
        }

    }
}
