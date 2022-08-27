using Dapper;
using project.core.Domain;
using project.core.DTO;
using project.core.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace project.infra.Repository
{
    public class AdminRepository: IAdminRepository
    {
        private readonly IDBContext context;
        public AdminRepository(IDBContext context)
        {
            this.context = context;
        }

        public void BlockAdvertisement(int postId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofpost", postId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            context.dbConnection.Execute("Admin_package_api.BlockAd",parameter, commandType: CommandType.StoredProcedure);
        }

        public LikeCommentPostAdCount CountLikeCommentPostAd()
        {
            var result = context.dbConnection.Query<LikeCommentPostAdCount>("Admin_package_api.CountLikeCommentPostAd", commandType: CommandType.StoredProcedure);
            return result.SingleOrDefault();
        }

        public VideoImageCount CountVideoImage()
        {
            var result = context.dbConnection.Query<VideoImageCount>("Admin_package_api.CountVideoImage", commandType: CommandType.StoredProcedure);
            return result.SingleOrDefault();
        }

        public List<Useractivities> GetUseractivities()
        {
            var result = context.dbConnection.Query<Useractivities>("Admin_package_api.UserActivities", commandType: CommandType.StoredProcedure);
            return result.ToList();
        }

        public void UnBlockAdvertisement(int postId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("idofpost", postId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            context.dbConnection.ExecuteAsync("Admin_package_api.UnBlockAd",parameter, commandType: CommandType.StoredProcedure);
        }
    }
}
