using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BETarjetaCredito.Models
{
    public class TarjetaCredito
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string CardHolder { get; set; }
        [Required]
        public string CCN { get; set; }
        [Required]
        public string Expire { get; set; }
        [Required]
        public string CVV {get;set;}

    }
}
