using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int IdClient { get; set; }
        public virtual List<OrderProduct> OrderProducts { get; set; } = new List<OrderProduct>();
}