using project.core.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Repository
{
   public interface IContentTypeRepository
    {
        public List<ContentType> CRUDOP(ContentType contentType, string operation);

    }
}
