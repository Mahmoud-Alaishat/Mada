using project.core.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace project.core.Repository
{
    public interface IDesignRepository
    {
        public List<Design> CRUDOP(Design design, string operation);

    }
}
