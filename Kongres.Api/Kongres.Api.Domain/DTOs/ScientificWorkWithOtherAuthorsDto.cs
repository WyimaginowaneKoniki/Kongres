namespace Kongres.Api.Domain.DTOs
{
    public class ScientificWorkWithOtherAuthorsDto
    {
        public uint Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string CreationDate { get; set; }
        public string UpdateDate { get; set; }
        public string Specialization { get; set; }
        public string OtherAuthors { get; set; }
    }
}
