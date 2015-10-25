﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.Enum;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructure.Domain
{
    public class Posts
    {
        [Key]
        public int Id { get; set; }        
        public string PostCode { get; set; }
        public string Title { get; set; }
        public string Detail { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime LastChangeDate { get; set; }
        public decimal Price { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public bool IsBuying { get; set; }
        public Enums.Status Status { get; set; }
        public Region Region { get; set; }
        public int UserId { get; set; }
        public int CategoryDetailId { get; set; }
        [ForeignKey("CategoryDetailId")]
        public CategoryDetail CategoryDetail { get; set; }

    }
}