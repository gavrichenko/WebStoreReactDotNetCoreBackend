using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace GavrReactDotNetCoreBackend.Models
{
    public class OrderModel
    {
        public int Id { get; set; }

        [System.ComponentModel.DefaultValue(typeof(DateTime), "")]
        public DateTime? PurchaseDate { get; set; }

        public string Customer { get; set; }
        public string Phone { get; set; }
        public string AdditionalInfo { get; set; }
        public ICollection<OrderItemModel> Items { get; set; }




        //public ProductModel Product { get; set; }  // navigation property to product 1:1

        //public int Id { get; set; }
        //public string Customer { get; set; }
        //public int Quantity { get; set; }

        //public ICollection<ProductModel> Products { get; set; } // navigation property to product 1:M

        //public ICollection<ProductModel> Products { get; set; } // navigation property to product 1:M

    }
}
