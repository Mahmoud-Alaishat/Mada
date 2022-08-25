using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using Dapper;
using project.core.Data;
using project.core.Domain;
using project.core.Repository;

namespace project.infra.Repository
{
    public class StoryRepository : IStoryRepository
    {
        private readonly IDBContext context;
        public StoryRepository(IDBContext context)
        {
            this.context = context;
        }
        public List<Story> CRUDOP(Story story, string operation)
        {
            var parameter = new DynamicParameters();
            List<Story> re = new List<Story>();
            parameter.Add("idofStory", story.Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("itemofStory", story.Item, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("idofUser", story.UserId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("dateofStory", story.StoryDate, dbType: DbType.DateTime, direction: ParameterDirection.Input);
            parameter.Add("blocked", story.IsBlocked, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("operation", operation, dbType: DbType.String, direction: ParameterDirection.Input);

            if (operation == "read" || operation == "readbyid")
            {
                var result = context.dbConnection.Query<Story>("Story_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();

            }
            else
            {
                context.dbConnection.Execute("Story_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return re;
            }

        }
    }
}
