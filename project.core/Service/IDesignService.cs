using project.core.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Service
{
    public interface IDesignService
    {
        public Design Create(Design  design);
        public Design Update(Design  design);
        public void Delete(string id);
        public List<Design> GetAllDesign();
        public Design GetDesignById(string id);
    }
}
