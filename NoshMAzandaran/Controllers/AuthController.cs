using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NoshMazandaran.Data.Reositories;
using NoshMazandaran.Entities;
using NoshMazandaran.Services;
using NoshMazandaran.WebFramework.Filters;
using NoshMAzandaran.Api.Models;

namespace NoshMAzandaran.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiResultFilter]
    [ApiController]
    public class AuthController:ControllerBase
    {
        private readonly UserRepository repository;
        private readonly IJWTServices jwtServices;
        public AuthController(UserRepository repository, IJWTServices jwtServices)
        {
            this.repository = repository;
            this.jwtServices = jwtServices;
        }
        [HttpGet("[action]")]
        [AllowAnonymous]
        public async Task<string> Login(UserDto userDto, CancellationToken cancellationToken)
        {
            var user = await repository.GetByUserAndPass(userDto.UserName, userDto.Password, cancellationToken);
            if (user == null)
                throw new BadHttpRequestException("این کاربر وجود ندارد");
            var jwt = jwtServices.Generate(user);
            return jwt;
        }
    }
}
