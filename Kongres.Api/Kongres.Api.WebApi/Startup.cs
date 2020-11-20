using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Hosting;
using Kongres.Api.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Kongres.Api.WebApi
{
    public class Startup
    {
        private const string reactPath = "../../web-client";

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSpaStaticFiles(config => config.RootPath = $"{reactPath}/build");

            services.AddDbContext<KongresDbContext>(options => {
                options.UseMySql("Server=localhost; Database=Kongres; Uid=root; Pwd=;");
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, KongresDbContext context)
        {
            context.Database.EnsureCreated();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = reactPath;

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
