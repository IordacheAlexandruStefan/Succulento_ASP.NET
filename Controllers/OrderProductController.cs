using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
// Make sure to include your namespace if your models are in a separate namespace
// using YourAppNamespace.Models;

[Route("api/[controller]")]
[ApiController]
public class OrderProductsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public OrderProductsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/OrderProducts
    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<IEnumerable<OrderProduct>>> GetOrderProducts()
    {
        return await _context.OrderProducts.ToListAsync();
    }

    // GET: api/OrderProducts/5
    [HttpGet("{id}")]
    public async Task<ActionResult<OrderProduct>> GetOrderProduct(int id)
    {
        var orderProduct = await _context.OrderProducts.FindAsync(id);
        if (orderProduct == null)
        {
            return NotFound();
        }
        return orderProduct;
    }

    // POST: api/OrderProducts
    [HttpPost]
    public async Task<ActionResult<OrderProduct>> PostOrderProduct(OrderProduct orderProduct)
    {
        _context.OrderProducts.Add(orderProduct);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetOrderProduct", new { id = orderProduct.Id }, orderProduct);
    }

    // PUT: api/OrderProducts/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutOrderProduct(int id, OrderProduct orderProduct)
    {
        if (id != orderProduct.Id)
        {
            return BadRequest();
        }

        _context.Entry(orderProduct).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!OrderProductExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/OrderProducts/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOrderProduct(int id)
    {
        var orderProduct = await _context.OrderProducts.FindAsync(id);
        if (orderProduct == null)
        {
            return NotFound();
        }

        _context.OrderProducts.Remove(orderProduct);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool OrderProductExists(int id)
    {
        return _context.OrderProducts.Any(e => e.Id == id);
    }
}
