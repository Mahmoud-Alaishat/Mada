using System;
using System.Collections.Generic;
using System.Text;
using project.core.Data;

namespace project.core.Service
{
    public  interface IStoryService
    {
        public Story Create(Story story);
        public Story Update(Story story);
        public void Delete(int id);
        public List<Story> GetAllStorys();
        public Story GetStoryById(int id);
    }
}
