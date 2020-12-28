using MediatR;

namespace Kongres.Api.Application.Commands.Reviewer
{
    public class CreateReviewerCommand : IRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Specialization { get; set; }
        public string University { get; set; }
        public string Degree { get; set; }
    }
}
