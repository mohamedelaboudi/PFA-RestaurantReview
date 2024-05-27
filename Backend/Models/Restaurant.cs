using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace frontapi.Models
{
    public class Restaurant
    {
        [Key]
        public int RestaurantId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string ImageUrl { get; set; }

        public ICollection<Review> Reviews { get; set; } = new List<Review>();



    }
}
