using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoshMazandaran.Entities
{
    public class Session:BaseEntity
    {
        public int id { get; set; }
        public int userRef { get; set; }
        public User user { get; set; }
        public Guid securityStamp { get; set; }
        public DateTime lastLoginDate { get; set; }
        public DateTime lastActionDate { get; set; }
        public bool isActive { get; set; } = true;
        public string ip { get; set; }
    }
}
