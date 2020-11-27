using System.Linq;
using System.Reflection;

namespace Kongres.Api.Domain.Enums
{
    public static class UserType
    {
        public const string Admin = "Admin";
        public const string Reviewer = "Reviewer";
        public const string Participant = "Participant";

        public static bool IsContains(string name)
            => typeof(UserType).GetFields(BindingFlags.Public | BindingFlags.Static)
                               .Any(x => x.Name == name);
    }
}
