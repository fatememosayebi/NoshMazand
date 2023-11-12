using NoshMazandaran.Entities;

namespace NoshMazandaran.Services
{
    public interface IJWTServices
    {
        string Generate(User user);
    }
}