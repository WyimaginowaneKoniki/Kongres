using Microsoft.Extensions.Caching.Memory;
using System;

namespace Kongres.Api.Domain.Extensions
{
    public static class CacheExtensions
    {
        public static string GetJwtKey(Guid tokenId)
            => $"{tokenId}-jwt";

        public static void SetJwt(this IMemoryCache cache, Guid tokenId, string jwt)
            => cache.Set(GetJwtKey(tokenId), jwt, TimeSpan.FromSeconds(10));

        public static string GetJwt(this IMemoryCache cache, Guid tokenId)
            => cache.Get<string>(GetJwtKey(tokenId));
    }
}
