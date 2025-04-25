using E_Commerce.Data;
using E_Commerce.Entity;

namespace E_Commerce.Extensions.ServiceRegistrations
{
    public static class AddIdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services)
        {
            services.AddIdentity<AppUser, AppRole>()
                    .AddEntityFrameworkStores<DataContext>();
            return services;
        }
    }
}
