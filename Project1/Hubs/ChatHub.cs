using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace Project1.Hubs
{
    public class ChatHub : Hub
    {
        // <snippet_OnConnectedAsync>
        public override async Task OnConnectedAsync()
        {
            var group = Context.GetHttpContext().Request.Query["token"];

            string value = !string.IsNullOrEmpty(group.ToString()) ? group.ToString() : "default";
            await Groups.AddToGroupAsync(Context.ConnectionId, value);
            await base.OnConnectedAsync();
        }
        // </snippet_OnConnectedAsync>

        // <snippet_OnDisconnectedAsync>
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await base.OnDisconnectedAsync(exception);
        }
        // </snippet_OnDisconnectedAsync>

        // <snippet_Clients>

        public async Task SendMessage(string user, string message)
            => await Clients.All.SendAsync("ReceiveMessage", user, message);

        public async Task SendMessageToCaller(string user, string message)
            => await Clients.Caller.SendAsync("ReceiveMessage", user, message);

        public async Task SendMessageToGroup(string sender, string receiver, string message)
        {
            await Clients.Group(receiver).SendAsync("ReceiveMessage", sender, message);
        }

        // <snippet_HubMethodName>
        [HubMethodName("SendMessageToUser")]
        public async Task DirectMessage(string user, string message)
            => await Clients.User(user).SendAsync("ReceiveMessage", user, message);
        // </snippet_HubMethodName>

        // <snippet_ThrowException>
        public Task ThrowException()
            => throw new HubException("This error will be sent to the client!");
        // </snippet_ThrowException>
    }
}
