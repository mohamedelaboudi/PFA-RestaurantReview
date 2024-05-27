using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using frontapi.Data;
using frontapi.Models;
using frontapi.JwtManager;


namespace frontapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly JwtManagr _jwtManager;

        public RestaurantsController(DataContext context , JwtManagr jwtManager)
        {
            _context = context;
            _jwtManager = jwtManager;

        }

        // GET: api/Restaurants
        [HttpGet("allReastaurants")]
        public async Task<ActionResult<IEnumerable<Restaurant>>> GetRestaurants()
        {
           
                return await _context.Restaurants.ToListAsync();
          
        }

        // GET: api/Restaurants/5
        [HttpGet("singelReastaurants/{id}")]
        public async Task<ActionResult<Restaurant>> GetRestaurant(int id)
        {
            

                var restaurant = await _context.Restaurants.FindAsync(id);

                if (restaurant == null)
                {
                    return NotFound();
                }

                return restaurant;
            
        }
      

        [HttpGet("byname/{name}")]
        public async Task<ActionResult<Restaurant>> GetRestaurantByName(string name)
        {
            try
            {
                // Extract the token from the request headers
                var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

                // Validate the token
                var userClaims = _jwtManager.ValidateToken(token);
                if (userClaims == null)
                {
                    return Unauthorized(); // Token validation failed
                }
                var restaurant = await _context.Restaurants.FirstOrDefaultAsync(r => r.Name == name);

            if (restaurant == null)
            {
                return NotFound();
            }

            return restaurant;
        }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
    }
}


        [HttpPost("AddResturant")]
        public async Task<ActionResult<Restaurant>> PostRestaurant(RestaurantDTO restaurantDTO)
        {
            try
            {
                // Extract the token from the request headers
                var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

                // Validate the token
                var userClaims = _jwtManager.ValidateToken(token);
                if (userClaims == null)
                {
                    return Unauthorized(); // Token validation failed
                }

                var restaurant = new Restaurant
                {
                    Name = restaurantDTO.Name,
                    Description = restaurantDTO.Description,
                    City = restaurantDTO.City,
                    Address = restaurantDTO.Address,
                    ImageUrl = restaurantDTO.ImageUrl,
                    Reviews = new List<Review>() // Initialize reviews as an empty list
                };

                _context.Restaurants.Add(restaurant);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetRestaurant), new { id = restaurant.RestaurantId }, restaurant);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

        //delet restaurant 
        [HttpDelete("deleterestaurant/{id}")]
        public async Task<IActionResult> DeleteRestaurnt(int id)
        {
            try
            {
                // Extract the token from the request headers
                var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

                // Validate the token
                var userClaims = _jwtManager.ValidateToken(token);
                if (userClaims == null)
                {
                    return Unauthorized(); // Token validation failed
                }

                var Restaurant = await _context.Restaurants.FindAsync(id);
            if (Restaurant == null)
            {
                return NotFound();
            }

            _context.Restaurants.Remove(Restaurant);
            await _context.SaveChangesAsync();

            return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

        public class RestaurantDTO
        {
            public string Name { get; set; }
            public string Description { get; set; }
            public string City { get; set; }
            public string Address { get; set; }
            public string ImageUrl { get; set; }
        }

        private bool RestaurantExists(int id)
        {
            return _context.Restaurants.Any(e => e.RestaurantId == id);
        }
    }
}
