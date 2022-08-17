using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Text;
using MimeKit;
using project.core.Data;
using project.core.DTO;
using project.core.Repository;
using project.core.Service;
using project.infra.Repository;

namespace project.infra.Service
{
    public class SubscriptionService : ISubscriptionService
    {
        private readonly ISubscriptionRepository subscriptionRepository;
        public SubscriptionService(ISubscriptionRepository subscriptionRepository)
        {
            this.subscriptionRepository = subscriptionRepository;
        }
        public SubscriptionsCount CountSubscription()
        {
            return subscriptionRepository.CountSubscription();
        }

        public Subscription Create(Subscription subscription)
        {
            return subscriptionRepository.CRUDOP(subscription, "insert").ToList().SingleOrDefault();
        }

        public void Delete(int subscriptionId)
        {
            Subscription subscription = new Subscription();
            subscription.Id = subscriptionId;
            subscriptionRepository.CRUDOP(subscription, "delete");
        }

        public Subscription GetSubscriptionById(int subscriptionId)
        {

            Subscription subscription = new Subscription();
            subscription.Id = subscriptionId;
            return subscriptionRepository.CRUDOP(subscription, "readbyid").ToList().SingleOrDefault();
        }

        public List<Subscription> GetAllSubscriptions()
        {

            return subscriptionRepository.CRUDOP(new Subscription(), "read");
        }

        public Subscription Update(Subscription subscription)
        {
            return subscriptionRepository.CRUDOP(subscription, "update").ToList().SingleOrDefault();
        }
    }
}
