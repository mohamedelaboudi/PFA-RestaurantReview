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
    public class AuthoController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly JwtManagr _jwtManager;

        public AuthoController(DataContext context, JwtManagr jwtManager)
        {
            _context = context;
            _jwtManager = jwtManager; 

        }

        [HttpPost("register")]
        public IActionResult Register(User user , JwtManagr jwtManager)
        {
            try
            {
                if (user == null || string.IsNullOrEmpty(user.Firstname) || string.IsNullOrEmpty(user.Lastname) || string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.Password) )
                    return BadRequest("User data is missing");

                if (_context.Users.Any(u => u.Email == user.Email && u.Firstname == user.Firstname))
                    return Conflict("User already exists");

                _context.Users.Add(user);
                _context.SaveChanges();
                var token = _jwtManager.GenerateToken(user);

                return Ok(new { Token = token, Message = "User registered successfully" });
            }
            catch (DbUpdateException ex)
            {


                return StatusCode(500, "An error occurred while registering the user. Please try again later.");
            }
        }


        // POST: api/Autho
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("login")]
        public IActionResult Login(LoginRequest request)


        {
            try
            {
                if (request == null)
                    return BadRequest("Login request is missing");
                var existingUser = _context.Users.FirstOrDefault(u => u.Email == request.Email && u.Password == request.Password);
                if (existingUser == null)
                    return Unauthorized("Invalid email or password");

                var token = _jwtManager.GenerateToken(existingUser);

                return Ok(new { Token = token, Role = existingUser.Role });


            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");


            }





        }

        public class LoginRequest
        {
            public string Email { get; set; }
            public string Password { get; set; }


        }


        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
}
