using project.core.Data;
using project.core.Repository;
using project.core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace project.infra.Service
{
    public class DesignService : IDesignService
    {
        private readonly IDesignRepository  designRepository;
        public DesignService(IDesignRepository designRepository)
        {
            this.designRepository = designRepository;
        }
        public Design Create(Design design)
        {
            return designRepository.CRUDOP(design, "insert").ToList().FirstOrDefault();
        }

        public void Delete(string id)
        {
            Design design = new Design();
            design.Id = id;
            designRepository.CRUDOP(design, "delete");

        }

        public List<Design> GetAllDesign()
        {
            Design designs = new Design();
            return designRepository.CRUDOP(designs, "read");
        }

        public Design GetDesignById(string id)
        {
            Design design = new Design();
            design.Id=id;
            return designRepository.CRUDOP(design, "readbyid").ToList().FirstOrDefault();
        }

        public Design Update(Design design)
        {
            return designRepository.CRUDOP(design, "update").ToList().FirstOrDefault();

        }
    }
}
