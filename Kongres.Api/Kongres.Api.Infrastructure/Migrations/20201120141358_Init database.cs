using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Kongres.Api.Infrastructure.Migrations
{
    public partial class Initdatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<uint>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Password = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Surname = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Specialization = table.Column<string>(nullable: true),
                    University = table.Column<string>(nullable: true),
                    Degree = table.Column<string>(nullable: true),
                    Photo = table.Column<string>(nullable: true),
                    UserType = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ScienceWorks",
                columns: table => new
                {
                    Id = table.Column<uint>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ThesisName = table.Column<string>(nullable: true),
                    AuthorId = table.Column<uint>(nullable: true),
                    CreationDate = table.Column<DateTime>(nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScienceWorks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ScienceWorks_Users_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ReviewersScienceWorks",
                columns: table => new
                {
                    Id = table.Column<uint>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<uint>(nullable: true),
                    ScienceWorkId = table.Column<uint>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReviewersScienceWorks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReviewersScienceWorks_ScienceWorks_ScienceWorkId",
                        column: x => x.ScienceWorkId,
                        principalTable: "ScienceWorks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ReviewersScienceWorks_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ScienceWorkInfos",
                columns: table => new
                {
                    Id = table.Column<uint>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FileName = table.Column<string>(nullable: true),
                    Version = table.Column<uint>(nullable: false),
                    DateAdd = table.Column<DateTime>(nullable: false),
                    ScienceWorkId = table.Column<uint>(nullable: true)
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

            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    Id = table.Column<uint>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ReviewersScienceWorkId = table.Column<uint>(nullable: true),
                    Comment = table.Column<string>(nullable: true),
                    File = table.Column<string>(nullable: true),
                    DateReview = table.Column<DateTime>(nullable: false),
                    Rating = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reviews_ReviewersScienceWorks_ReviewersScienceWorkId",
                        column: x => x.ReviewersScienceWorkId,
                        principalTable: "ReviewersScienceWorks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Answers",
                columns: table => new
                {
                    Id = table.Column<uint>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<uint>(nullable: true),
                    ReviewId = table.Column<uint>(nullable: true),
                    Comment = table.Column<string>(nullable: true),
                    File = table.Column<string>(nullable: true),
                    AnswerDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Answers_Reviews_ReviewId",
                        column: x => x.ReviewId,
                        principalTable: "Reviews",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Answers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Answers_ReviewId",
                table: "Answers",
                column: "ReviewId");

            migrationBuilder.CreateIndex(
                name: "IX_Answers_UserId",
                table: "Answers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ReviewersScienceWorks_ScienceWorkId",
                table: "ReviewersScienceWorks",
                column: "ScienceWorkId");

            migrationBuilder.CreateIndex(
                name: "IX_ReviewersScienceWorks_UserId",
                table: "ReviewersScienceWorks",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_ReviewersScienceWorkId",
                table: "Reviews",
                column: "ReviewersScienceWorkId");

            migrationBuilder.CreateIndex(
                name: "IX_ScienceWorkInfos_ScienceWorkId",
                table: "ScienceWorkInfos",
                column: "ScienceWorkId");

            migrationBuilder.CreateIndex(
                name: "IX_ScienceWorks_AuthorId",
                table: "ScienceWorks",
                column: "AuthorId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Answers");

            migrationBuilder.DropTable(
                name: "ScienceWorkInfos");

            migrationBuilder.DropTable(
                name: "Reviews");

            migrationBuilder.DropTable(
                name: "ReviewersScienceWorks");

            migrationBuilder.DropTable(
                name: "ScienceWorks");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
