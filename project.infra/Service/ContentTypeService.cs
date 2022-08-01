using project.core.Data;
using project.core.Repository;
using project.core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace project.infra.Service
{
    public class ContentTypeService : IContentTypeService
    {
        private readonly IContentTypeRepository contentTypeRepository;
        public ContentTypeService(IContentTypeRepository contentTypeRepository)
        {
            this.contentTypeRepository = contentTypeRepository;
        }

        public ContentType Create(ContentType ContentType)
        {
            return contentTypeRepository.CRUDOP(ContentType, "insert").ToList().SingleOrDefault();
        }

        public void Delete(int contentTypeId)
        {

            ContentType content = new ContentType();
            content.Id = contentTypeId;
            contentTypeRepository.CRUDOP(content, "delete");
        }

        public List<ContentType> GetAlllikes()
        {
            ContentType content = new ContentType();
            return contentTypeRepository.CRUDOP(content, "read");

        }

        public ContentType GetLikeById(int contentTypeId)
        {
            ContentType content = new ContentType();
            content.Id = contentTypeId;
            return contentTypeRepository.CRUDOP(content, "readbyid").ToList().SingleOrDefault();
        }

        public ContentType Update(ContentType content)
        {
            return contentTypeRepository.CRUDOP(content, "update").ToList().SingleOrDefault();
        }
    }
}
