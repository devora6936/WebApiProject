using System;
using System.Collections.Generic;
using Entities;
using Microsoft.EntityFrameworkCore;

namespace Repositories;

public partial class MarketContext : DbContext
{
    public MarketContext()
    {
    }

    public MarketContext(DbContextOptions<MarketContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderItem> OrderItems { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=srv2\\PUPILS;Initial Catalog=Market;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK_Ctegories");

            entity.Property(e => e.CategoryId).HasColumnName("CATEGORY_ID");
            entity.Property(e => e.CategoryName)
                .HasMaxLength(20)
                .IsFixedLength()
                .HasColumnName("CATEGORY_NAME");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.Property(e => e.OrderId).HasColumnName("ORDER_ID");
            entity.Property(e => e.OrderDate)
                .HasMaxLength(20)
                .IsFixedLength()
                .HasColumnName("ORDER_DATE");
            entity.Property(e => e.OrderSum).HasColumnName("ORDER_SUM");
            entity.Property(e => e.UserId).HasColumnName("USER_ID");

            entity.HasOne(d => d.User).WithMany(p => p.Orders)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_Users_Orders");
        });

        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.ToTable("Order_items");

            entity.Property(e => e.OrderItemId).HasColumnName("ORDER_ITEM_ID");
            entity.Property(e => e.OrderId).HasColumnName("ORDER_ID");
            entity.Property(e => e.ProductId).HasColumnName("PRODUCT_ID");
            entity.Property(e => e.Quantity).HasColumnName("QUANTITY");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK_OrderItems_Orders");

            entity.HasOne(d => d.Product).WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK_OrderItems_Products");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.Property(e => e.ProductId).HasColumnName("PRODUCT_ID");
            entity.Property(e => e.CategoryId).HasColumnName("CATEGORY_ID");
            entity.Property(e => e.Description)
                .HasMaxLength(50)
                .IsFixedLength()
                .HasColumnName("DESCRIPTION");
            entity.Property(e => e.ImageUrl)
                .HasMaxLength(50)
                .IsFixedLength()
                .HasColumnName("IMAGE_URL");
            entity.Property(e => e.Price).HasColumnName("PRICE");
            entity.Property(e => e.ProductName)
                .HasMaxLength(20)
                .IsFixedLength()
                .HasColumnName("PRODUCT_NAME");

            entity.HasOne(d => d.Category).WithMany(p => p.Products)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK_Category_Peoduct");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(e => e.UserId).HasColumnName("USER_ID");
            entity.Property(e => e.Email)
                .HasMaxLength(20)
                .IsFixedLength()
                .HasColumnName("EMAIL");
            entity.Property(e => e.FirstName)
                .HasMaxLength(20)
                .IsFixedLength()
                .HasColumnName("FIRST_NAME");
            entity.Property(e => e.LastName)
                .HasMaxLength(20)
                .IsFixedLength()
                .HasColumnName("LAST_NAME");
            entity.Property(e => e.Message)
                .HasMaxLength(100)
                .IsFixedLength()
                .HasColumnName("MESSAGE");
            entity.Property(e => e.Password)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("PASSWORD");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
