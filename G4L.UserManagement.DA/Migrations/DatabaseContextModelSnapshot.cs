﻿// <auto-generated />
using System;
using G4L.UserManagement.DA;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace G4L.UserManagement.DA.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.17")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("G4L.UserManagement.BL.Entities.AccessLevel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("ModifiedDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("RoleId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("access")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AccessLevels");
                });

            modelBuilder.Entity("G4L.UserManagement.BL.Entities.Document", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("FileName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FilePath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ModifiedDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Documents");
                });

            modelBuilder.Entity("G4L.UserManagement.BL.Entities.Questionnaire", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("ModifiedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Question_1")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Question_10")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Question_12")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Question_13")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Question_2")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Question_3")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Question_4")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Question_5")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Question_6")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Question_7")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Question_8")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Question_9")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Questionnaires");
                });

            modelBuilder.Entity("G4L.UserManagement.BL.Entities.Role", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("ModifiedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("G4L.UserManagement.BL.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int?>("Career")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("DateOfBirth")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Ethinicity")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Gender")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IdNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Initials")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ModifiedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhysicalAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PostalAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("QuestionnairesId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int?>("Status")
                        .HasColumnType("int");

                    b.Property<string>("Surname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("QuestionnairesId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("G4L.UserManagement.BL.Entities.AccessLevel", b =>
                {
                    b.HasOne("G4L.UserManagement.BL.Entities.Role", null)
                        .WithMany("AccessLevels")
                        .HasForeignKey("RoleId");
                });

            modelBuilder.Entity("G4L.UserManagement.BL.Entities.Document", b =>
                {
                    b.HasOne("G4L.UserManagement.BL.Entities.User", null)
                        .WithMany("Documents")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("G4L.UserManagement.BL.Entities.Role", b =>
                {
                    b.HasOne("G4L.UserManagement.BL.Entities.User", null)
                        .WithMany("Roles")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("G4L.UserManagement.BL.Entities.User", b =>
                {
                    b.HasOne("G4L.UserManagement.BL.Entities.Questionnaire", "Questionnaires")
                        .WithMany()
                        .HasForeignKey("QuestionnairesId");

                    b.Navigation("Questionnaires");
                });

            modelBuilder.Entity("G4L.UserManagement.BL.Entities.Role", b =>
                {
                    b.Navigation("AccessLevels");
                });

            modelBuilder.Entity("G4L.UserManagement.BL.Entities.User", b =>
                {
                    b.Navigation("Documents");

                    b.Navigation("Roles");
                });
#pragma warning restore 612, 618
        }
    }
}
