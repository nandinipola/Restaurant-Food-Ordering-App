namespace BackendAPI.Models
{
    public class Orders
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int ItemId { get; set; }

        public string ItemName { get; set; } = string.Empty;

        public string ImageUrl { get; set; } = string.Empty;

        public double TotalPrice { get; set; }

        public int Qty { get; set; }

        public string Status { get; set; } = string.Empty;

        public string Payment { get; set; } = string.Empty;


    }
}
