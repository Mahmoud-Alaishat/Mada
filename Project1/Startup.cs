using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using project.core.Data;
using project.core.Domain;
using project.core.Repository;
using project.core.Service;
using project.infra.Domain;
using project.infra.Repository;
using project.infra.Service;
using Project1.Hubs;
using System;
using System.IO;
using System.Text;

namespace Project1
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IDBContext, DbContext>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserService, UserService>();

            services.AddScoped<IPostRepository, PostRepository>();
            services.AddScoped<IPostService, PostService>();
            services.AddScoped<ICommentRepository, CommentRepository>();
            services.AddScoped<ICommentService, CommentService>();
            services.AddScoped<IAttachmentRepository, AttachmentRepository>();
            services.AddScoped<IAttachmentService, AttachmentService>();
            services.AddScoped<ILikeRepository, LikeRepository>();
            services.AddScoped<ILikeService, LikeService>();
            services.AddScoped<IReplyRepository,ReplyRepository>();
            services.AddScoped<IReplyService,ReplyService>();
            services.AddScoped<IContentTypeRepository,ContentTypeRepository>();
            services.AddScoped<IContentTypeService,ContentTypeService>();
            services.AddScoped<IChatRepository, ChatRepository>();
            services.AddScoped<IChatService,ChatService>();
            services.AddScoped<IMessageRepository, MessageRepository>();
            services.AddScoped<IMessageService, MessageService>();
            services.AddScoped<IFeedbackRepository,FeedbackRepository>();
            services.AddScoped<IFeedbackService,FeedbackService>();
            services.AddScoped<IFriendRepository, FriendRepository>();
            services.AddScoped<IFriendService, FriendService>(); 
            services.AddScoped<IRequestRepository, RequestRepository>();
            services.AddScoped<IRequestService, RequestService>();
            services.AddScoped<IBankRepository, BankRepository>();
            services.AddScoped<IBankService, BankService>();
            services.AddScoped<IContactUsRepository, ContactUsRepository>();
            services.AddScoped<IContactUsService,ContactUsService>();
            services.AddScoped<IDesignRepository, DesignRepository>();
            services.AddScoped<IDesignService, DesignService>();
            services.AddScoped<IEmailService,EmailService>();
            services.AddScoped<IReportRepository, ReportRepository>();
            services.AddScoped<IReportService, ReportService>();
            services.AddScoped<IStoryRepository, StoryRepository>();
            services.AddScoped<IStoryService, StoryService>();
            services.AddScoped<IRevenueRepository, RevenueRepository>();
            services.AddScoped<IRevenueService, RevenueService>();
            services.AddScoped<ISubscriptionRepository, SubscriptionRepository>();
            services.AddScoped<ISubscriptionService, SubscriptionService>();
            services.AddScoped<IAdminRepository,AdminRepository>();
            services.AddScoped<IAdminService, AdminService>();
            services.AddControllersWithViews();
            services.AddCors(options =>
            {
                options.AddPolicy("EnableCORS", builder =>
                {
                    builder.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
           
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(30);//We set Time here 
                options.Cookie.HttpOnly = true;
                options.Cookie.IsEssential = true;
            });
            
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }

            ).AddJwtBearer(y =>
            {
                y.RequireHttpsMetadata = false;
                y.SaveToken = true;
                y.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("[SECRET Used To Sign And Verify Jwt Token,It can be any string]")),
                    ValidateIssuer = false,
                    ValidateAudience = false,

                };
            });

            services.Configure<FormOptions>(o =>
            {
                o.ValueLengthLimit = int.MaxValue;
                o.MultipartBodyLengthLimit = int.MaxValue;
                o.MemoryBufferThreshold = int.MaxValue;
            });
            services.AddSignalR();

        }
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
           
            app.UseSession();

            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseCors("EnableCORS");
            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
                RequestPath = new PathString("/Resources")
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<ChatHub>("/Chat");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
