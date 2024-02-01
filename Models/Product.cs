using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Product
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public string Nume { get; set; }
    [Required]
    public string Descriere { get; set; }
    [Required]
    public decimal Pret { get; set; }
    [Required]
    public string UrlPoza { get; set; }

}