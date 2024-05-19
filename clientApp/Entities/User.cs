using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Entities;

public partial class User
{
    public int UserId { get; set; }
    [EmailAddress]
    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Message { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
