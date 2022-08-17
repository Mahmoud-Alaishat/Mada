using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using project.core.Data;
using project.core.Repository;
using project.core.Service;
using project.infra.Repository;

namespace project.infra.Service
{
    public class StoryService : IStoryService
    {

        private readonly IStoryRepository storyRepository;

        public StoryService(IStoryRepository storyRepository)
        {
            this.storyRepository = storyRepository;

        }
        public Story Create(Story story)
        {
            storyRepository.CRUDOP(story, "insert").ToList().FirstOrDefault();
            return story;
        }

        public void Delete(int id)
        {
            Story S = new Story();
            S.Id = id;
            storyRepository.CRUDOP(S, "delete").ToList().FirstOrDefault();
        }

        public List<Story> GetAllStorys()
        {
            return storyRepository.CRUDOP(new Story(), "read");
        }

        public Story GetStoryById(int id)
        {
            Story S = new Story();
            S.Id = id;
            return storyRepository.CRUDOP(S, "readbyid").ToList().FirstOrDefault();
        }

        public Story Update(Story story)
        {
            storyRepository.CRUDOP(story, "update").ToList().FirstOrDefault();
            return story;
        }
    }
}
