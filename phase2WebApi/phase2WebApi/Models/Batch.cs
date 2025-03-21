﻿using System;

namespace phase2WebApi.Models
{
    public class Batch
    {
        public int BatchId { get; set; } // Primary Key
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public int Seats { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public bool IsActive { get; set; }
    }
}