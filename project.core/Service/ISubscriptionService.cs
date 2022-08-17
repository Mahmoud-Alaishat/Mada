using System;
using System.Collections.Generic;
using System.Text;
using project.core.Data;
using project.core.DTO;

namespace project.core.Service
{
    public interface ISubscriptionService
    {
        public Subscription Update(Subscription subscription);
        public void Delete(int subscriptionId);

        public List<Subscription> GetAllSubscriptions();

        public Subscription GetSubscriptionById(int subscriptionId);
        public Subscription Create(Subscription subscription);

        public SubscriptionsCount CountSubscription();
    }
}
