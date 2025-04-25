using E_Commerce.Services;

namespace E_Commerce.Extensions.ServiceRegistrations
{
    public static class AddScopedExtensions
    {
        public static IServiceCollection AddScopedRegistrations(this IServiceCollection services)
        {
            services.AddScoped<TokenService>();
            
            return services;
        }
    }
}
