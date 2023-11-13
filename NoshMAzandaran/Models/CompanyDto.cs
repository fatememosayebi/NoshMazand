using System.ComponentModel.DataAnnotations;

namespace NoshMAzandaran.Api.Models
{
    public class CompanyDto: IValidatableObject
    {
        public string CompanyName { get; set; }
        public string CompanyTel { get; set; }
        public string Address { get; set; }
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (CompanyName.Equals("test", StringComparison.OrdinalIgnoreCase))
                yield return new ValidationResult("نام شرکت نمیتواند تست باشد");
        }
    }
}
