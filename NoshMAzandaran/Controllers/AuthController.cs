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
        private readonly IUserRepository repository;
        private readonly IJWTServices jwtServices;
        public AuthController(IUserRepository repository, IJWTServices jwtServices)
        {
            this.repository = repository;
            this.jwtServices = jwtServices;
        }
        [HttpPost("[action]")]
        [AllowAnonymous]
        public async Task<ActionResult> Login(AuthDto authDto, CancellationToken cancellationToken)
        {
            var user = await repository.GetByUserAndPass(authDto.UserName, authDto.Password, cancellationToken);
            if (user == null)
                throw new BadHttpRequestException("این کاربر وجود ندارد");
            var jwt = jwtServices.Generate(user);
            return Ok(new { token = jwt });
        }
    }
}
