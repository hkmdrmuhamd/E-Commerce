using E_Commerce.Data;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Extensions.ServiceRegistrations
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddApplicationDbContext(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("defaultConnection");

            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlite(connectionString);
            });

            return services;
        }
    }
}
