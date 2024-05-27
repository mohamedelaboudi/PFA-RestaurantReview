using frontapi.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace frontapi.JwtManager
{
    public class JwtManagr
    {
        private readonly string _secretKey;
        private readonly string _issuer;
        private readonly string _audience;
        private readonly int _expirationMinutes;

        public JwtManagr(IConfiguration configuration)
        {
            _secretKey = configuration["JWT:Key"];
            _issuer = configuration["JWT:Issuer"];
            _audience = configuration["JWT:Audience"];
            _expirationMinutes = Convert.ToInt32(configuration["JWT:ExpirationMinutes"]);
        }

        public string GenerateToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                 new Claim ("id",user.UserId.ToString()),
                 new Claim("FirstName",user.Firstname),
                 new Claim("LastName",user.Lastname),
                 new Claim("Role", user.Role),
                 new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),


            };


            var token = new JwtSecurityToken(

            issuer: _issuer,
            audience: _audience,
            signingCredentials: credentials,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_expirationMinutes)


        );

            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(token); // Convert the token to a string and return it

        }
        public ClaimsPrincipal ValidateToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var keyBytes = Encoding.ASCII.GetBytes(_secretKey);

            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = _issuer,
                ValidAudience = _audience,
                IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
            };

            try
            {
                SecurityToken validatedToken;
                return tokenHandler.ValidateToken(token, validationParameters, out validatedToken);
            }
            catch (SecurityTokenException)
            {
                // Token validation failed
                return null;
            }
        }
    }

}
