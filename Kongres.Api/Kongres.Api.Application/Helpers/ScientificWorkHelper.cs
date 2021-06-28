using Kongres.Api.Domain.Entities;

namespace Kongres.Api.Application.Helpers
{
    public static class ScientificWorkHelper
    {
        /// <summary>
        /// Create string list of authors
        /// </summary>
        /// <param name="mainAuthor">main author of the work</param>
        /// <param name="otherAuthors">other authors of the work</param>
        /// <returns>returns only main author when otherAuthor is empty, otherwise author's full names divided by ','</returns>
        public static string GetAuthors(User mainAuthor, string otherAuthors)
            => string.IsNullOrWhiteSpace(otherAuthors)
                    ? UserHelper.GetFullName(mainAuthor)
                    : $"{UserHelper.GetFullName(mainAuthor)}, {otherAuthors}";
    }
}
