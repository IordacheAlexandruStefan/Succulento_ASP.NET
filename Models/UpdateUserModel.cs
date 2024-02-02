using System.ComponentModel.DataAnnotations;

namespace Test_Asp.NET.Models // Ensure this namespace is correct for your project
{
    public class UpdateUserModel
    {
        [Required]
        public string Nume { get; set; }

        [Required]
        public string Prenume { get; set; }

        [EmailAddress]
        public string Email { get; set; }
    }
}
