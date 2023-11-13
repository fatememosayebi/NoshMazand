using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoshMazandaran.Entities
{
    public class Company:BaseEntity
    {
        public string CompanyName { get; set; }
        public string CompanyTel { get; set; }
        public string Address { get; set; }
    }
}
