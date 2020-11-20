using Microsoft.EntityFrameworkCore.Migrations;

namespace Kongres.Api.Infrastructure.Migrations
{
    public partial class AddDescriptionOtherAuthorsintoScienceWorkandchangeRatingtobyte : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ScienceWorks_Users_AuthorId",
                table: "ScienceWorks");

            migrationBuilder.DropIndex(
                name: "IX_ScienceWorks_AuthorId",
                table: "ScienceWorks");

            migrationBuilder.DropColumn(
                name: "AuthorId",
                table: "ScienceWorks");

            migrationBuilder.DropColumn(
                name: "ThesisName",
                table: "ScienceWorks");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "ScienceWorks",
                nullable: true);

            migrationBuilder.AddColumn<uint>(
                name: "MainAuthorId",
                table: "ScienceWorks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "ScienceWorks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OtherAuthors",
                table: "ScienceWorks",
                nullable: true);

            migrationBuilder.AlterColumn<byte>(
                name: "Rating",
                table: "Reviews",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext CHARACTER SET utf8mb4",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ScienceWorks_MainAuthorId",
                table: "ScienceWorks",
                column: "MainAuthorId");

            migrationBuilder.AddForeignKey(
                name: "FK_ScienceWorks_Users_MainAuthorId",
                table: "ScienceWorks",
                column: "MainAuthorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ScienceWorks_Users_MainAuthorId",
                table: "ScienceWorks");

            migrationBuilder.DropIndex(
                name: "IX_ScienceWorks_MainAuthorId",
                table: "ScienceWorks");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "ScienceWorks");

            migrationBuilder.DropColumn(
                name: "MainAuthorId",
                table: "ScienceWorks");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "ScienceWorks");

            migrationBuilder.DropColumn(
                name: "OtherAuthors",
                table: "ScienceWorks");

            migrationBuilder.AddColumn<uint>(
                name: "AuthorId",
                table: "ScienceWorks",
                type: "int unsigned",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ThesisName",
                table: "ScienceWorks",
                type: "longtext CHARACTER SET utf8mb4",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Rating",
                table: "Reviews",
                type: "longtext CHARACTER SET utf8mb4",
                nullable: true,
                oldClrType: typeof(byte));

            migrationBuilder.CreateIndex(
                name: "IX_ScienceWorks_AuthorId",
                table: "ScienceWorks",
                column: "AuthorId");

            migrationBuilder.AddForeignKey(
                name: "FK_ScienceWorks_Users_AuthorId",
                table: "ScienceWorks",
                column: "AuthorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
