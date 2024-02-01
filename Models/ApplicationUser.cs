using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

public class ApplicationUser : IdentityUser
{
    [Required]
    public string Nume { get; set; }
    [Required]
    public string Prenume { get; set; }
}