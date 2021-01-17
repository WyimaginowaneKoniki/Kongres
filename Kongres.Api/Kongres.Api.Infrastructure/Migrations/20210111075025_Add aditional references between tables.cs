using Microsoft.EntityFrameworkCore.Migrations;

namespace Kongres.Api.Infrastructure.Migrations
{
    public partial class Addaditionalreferencesbetweentables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answers_Reviews_ReviewId",
                table: "Answers");

            migrationBuilder.DropIndex(
                name: "IX_Answers_ReviewId",
                table: "Answers");

            migrationBuilder.DropColumn(
                name: "ReviewId",
                table: "Answers");

            migrationBuilder.AddColumn<uint>(
                name: "AnswerId",
                table: "Reviews",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_AnswerId",
                table: "Reviews",
                column: "AnswerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Answers_AnswerId",
                table: "Reviews",
                column: "AnswerId",
                principalTable: "Answers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Answers_AnswerId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_AnswerId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "AnswerId",
                table: "Reviews");

            migrationBuilder.AddColumn<uint>(
                name: "ReviewId",
                table: "Answers",
                type: "int unsigned",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Answers_ReviewId",
                table: "Answers",
                column: "ReviewId");

            migrationBuilder.AddForeignKey(
                name: "FK_Answers_Reviews_ReviewId",
                table: "Answers",
                column: "ReviewId",
                principalTable: "Reviews",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
