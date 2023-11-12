using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoshMazandaran.Entities
{
    public class User:BaseEntity
    {
        /// <summary>
        /// /با این کار در constructor به صورت پیش فرض درست است مگر اینکه جایی غلط کند
        /// </summary>
        public User()
        {
            IsActive = true;
            SecurityStamp = Guid.NewGuid(); 
        }
        /// <summary>
        /// /dataanotation => خصوصیات یک attribute برای entity
        /// 
        /// </summary>
        [MaxLength(100)]
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
        public string FullName { get; set; }
        public GenderType Gender { get; set; }  
        public bool IsActive { get; set; }
        public DateTimeOffset LastLogginDate { get; set; }
        public Guid SecurityStamp { get; set; }

    }
    public enum GenderType
    {
        [Display(Name = "مرد")]
        Male = 1,
        [Display(Name = "زن")]
        Female = 2
    }
}
