using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Kongres.Api.Infrastructure.Migrations
{
    public partial class RenameScienceWorkInfostoScienceWorkFiles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ScienceWorkInfos");

            migrationBuilder.CreateTable(
                name: "ScienceWorkFiles",
                columns: table => new
                {
                    Id = table.Column<uint>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FileName = table.Column<string>(nullable: true),
                    Version = table.Column<byte>(nullable: false),
                    DateAdd = table.Column<DateTime>(nullable: false),
                    ScienceWorkId = table.Column<uint>(nullable: true)
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
                name: "IX_ScienceWorkFiles_ScienceWorkId",
                table: "ScienceWorkFiles",
                column: "ScienceWorkId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ScienceWorkFiles");

            migrationBuilder.CreateTable(
                name: "ScienceWorkInfos",
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
                    table.PrimaryKey("PK_ScienceWorkInfos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ScienceWorkInfos_ScienceWorks_ScienceWorkId",
                        column: x => x.ScienceWorkId,
                        principalTable: "ScienceWorks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ScienceWorkInfos_ScienceWorkId",
                table: "ScienceWorkInfos",
                column: "ScienceWorkId");
        }
    }
}
