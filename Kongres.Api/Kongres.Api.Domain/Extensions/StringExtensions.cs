namespace Kongres.Api.Domain.Extensions
{
    public static class StringExtensions
    {
        public static bool isEmpty(this string str)
            => string.IsNullOrWhiteSpace(str);
    }
}
