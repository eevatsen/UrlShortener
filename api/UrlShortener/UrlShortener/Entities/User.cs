using System.ComponentModel.DataAnnotations;

namespace UrlShortener.Entities
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string Username { get; set; }
        public string Role { get; set; } // admin or user
        [Required]
        public string PasswordHash { get; set; }
    }
}
