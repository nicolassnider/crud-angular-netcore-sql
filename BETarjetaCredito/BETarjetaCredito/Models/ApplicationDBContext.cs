using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BETarjetaCredito.Models
{
    public class ApplicationDBContext: DbContext
    {
        public DbSet<TarjetaCredito> TarjetaCredito { get; set; }

        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {

        }
    }
}
