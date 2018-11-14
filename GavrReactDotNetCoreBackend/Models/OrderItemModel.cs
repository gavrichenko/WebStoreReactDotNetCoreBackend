using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GavrReactDotNetCoreBackend.Models
{
    public class OrderItemModel
    {
        public int Id { get; set; }
        public ProductModel Product { get; set; } // navigation property to product
        public int Quantity { get; set; }
        public OrderModel Order { get; set; }
    }
}
