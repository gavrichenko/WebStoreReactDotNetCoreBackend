﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GavrReactDotNetCoreBackend.Models
{
    public class CustomerModel
    {
        public int Id { get; set; }
        public string IdentityId { get; set; }
        public User Identity { get; set; }  // navigation property
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Location { get; set; }
        public int? Phone { get; set; }
        public DateTime? Birthday { get; set; }
        public string Gender { get; set; }
    }
}
