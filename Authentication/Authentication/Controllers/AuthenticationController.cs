﻿using Authentication.Context;
using Authentication.Models;
using Authentication.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Authentication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        AppDbContext _context;
        IConfiguration _configuration;
        public AuthenticationController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        [HttpPost]
        public IActionResult Login(LoginViewModel user)
        {
            IActionResult response = Unauthorized();
            var obj = _context.Users.FirstOrDefault(x => x.Email == user.Email && x.Password == user.Password);
            if (obj != null)
            {
                var tokenString = GenerateJSONWebToken(obj);
                response = Ok(new { token = tokenString });
            }
            return response;

        }


        private string GetRoleName(int roleId)
        {
            string roleName = (from x in _context.Roles
                               where x.RoleId == roleId
                               select x.RoleName).FirstOrDefault();
            return roleName;
        }

        private string GenerateJSONWebToken(User user)
        {
            string role = GetRoleName(user.RoleId);

            List<Claim> claims = new List<Claim> {
                 //new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                 new Claim(JwtRegisteredClaimNames.Sid, user.Id.ToString()),
                 new Claim(JwtRegisteredClaimNames.Name, user.FirstName + " " + user.LastName),
                 new Claim("Role", role.ToString()),
                 new Claim(type:"Date", DateTime.Now.ToString())
            };
            foreach (var temp in _context.Roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, temp.RoleName));
            }


            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
              _configuration["Jwt:Audience"],
              claims,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);




            return new JwtSecurityTokenHandler().WriteToken(token);

        }


        //private string GenerateJSONWebToken(User user)
        //{
        //    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        //    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        //    var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
        //      _configuration["Jwt:Audience"],
        //      null,
        //      expires: DateTime.Now.AddMinutes(120),
        //      signingCredentials: credentials);
        //    return new JwtSecurityTokenHandler().WriteToken(token);

        //}


    }

}