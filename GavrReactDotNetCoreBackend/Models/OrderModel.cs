using System;
using System.Collections.Generic;

namespace GavrReactDotNetCoreBackend.Models
{
    public class OrderModel
    {
        public int Id { get; set; }
        public DateTime? PurchaseDate { get; set; }
        public bool isLogged { get; set; }
        public string IdentityId { get; set; }
        public User Identity { get; set; }  // navigation property to existing customer
        public string Customer { get; set; }
        public string Phone { get; set; }
        public string AdditionalInfo { get; set; }
        public ICollection<OrderItemModel> Items { get; set; }
    }
}
