
using Common;
using ElmahCore.Mvc;
using ElmahCore.Sql;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using NoshMazandaran.Data;
using NoshMazandaran.Data.Reositories;
using NoshMazandaran.Entities;
using NoshMazandaran.Services;
using NoshMazandaran.WebFramework.Configuration;
using NoshMazandaran.WebFramework.Middlewares;
using System.Text;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped(typeof(IRepository<>),typeof(Repository<>));
builder.Services.AddScoped<IJWTServices, JWTServices>();
builder.Services.AddMvc();
/// <summary>
/// in kar baraye ine k betonim to cunstructor sitesetting ro to har classi khastim begirim
/// </summary>
builder.Services.Configure<SiteSettings>(builder.Configuration.GetSection(nameof(SiteSettings)));
builder.Services.AddElmah<SqlErrorLog>(options =>
{
    options.Path = "/elmah/errors";
    options.ConnectionString=builder.Configuration.GetConnectionString("SqlServer");
});
builder.Services.AddDbContext<Db>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("SqlServer")));

/// <summary>
/// sitesetting dar yek section dar appseting tarif shode
/// </summary>
var _siteSettings = builder.Configuration.GetSection(nameof(SiteSettings)).Get<SiteSettings>();
//var a = new JwtSettings
//{
//    Audience = "myWebAddress",
//    ExpirationMinutes = 60,
//    Issuer = "myWbAddress",
//    NotBeforeMinutes = 0,
//    SecretKey = "1234567891011121314151617181920212223242526"
//};
builder.Services.AddJwtAuthentication(_siteSettings.JwtSettings);
builder.Services.AddMvc(options =>
{
    options.Filters.Add(new AuthorizeFilter());
});
var app = builder.Build();
app.UseCustomExceptionHandler();
// Configure the HTTP request pipeline.

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    ///* soal daram 
    app.UseExceptionHandler();
}
app.UseElmah();
app.UseRouting();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});
//app.UseMiddleware();
app.Run();
