using project.core.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Service
{
   public interface IContentTypeService
    {
        public ContentType Create(ContentType ContentType);
        public void Delete(int contentTypeId);
        public ContentType GetLikeById(int contentTypeId);
        public List<ContentType> GetAlllikes();
        public ContentType Update(ContentType content);
    }
}
