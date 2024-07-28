using System.ComponentModel.DataAnnotations;

namespace APIs.Models
{
    public class BlogPost
    {

        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Username { get; set; }

        [Required]
        public DateTime DateCreated { get; set; }

        [Required]
        public string Text { get; set; }
    }
}
