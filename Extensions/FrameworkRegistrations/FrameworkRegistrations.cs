namespace E_Commerce.Extensions.FrameworkRegistration
{
    public static class FrameworkRegistrations
    {
        public static IServiceCollection AddFrameworkServices(this IServiceCollection services)
        {
            // AutoMapper registration
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            return services;
        }

        public static WebApplication UseFrameworkMiddlewares(this WebApplication app)
        {
            // Swagger Middleware
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
                app.UseSwaggerUI(options =>
                {
                    options.SwaggerEndpoint("/openapi/v1.json", "Demo API");
                });
            }

            return app;
        }
    }
}
