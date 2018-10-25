﻿using System;

namespace GavrReactDotNetCoreBackend.Models
{
    public class ProductModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }     
        public int Rating { get; set; }
    }
}
