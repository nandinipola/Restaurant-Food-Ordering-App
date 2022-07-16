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
    public class FoodItemsController : ControllerBase
    {
        private readonly DataContext _context;

        public FoodItemsController(DataContext context)
        {
            this._context = context;
        }

        [HttpGet, Authorize]
        public async Task<ActionResult<List<FoodItems>>> GetFoodItems()
        {

            return Ok(await _context.FoodItems.ToListAsync());

        }
        [HttpGet("{id}"), Authorize]
        public async Task<ActionResult<FoodItems>> getFoodItemDetails(int id)
        {
            var dbFood = await _context.FoodItems.FindAsync(id);

            return Ok(dbFood);
        }

        [HttpPost,Authorize]
        public async Task<ActionResult<List<FoodItems>>> CreateFoodItem(FoodItems fooditem)
        {
            _context.FoodItems.Add(fooditem);
            await _context.SaveChangesAsync();

            return Ok(await _context.FoodItems.ToListAsync());

        }
        [HttpPut, Authorize]
        public async Task<ActionResult<List<FoodItems>>> UpdateFoodItem(FoodItems foodItem)
        {
            var dbFood = await _context.FoodItems.FindAsync(foodItem.Id);
            if (dbFood == null) { return BadRequest("Food Item Not Found"); }

            dbFood.Title = foodItem.Title;
            dbFood.Description = foodItem.Description;
            dbFood.Price = foodItem.Price;
            dbFood.ImageUrl = foodItem.ImageUrl;

            await _context.SaveChangesAsync();

            return Ok(await _context.FoodItems.ToListAsync());
        }
        [HttpDelete("{id}"), Authorize]
        public async Task<ActionResult<List<FoodItems>>> DeleteFoodItem(int id)
        {
            var dbFood = await _context.FoodItems.FindAsync(id);
            if (dbFood == null) { return BadRequest("Food item Not Found"); }

            _context.FoodItems.Remove(dbFood);
            await _context.SaveChangesAsync();

            return Ok(await _context.FoodItems.ToListAsync());



        }

    }

}
