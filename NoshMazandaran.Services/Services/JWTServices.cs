 using Common;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using NoshMazandaran.Entities;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace NoshMazandaran.Services
{
    public class JWTServices : IJWTServices
    {
        /// <summary>
        /// baraye daryafte sitesetting ba tavajoh b kari k dar program.cs anjam dadam
        /// </summary>
        private readonly SiteSettings _siteSettings;
        public JWTServices(IOptionsSnapshot<SiteSettings> settings)
        {
            _siteSettings=settings.Value;
        }
        public string Generate(User user)
        {
            var secretKey = Encoding.UTF8.GetBytes(_siteSettings.JwtSettings.SecretKey);
            //key hatman bayad balatar az 16 caracter bashe
            var signingCredentials = new SigningCredentials(new SymmetricSecurityKey(secretKey), SecurityAlgorithms.HmacSha256Signature);

            var encryptionKey = Encoding.UTF8.GetBytes(_siteSettings.JwtSettings.EncryptKey);
            var encryptingCredentials = new EncryptingCredentials(new SymmetricSecurityKey(encryptionKey), SecurityAlgorithms.Aes128KW, SecurityAlgorithms.Aes128CbcHmacSha256);

            var claims = _getClaims(user);
            var descriptor = new SecurityTokenDescriptor
            {
                Issuer = _siteSettings.JwtSettings.Issuer,
                Audience = _siteSettings.JwtSettings.Audience,
                IssuedAt = DateTime.Now,
                NotBefore = DateTime.Now,
                Expires = DateTime.Now.AddHours(_siteSettings.JwtSettings.ExpirationMinutes),
                SigningCredentials = signingCredentials,
                //EncryptingCredentials = encryptingCredentials,
                Subject = new ClaimsIdentity(claims)
            };


            var tokenHnadler = new JwtSecurityTokenHandler();
            var securityToken = tokenHnadler.CreateToken(descriptor);
            var jwt = tokenHnadler.WriteToken(securityToken);

            return jwt;
        }
        private IEnumerable<Claim> _getClaims(User user)
        {
            var securityStampClaimType = new ClaimsIdentityOptions().SecurityStampClaimType;
            var list = new List<Claim>
            {
                new Claim(ClaimTypes.Name,user.UserName),
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                new Claim(securityStampClaimType,user.SecurityStamp.ToString())
            };
            return list;
        }
    }
}
