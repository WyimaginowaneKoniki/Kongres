using System;
using System.Linq;
using System.Linq.Expressions;

namespace Kongres.Api.Domain.Extensions
{
    public static class IQueryableExtensions
    {
        // https://codereview.stackexchange.com/a/167514/221246
        public static IQueryable<TSource> WhereIf<TSource>(this IQueryable<TSource> source,
                                                                bool condition,
                                                                Expression<Func<TSource, bool>> predicate) 
            => condition ? source.Where(predicate) : source;
    }
}
