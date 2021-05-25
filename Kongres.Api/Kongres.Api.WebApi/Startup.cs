using Autofac;
using Kongres.Api.Application.Modules;
using Kongres.Api.Application.Services;
using Kongres.Api.Application.Services.Interfaces;
using Kongres.Api.Domain.Entities;
using Kongres.Api.Infrastructure;
using Kongres.Api.Infrastructure.Context;
using Kongres.Api.Infrastructure.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Quartz;
using System.Text;
using NETCore.MailKit.Extensions;
using NETCore.MailKit.Infrastructure.Internal;
using Kongres.Api.Application.Mappers;

namespace Kongres.Api.WebApi
{
    public class Startup
    {
        private const string ReactPath = "../../web-client";
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSpaStaticFiles(config => config.RootPath = $"{ReactPath}/build");

            services.AddDbContext<KongresDbContext>(options
                => options.UseMySql(_configuration["Database:ConnectionString"]));

            services.AddIdentity<User, Role>(options =>
            {
                options.SignIn.RequireConfirmedAccount = false;
                options.SignIn.RequireConfirmedEmail = true;
                options.SignIn.RequireConfirmedPhoneNumber = false;
                options.User.AllowedUserNameCharacters = _configuration["Identity:AllowedUserNameCharacters"];
            }).AddDefaultTokenProviders();

            services.AddControllers()
                .AddJsonOptions(x =>
                {
                    // change json response formatting
                    x.JsonSerializerOptions.WriteIndented = true;
                });

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(config =>
            {
                config.SaveToken = true;

                var secretBytes = Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]);
                var key = new SymmetricSecurityKey(secretBytes);

                config.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidIssuer = _configuration["Jwt:Issuer"],
                    ValidAudience = _configuration["Jwt:Audience"]
                };
            });

            services.AddMemoryCache();
            services.AddMailKit(config => config.UseMailKit(_configuration.GetSection("Email").Get<MailKitOptions>()));

            services.AddTransient<IUserStore<User>, UserStore>();
            services.AddTransient<IRoleStore<Role>, RoleStore>();
            services.AddSingleton<IFileManager, FileManager>();
            services.AddSingleton(AutoMapperConfig.Initialize());
        }

        public void ConfigureContainer(ContainerBuilder builder)
        {
            builder.RegisterModule<MediatRModule>();
            builder.RegisterModule(new SettingsModule(_configuration));
            builder.RegisterModule<ServiceModule>();
            builder.RegisterModule<RepositoryModule>();
            builder.RegisterModule<QuartzModule>();
        }

        public async void Configure(IApplicationBuilder app, IWebHostEnvironment env, KongresDbContext context,
            RoleManager<Role> roleManager, IJobsInitializer jobsInitializer)
        {
            context.Database.Migrate();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthentication();

            IdentityDataInitializer.SeedData(roleManager);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = ReactPath;

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            await jobsInitializer.SeedJobsAsync();
        }
    }
}
