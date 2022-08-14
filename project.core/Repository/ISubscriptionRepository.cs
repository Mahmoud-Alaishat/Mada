using System;
using System.Collections.Generic;
using System.Text;
using project.core.Data;
using project.core.DTO;

namespace project.core.Repository
{
    public interface ISubscriptionRepository
    {
        public List<Subscription> CRUDOP(Subscription subscription, string operation);
        public SubscriptionsCount CountSubscription();
    }
}
