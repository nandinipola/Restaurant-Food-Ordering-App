using BackendAPI.Data;
using BackendAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : Controller
    {
        private readonly DataContext _context;
        
        public OrdersController(DataContext context)
        {
            this._context = context;
        }

        [HttpGet, Authorize]
        public async Task<ActionResult<List<Orders>>> GetAllOrders()
        {
            return Ok(await _context.Orders.ToListAsync());

        }

        [HttpGet("{id}"), Authorize]
        public async Task<ActionResult<List<Orders>>> GetCurrentUserOrders(int id)
        {
            var  userOrders= await _context.Orders.Where(o => o.UserId == id).ToListAsync();
            return Ok(userOrders);
        }

        [HttpPost, Authorize]
        public async Task<ActionResult<List<Orders>>> CreateOrder(Orders order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return Ok(await _context.Orders.ToListAsync());
        }
        [HttpPut, Authorize]
        public async Task<ActionResult<List<Orders>>> UpdateOrder(Orders order)
        {
            var dbOrder = await _context.Orders.FindAsync(order.Id);
            if (dbOrder == null) { return BadRequest("Order Item Not Found"); }

            dbOrder.Status = order.Status;
            dbOrder.Payment = order.Payment;

            await _context.SaveChangesAsync();

            return Ok(await _context.Orders.ToListAsync());
        }
        [HttpDelete("{id}"), Authorize]
        public async Task<ActionResult<List<Orders>>> DeleteOrder(int id)
        {
            var dbOrder = await _context.Orders.FindAsync(id);
            if (dbOrder == null) { return BadRequest("Order item Not Found"); }

            _context.Orders.Remove(dbOrder);
            await _context.SaveChangesAsync();

            return Ok(await _context.Orders.ToListAsync());



        }



    }
}
