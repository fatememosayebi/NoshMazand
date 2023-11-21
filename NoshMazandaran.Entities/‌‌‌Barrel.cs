using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoshMazandaran.Entities
{
    public class Barrel:BaseEntity
    {
        public string BarrelNo { get; set; }
        public int BachNo { get; set; }
        public int Weight { get; set; }
        public double Brix { get; set; }
        public double Acidity { get; set; }
        public string Description { get; set; }
        public ConcentrateType ConcentrateType { get; set; }
        public PackType PackType { get; set; }
        public string ConcentrateStatus { get; set; }
        public int Color { get; set; }
        public ConcentrateColor ColorRef { get; set; }
    }
    public enum ConcentrateType
    {
        [Display(Name = "پرتقال")]
        Orange = 1,
        [Display(Name = "نارنگی")]
        Tangerine = 2
    }
    public enum PackType
    {
        [Display(Name ="استیک")]
        Asetic=1,
        [Display(Name ="رولی")]
        Rolly=2
    }
    
}
