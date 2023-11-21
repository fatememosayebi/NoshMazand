using NoshMazandaran.Entities;
using System.ComponentModel.DataAnnotations;

namespace NoshMAzandaran.Api.Models
{
    public class UserDto: IValidatableObject
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public GenderType Gender { get; set; }


        /// <summary>
        /// dar in ghesmat validate haye buisinessiye prj anjam mishe
        /// </summary>

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (UserName.Equals("test", StringComparison.OrdinalIgnoreCase))
                yield return new ValidationResult("نام کاربری نمیتواند تست باشد");
        }
    }
}
