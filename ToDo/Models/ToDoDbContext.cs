using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ToDo.Models
{
    public partial class ToDoDbContext : DbContext
    {
        public ToDoDbContext()
        {
        }

        public ToDoDbContext(DbContextOptions<ToDoDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Activity> Activity { get; set; } = null!;
        public virtual DbSet<User> User { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql("server=localhost;port=3307;user=root;password=123456;database=mobile_comp", Microsoft.EntityFrameworkCore.ServerVersion.Parse("10.11.11-mariadb"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_general_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Activity>(entity =>
            {
                entity.HasIndex(e => e.UserId, "Activity_User_FK");

                entity.Property(e => e.Id).HasColumnType("int(10) unsigned");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .UseCollation("utf8mb4_thai_520_w2");

                entity.Property(e => e.UserId).HasColumnType("int(10) unsigned");

                entity.Property(e => e.WhatTime).HasColumnType("datetime");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Activity)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Activity_User_FK");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id).HasColumnType("int(10) unsigned");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(100)
                    .UseCollation("utf8mb4_thai_520_w2");

                entity.Property(e => e.HashedPassword)
                    .HasMaxLength(44)
                    .IsFixedLength()
                    .UseCollation("utf8mb4_thai_520_w2");

                entity.Property(e => e.LastName)
                    .HasMaxLength(100)
                    .UseCollation("utf8mb4_thai_520_w2");

                entity.Property(e => e.NationalId)
                    .HasMaxLength(13)
                    .IsFixedLength()
                    .UseCollation("utf8mb4_thai_520_w2");

                entity.Property(e => e.Salt)
                    .HasMaxLength(24)
                    .IsFixedLength()
                    .UseCollation("utf8mb4_thai_520_w2");

                entity.Property(e => e.Title)
                    .HasMaxLength(100)
                    .UseCollation("utf8mb4_thai_520_w2");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
