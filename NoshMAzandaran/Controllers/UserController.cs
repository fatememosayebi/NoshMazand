


using Diamond.Common.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoshMazandaran.Common.Exceptions;
using NoshMazandaran.Data.Reositories;
using NoshMazandaran.Entities;
using NoshMazandaran.Services;
using NoshMazandaran.WebFramework.Api;
using NoshMazandaran.WebFramework.Filters;
using NoshMAzandaran.Api.Models;

namespace NoshMAzandaran.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiResultFilter]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IRepository<User> repository;
        private readonly IJWTServices jwtServices;
        public UserController(IRepository<User> repository,IJWTServices jwtServices)
        {
            this.repository = repository;
            this.jwtServices= jwtServices;
        }
        /// <summary>
        /// ba ezafe kardane atribute ApiResultFilter noe khorojie list<user> az noe apiresult mishe 
        /// </summary>
        /// <returns></returns>
        [HttpGet("[action]")]
        [Authorize]
        public async Task<List<User>> Get()
        {
            var users = await repository.TableNoTracking.ToListAsync();
            return users;
        }
        [HttpGet("(id:int)")]
        public async Task<ApiResult<User>> get(int id,CancellationToken cancellationToken)
        {
            var user = await repository.GetByIdAsync(cancellationToken, id);
            if(user == null)
            {
                return NotFound();
            }
            return user;
        }
        [HttpGet("[action]")]
        [AllowAnonymous]
        public async Task<string> Token(int id,CancellationToken cancellationToken)
        {
            var user = await repository.GetByIdAsync(cancellationToken, id);
            if (user == null)
                throw new BadHttpRequestException("این id‌وجود ندارد");
            var jwt = jwtServices.Generate(user);
            return jwt;
        }
        [HttpPost("[action]")]
        public async Task<User> Create(UserDto userDto,CancellationToken cancellationToken)
        {
            var exists = await repository.TableNoTracking.AnyAsync(p => p.UserName == userDto.UserName);
            if (exists)
                throw new BadRequestException("نام کاربری تکراری است");
            var passwordHash = SecurityHelper.GetSha256Hash(userDto.Password);
            var user = new User
            {
                UserName = userDto.UserName, 
               PasswordHash = passwordHash,
               FullName=userDto.FullName,
               Gender = userDto.Gender
            }; 
            await repository.AddAsync(user, cancellationToken);
            return user;
        }
        [HttpPut("[action]")]
        public async Task<ApiResult> Update(User user, int id,CancellationToken cancellationToken)
        {
            var updateUser = await repository.GetByIdAsync(cancellationToken, id);
            updateUser.UserName = user.UserName;
            updateUser.PasswordHash = user.PasswordHash;
            updateUser.Gender = user.Gender;
            updateUser.IsActive = user.IsActive;
            updateUser.LastLogginDate = user.LastLogginDate;
            updateUser.SecurityStamp = Guid.NewGuid();

            await repository.UpdateAsync(updateUser,cancellationToken);
            return Ok();
        }
        [HttpDelete("[action]")]
        public async Task<ApiResult> Delete(int id,CancellationToken cancellationToken)
        {
            var user = await repository.GetByIdAsync(cancellationToken, id);
            await repository.DeleteAsync(user, cancellationToken);
            return Ok();
        }
    }
}
