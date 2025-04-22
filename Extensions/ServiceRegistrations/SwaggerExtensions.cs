namespace E_Commerce.Extensions.ServiceRegistrations
{
    public static class SwaggerExtensions
    {
        public static WebApplication UseCustomSwagger(this WebApplication app)
        {
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
