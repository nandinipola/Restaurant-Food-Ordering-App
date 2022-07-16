using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;


namespace BackendAPI.Data
{
    public class DataContext :DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<Orders> Orders => Set<Orders>();

    }
}
