using Kongres.Api.Domain.Entities;
using Kongres.Api.Domain.Enums;
using Kongres.Api.Infrastructure;

namespace Kongres.Api.Application.Helpers
{
    public static class UserHelper
    {
        public static string GetFullName(User user)
            => $"{user.Name} {user.Surname}";

        public static string GetRole(User user)
            => user.UserName.Split(":")[0];

        public static string GetUserName(UserTypeEnum role, string email)
            => $"{role}:{email}";

        public static string GetBase64Photo(IFileManager fileManager, string photoName)
        {
            if (string.IsNullOrWhiteSpace(photoName))
                return null;

            var authorPhoto = fileManager.GetBase64FileAsync(photoName).Result;
            var photoExtension = photoName.Split(".")[^1];

            return $"data:image/{photoExtension};base64,{authorPhoto}";
        }
    }
}
