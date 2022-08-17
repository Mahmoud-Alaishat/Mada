using System;
using System.Collections.Generic;
using System.Text;
using project.core.Data;

namespace project.core.Repository
{
    public interface IStoryRepository
    {
        public List<Story> CRUDOP(Story story, string operation);
    }
}
