using Kongres.Api.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Moq;

namespace Kongres.Api.Tests.Unit.Fakes
{
    public class FakeUserManager : UserManager<User>
    {
        public FakeUserManager()
            : base(new Mock<IUserStore<User>>().Object,
                   null,//new Mock<IOptions<IdentityOptions>>().Object,
                   null,//new Mock<IPasswordHasher<User>>().Object,
                   null,//new IUserValidator<User>[0],
                   null,//new IPasswordValidator<User>[0],
                   null,//new Mock<ILookupNormalizer>().Object,
                   null,//new Mock<IdentityErrorDescriber>().Object,
                   null,//new Mock<IServiceProvider>().Object,
                   null)//new Mock<ILogger<UserManager<User>>>().Object)
        { }
    }
}
