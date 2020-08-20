using Jabyrinth.Api.Services.Game;
using Microsoft.Extensions.DependencyInjection;

namespace Jabyrinth.Api.DependencyInjection
{
    public static class ServiceInjection
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
            => services.AddTransient<GameCreationService>();
    }
}