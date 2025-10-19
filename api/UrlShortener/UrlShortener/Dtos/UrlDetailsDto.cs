namespace UrlShortener.Dtos
{
    public class UrlDetailsDto
    {
        public int Id { get; set; }
        public string OriginalUrl { get; set; }
        public string ShortCode { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedByUsername { get; set; }
    }
}
