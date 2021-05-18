using Kongres.Api.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Moq;

namespace Kongres.Api.Tests.Unit.Fakes
{
    public class FakeRoleManager : RoleManager<Role>
    {
        public FakeRoleManager()
            : base(new Mock<IRoleStore<Role>>().Object,
                   null,//new Mock<IEnumerable<IRoleValidator<Role>>>().Object,
                   null,//new Mock<ILookupNormalizer>().Object,
                   null,//new Mock<IdentityErrorDescriber>().Object,
                   null)//new Mock<ILogger<RoleManager<Role>>>().Object)
        { }
    }
}
