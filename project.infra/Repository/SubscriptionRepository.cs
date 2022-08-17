using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using Dapper;
using project.core.Data;
using project.core.Domain;
using project.core.DTO;
using project.core.Repository;

namespace project.infra.Repository
{
    public class SubscriptionRepository : ISubscriptionRepository
    {

        private readonly IDBContext context;
        public SubscriptionRepository(IDBContext context)
        {
            this.context = context;
        }

        public SubscriptionsCount CountSubscription()
        {
            var result = context.dbConnection.Query<SubscriptionsCount>("Subscription_package_api.CountSubscription", commandType: CommandType.StoredProcedure);
            return result.SingleOrDefault();
        }

        public List<Subscription> CRUDOP(Subscription subscription, string operation)
        {
            var parameter = new DynamicParameters();
            List<Subscription> re = new List<Subscription>();
            parameter.Add("idofSubscription", subscription.Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("nameSubscription", subscription.Name, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("priceSubscription", subscription.Price, dbType: DbType.Double, direction: ParameterDirection.Input);
            parameter.Add("desSubscription", subscription.Description, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("fetSubscription", subscription.Feature, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("limitofpost", subscription.LimitPost, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("durationSubscription", subscription.Duration, dbType: DbType.Int32, direction: ParameterDirection.Input);

            parameter.Add("operation", operation, dbType: DbType.String, direction: ParameterDirection.Input);
            if (operation == "read" | operation == "readbyid")
            {
                var result = context.dbConnection.Query<Subscription>("Subscription_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return result.ToList();
            }
            else
            {
                context.dbConnection.ExecuteAsync("Subscription_package_api.CRUDOP", parameter, commandType: CommandType.StoredProcedure);
                return re;
            }
        }
    }
}
