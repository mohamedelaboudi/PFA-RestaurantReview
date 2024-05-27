using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace frontapi.Models
{
    public class Review
    {
        [Key]
        public int ReviewId { get; set; }

        [Required]
        public double Rating { get; set; }

        [Required]
        public string ReviewText { get; set; }

        [Required]
        public DateTime DatePosted { get; set; }

        public int RestaurantId { get; set; }

        [ForeignKey("RestaurantId")]
        public Restaurant Restaurant { get; set; }  // Optional navigation property
    }
}
