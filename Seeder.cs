using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Linq;

public class DataSeeder
{
    public static void SeedData(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ApplicationDbContext context)
    {
        context.Database.Migrate();

        // Seed Roles
        if (!roleManager.Roles.Any())
        {
            var roles = new List<IdentityRole>
            {
                new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" },
                new IdentityRole { Name = "User", NormalizedName = "USER" }
            };

            foreach (var role in roles)
            {
                roleManager.CreateAsync(role).Wait();
            }
        }

        // Seed Users
        if (!userManager.Users.Any())
        {
            var users = new List<ApplicationUser>
            {
                new ApplicationUser { UserName = "admin", Email = "admin@gmail.com", Nume = "admin", Prenume = "admin" },
                new ApplicationUser { UserName = "user", Email = "user@gmail.com", Nume = "user", Prenume = "user" }
            };

            foreach (var user in users)
            {
                userManager.CreateAsync(user, "Password123!").Wait();
                if (user.UserName == "admin")
                {
                    userManager.AddToRoleAsync(user, "Admin").Wait();
                }
                else
                {
                    userManager.AddToRoleAsync(user, "User").Wait();
                }
            }
        }

        if (!context.Products.Any())
        {
            var products = new List<Product>
            {
                new Product { Id = 5, Nume = "Aloe Vera", Descriere = "Very good for health.", Pret = 10.99M, UrlPoza = "images/succulents/succulent1.jpg" },
                new Product { Id = 6, Nume = "Echeveria Elegans", Descriere = "A rosette-forming succulent known for its stunning symmetrical shape.", Pret = 9.98M, UrlPoza = "images/succulents/succulent2.jpg" },
                new Product { Id = 7, Nume = "Zebra Plant", Descriere = "This succulent is named for its white, stripe-like patterns on its leaves.", Pret = 12.50M, UrlPoza = "images/succulents/succulent3.jpg" },
                new Product { Id = 8, Nume = "Snake Plant", Descriere = "An easy-to-care-for succulent that's perfect for beginners.", Pret = 20.00M, UrlPoza = "images/succulents/succulent4.jpg" },
                new Product { Id = 9, Nume = "Panda Plant", Descriere = "Fuzzy leaves with brownish-red markings make it resemble a panda.", Pret = 8.99M, UrlPoza = "images/succulents/succulent5.jpg" },
                new Product { Id = 10, Nume = "Jade Plant", Descriere = "A popular succulent with fleshy, oval-shaped leaves.", Pret = 11.99M, UrlPoza = "images/succulents/succulent6.jpg" },
                new Product { Id = 11, Nume = "Pincushion Cactus", Descriere = "A small, round cactus with a ball-like appearance.", Pret = 7.99M, UrlPoza = "images/succulents/succulent7.jpg" },
                new Product { Id = 12, Nume = "Bishop's Cap", Descriere = "Star-shaped succulent with a unique pattern of white dots.", Pret = 10.50M, UrlPoza = "images/succulents/succulent8.jpg" },
                new Product { Id = 13, Nume = "Christmas Cactus", Descriere = "A festive succulent that blooms around the holidays.", Pret = 14.00M, UrlPoza = "images/succulents/succulent9.jpg" },
                new Product { Id = 14, Nume = "Burro's Tail", Descriere = "A trailing succulent that's perfect for hanging baskets.", Pret = 16.99M, UrlPoza = "images/succulents/succulent10.jpg" }
            };

            context.Products.AddRange(products);
            context.SaveChanges();
        }

        // Seed Orders
        if (!context.Orders.Any())
        {
            var orders = new List<Order>
            {
                new Order { Id = 1, IdClient = 55111 },
            };

            context.Orders.AddRange(orders);
            context.SaveChanges();
        }

        // Seed OrderProducts
        if (!context.OrderProducts.Any())
        {
            var orderProducts = new List<OrderProduct>
            {
                new OrderProduct { Id = 1, OrderId = 1, ProductId = 5, Cantitate = 1 },
                new OrderProduct { Id = 2, OrderId = 1, ProductId = 7, Cantitate = 1 },
            };

            context.OrderProducts.AddRange(orderProducts);
            context.SaveChanges();
        }
    }
}
