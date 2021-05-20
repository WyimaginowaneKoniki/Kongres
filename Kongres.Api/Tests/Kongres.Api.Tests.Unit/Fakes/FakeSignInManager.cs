using Kongres.Api.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Moq;

namespace Kongres.Api.Tests.Unit.Fakes
{
    public class FakeSignInManager : SignInManager<User>
    {
        public FakeSignInManager()
        : base(new FakeUserManager(),
             new Mock<IHttpContextAccessor>().Object,
             new Mock<IUserClaimsPrincipalFactory<User>>().Object,
             null,//new Mock<IOptions<IdentityOptions>>().Object,
             null,//new Mock<ILogger<SignInManager<User>>>().Object,
             null,//new Mock<IAuthenticationSchemeProvider>().Object,
             null)//new Mock<IUserConfirmation<User>>().Object)
        { }
    }
}
