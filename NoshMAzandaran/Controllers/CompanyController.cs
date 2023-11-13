using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoshMazandaran.Common.Exceptions;
using NoshMazandaran.Data.Reositories;
using NoshMazandaran.Entities;
using NoshMazandaran.WebFramework.Api;
using NoshMazandaran.WebFramework.Filters;
using NoshMAzandaran.Api.Models;

namespace NoshMAzandaran.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiResultFilter]
    [ApiController]
    public class CompanyController: ControllerBase
    {
        private readonly IRepository<Company> repository;
        public CompanyController(IRepository<Company> repository)
        {
            this.repository = repository;
        }
        [HttpGet("[action]")]
        public async Task<List<Company>> Get()
        {
            var companies = await repository.TableNoTracking.ToListAsync();
            return companies;
        }
        [HttpPost("[action]")]
        public async Task<Company> Create(CompanyDto companyDto, CancellationToken cancellationToken)
        {
            var exists = await repository.TableNoTracking.AnyAsync(p => p.CompanyName == companyDto.CompanyName);
            if (exists)
                throw new BadRequestException("این شرکت قبلا ثبت شده است");
            var company = new Company
            {
                CompanyName = companyDto.CompanyName,
                CompanyTel = companyDto.CompanyTel,
                Address=companyDto.Address
            };
            await repository.AddAsync(company, cancellationToken);
            return company;
        }
        [HttpPut("[action]")]
        public async Task<ApiResult> Update(Company company, int id, CancellationToken cancellationToken)
        {
            var updatecCompany = await repository.GetByIdAsync(cancellationToken, id);

            updatecCompany.CompanyName = company.CompanyName;
            updatecCompany.CompanyTel=company.CompanyTel;
            updatecCompany.Address = company.Address;

            await repository.UpdateAsync(updatecCompany, cancellationToken);
            return Ok();
        }
        [HttpDelete("[action]")]
        public async Task<ApiResult> Delete(int id, CancellationToken cancellationToken)
        {
            var company = await repository.GetByIdAsync(cancellationToken, id);
            await repository.DeleteAsync(company, cancellationToken);
            return Ok();
        }
    }
}
