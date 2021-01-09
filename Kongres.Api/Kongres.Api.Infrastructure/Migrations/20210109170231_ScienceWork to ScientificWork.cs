using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Kongres.Api.Infrastructure.Migrations
{
    public partial class ScienceWorktoScientificWork : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReviewersScienceWorks_ScienceWorks_ScienceWorkId",
                table: "ReviewersScienceWorks");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_ScienceWorkFiles_VersionOfScienceWorkId",
                table: "Reviews");

            migrationBuilder.DropTable(
                name: "ScienceWorkFiles");

            migrationBuilder.DropTable(
                name: "ScienceWorks");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_VersionOfScienceWorkId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_ReviewersScienceWorks_ScienceWorkId",
                table: "ReviewersScienceWorks");

            migrationBuilder.DropColumn(
                name: "VersionOfScienceWorkId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "ScienceWorkId",
                table: "ReviewersScienceWorks");

            migrationBuilder.AddColumn<uint>(
                name: "VersionOfScientificWorkId",
                table: "Reviews",
                nullable: true);

            migrationBuilder.AddColumn<uint>(
                name: "ScientificWorkId",
                table: "ReviewersScienceWorks",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ScientificWorks",
                columns: table => new
                {
                    Id = table.Column<uint>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    MainAuthorId = table.Column<uint>(nullable: true),
                    OtherAuthors = table.Column<string>(nullable: true),
                    CreationDate = table.Column<DateTime>(nullable: false),
                    Status = table.Column<byte>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScientificWorks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ScientificWorks_Users_MainAuthorId",
                        column: x => x.MainAuthorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ScientificWorkFiles",
                columns: table => new
                {
                    Id = table.Column<uint>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FileName = table.Column<string>(nullable: true),
                    Version = table.Column<byte>(nullable: false),
                    DateAdd = table.Column<DateTime>(nullable: false),
                    ScientificWorkId = table.Column<uint>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScientificWorkFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ScientificWorkFiles_ScientificWorks_ScientificWorkId",
                        column: x => x.ScientificWorkId,
                        principalTable: "ScientificWorks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_VersionOfScientificWorkId",
                table: "Reviews",
                column: "VersionOfScientificWorkId");

            migrationBuilder.CreateIndex(
                name: "IX_ReviewersScienceWorks_ScientificWorkId",
                table: "ReviewersScienceWorks",
                column: "ScientificWorkId");

            migrationBuilder.CreateIndex(
                name: "IX_ScientificWorkFiles_ScientificWorkId",
                table: "ScientificWorkFiles",
                column: "ScientificWorkId");

            migrationBuilder.CreateIndex(
                name: "IX_ScientificWorks_MainAuthorId",
                table: "ScientificWorks",
                column: "MainAuthorId");

            migrationBuilder.AddForeignKey(
                name: "FK_ReviewersScienceWorks_ScientificWorks_ScientificWorkId",
                table: "ReviewersScienceWorks",
                column: "ScientificWorkId",
                principalTable: "ScientificWorks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_ScientificWorkFiles_VersionOfScientificWorkId",
                table: "Reviews",
                column: "VersionOfScientificWorkId",
                principalTable: "ScientificWorkFiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReviewersScienceWorks_ScientificWorks_ScientificWorkId",
                table: "ReviewersScienceWorks");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_ScientificWorkFiles_VersionOfScientificWorkId",
                table: "Reviews");

            migrationBuilder.DropTable(
                name: "ScientificWorkFiles");

            migrationBuilder.DropTable(
                name: "ScientificWorks");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_VersionOfScientificWorkId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_ReviewersScienceWorks_ScientificWorkId",
                table: "ReviewersScienceWorks");

            migrationBuilder.DropColumn(
                name: "VersionOfScientificWorkId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "ScientificWorkId",
                table: "ReviewersScienceWorks");

            migrationBuilder.AddColumn<uint>(
                name: "VersionOfScienceWorkId",
                table: "Reviews",
                type: "int unsigned",
                nullable: true);

            migrationBuilder.AddColumn<uint>(
                name: "ScienceWorkId",
                table: "ReviewersScienceWorks",
                type: "int unsigned",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ScienceWorks",
                columns: table => new
                {
                    Id = table.Column<uint>(type: "int unsigned", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CreationDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Description = table.Column<string>(type: "longtext CHARACTER SET utf8mb4", nullable: true),
                    MainAuthorId = table.Column<uint>(type: "int unsigned", nullable: true),
                    Name = table.Column<string>(type: "longtext CHARACTER SET utf8mb4", nullable: true),
                    OtherAuthors = table.Column<string>(type: "longtext CHARACTER SET utf8mb4", nullable: true),
                    Status = table.Column<byte>(type: "tinyint unsigned", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScienceWorks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ScienceWorks_Users_MainAuthorId",
                        column: x => x.MainAuthorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ScienceWorkFiles",
                columns: table => new
                {
                    Id = table.Column<uint>(type: "int unsigned", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    DateAdd = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    FileName = table.Column<string>(type: "longtext CHARACTER SET utf8mb4", nullable: true),
                    ScienceWorkId = table.Column<uint>(type: "int unsigned", nullable: true),
                    Version = table.Column<byte>(type: "tinyint unsigned", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScienceWorkFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ScienceWorkFiles_ScienceWorks_ScienceWorkId",
                        column: x => x.ScienceWorkId,
                        principalTable: "ScienceWorks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_VersionOfScienceWorkId",
                table: "Reviews",
                column: "VersionOfScienceWorkId");

            migrationBuilder.CreateIndex(
                name: "IX_ReviewersScienceWorks_ScienceWorkId",
                table: "ReviewersScienceWorks",
                column: "ScienceWorkId");

            migrationBuilder.CreateIndex(
                name: "IX_ScienceWorkFiles_ScienceWorkId",
                table: "ScienceWorkFiles",
                column: "ScienceWorkId");

            migrationBuilder.CreateIndex(
                name: "IX_ScienceWorks_MainAuthorId",
                table: "ScienceWorks",
                column: "MainAuthorId");

            migrationBuilder.AddForeignKey(
                name: "FK_ReviewersScienceWorks_ScienceWorks_ScienceWorkId",
                table: "ReviewersScienceWorks",
                column: "ScienceWorkId",
                principalTable: "ScienceWorks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_ScienceWorkFiles_VersionOfScienceWorkId",
                table: "Reviews",
                column: "VersionOfScienceWorkId",
                principalTable: "ScienceWorkFiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
