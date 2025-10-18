using System.ComponentModel.DataAnnotations;

namespace UrlShortener.Entities
{
    public class ShortUrl
    {
        public int Id { get; set; }
        [Required]
        public string OriginalUrl { get; set; }
        [Required]
        public string ShortCode { get; set; }
        public DateTime CreatedAt { get; set; }

        public int CreatedById { get; set; }
        public User CreatedBy { get; set; }
    }
}
