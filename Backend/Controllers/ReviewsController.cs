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
using System.ComponentModel.DataAnnotations;

namespace frontapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly JwtManagr _jwtManager;


        public ReviewsController(DataContext context, JwtManagr jwtManager)
        {
            _context = context;
            _jwtManager = jwtManager;

        }

        //get reviews that belong to a restaurant

        [HttpGet("restaurant/{restaurantId}")]
        public async Task<ActionResult<IEnumerable<Review>>> GetReviewsByRestaurantId(int restaurantId)
        {
           

                // Retrieve the restaurant with the specified ID including its reviews
                var restaurant = await _context.Restaurants
                    .Include(r => r.Reviews)
                    .FirstOrDefaultAsync(r => r.RestaurantId == restaurantId);

                if (restaurant != null)
                {
                return Ok(restaurant.Reviews);
                }

                // Return only the reviews associated with the specified restaurant
                                    return NotFound("Restaurant not found");

          
        }


        // GET: api/Reviews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Review>> GetReview(int id)
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

                var review = await _context.Reviews.FindAsync(id);

                if (review == null)
                {
                    return NotFound();
                }
                return review;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }


        [HttpPost("{restaurantId}")]
        public async Task<ActionResult<Review>> PostReview(int restaurantId, [FromBody] ReviewViewModel reviewViewModel)
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


                // Check if the restaurant exists
                var restaurant = await _context.Restaurants.FindAsync(restaurantId);
                if (restaurant == null)
                {
                    return NotFound("Restaurant not found");
                }

                // Create a new review object with the provided details
                var newReview = new Review()
                {
                    Rating = reviewViewModel.Rating,
                    ReviewText = reviewViewModel.ReviewText,
                    RestaurantId = restaurantId,
                    DatePosted = DateTime.UtcNow,
                    Restaurant = restaurant
                };

                // Add the new review to the context
                _context.Reviews.Add(newReview);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetReview), new { id = newReview.ReviewId }, newReview);

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }

        }




        // DELETE: api/Reviews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(int id)
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
                var review = await _context.Reviews.FindAsync(id);
                if (review == null)
                {
                    return NotFound();
                }

                _context.Reviews.Remove(review);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }

        }
        public class ReviewViewModel
        {
            [Required]
            public double Rating { get; set; }

            [Required]
            public string ReviewText { get; set; }

        }


        private bool ReviewExists(int id)
        {
            return _context.Reviews.Any(e => e.ReviewId == id);
        }
    }
}
