using BackendAPI.Data;
using BackendAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authorization;
using UserMicroservice.Repository;

namespace BackendAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;
        private readonly IUserRepository _userRepo;

        public UserController(DataContext context, IConfiguration configuration, IUserRepository userRepo)
        {
            this._context = context;
            this._configuration = configuration;
            this._userRepo= userRepo;
        }
        [HttpPost("register")]
        public async Task<ActionResult<string>> Register(UserDto request)
        {
            await this._userRepo.AddUserAsync(request);
            return Ok("User Created!!");
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserDto1 request)
        {
            List<Users> user = await _context.Users.Where(o => o.Email == request.Email).ToListAsync();
            if (user[0].Email != request.Email)
            {
                return BadRequest("User not found.");
            }

            if (!VerifyPasswordHash(request.Password, user[0].PasswordHash, user[0].PasswordSalt))
            {
                return BadRequest("Wrong password.");
            }

            string token = CreateToken(user[0]);

            return Ok(token);
        }

       [HttpGet("{id}"), Authorize]
        public  async Task<ActionResult<Users>> getCurrentUser(string id)
        {
      
            List<Users> user = await _context.Users.Where(o => o.Email == id).ToListAsync();
         
            var userData = await _userRepo.GetUserByIdAsync(id);
            return Ok(user[0]);

        }

        // Util Methods
        private string CreateToken(Users user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.Role, "Admin")
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }
    }
}
