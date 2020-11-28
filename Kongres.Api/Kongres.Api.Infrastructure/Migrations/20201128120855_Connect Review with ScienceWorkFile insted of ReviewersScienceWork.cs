using Microsoft.EntityFrameworkCore.Migrations;

namespace Kongres.Api.Infrastructure.Migrations
{
    public partial class ConnectReviewwithScienceWorkFileinstedofReviewersScienceWork : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_ReviewersScienceWorks_ReviewersScienceWorkId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_ReviewersScienceWorkId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "ReviewersScienceWorkId",
                table: "Reviews");

            migrationBuilder.AddColumn<uint>(
                name: "VersionOfScienceWorkId",
                table: "Reviews",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_VersionOfScienceWorkId",
                table: "Reviews",
                column: "VersionOfScienceWorkId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_ScienceWorkFiles_VersionOfScienceWorkId",
                table: "Reviews",
                column: "VersionOfScienceWorkId",
                principalTable: "ScienceWorkFiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_ScienceWorkFiles_VersionOfScienceWorkId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_VersionOfScienceWorkId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "VersionOfScienceWorkId",
                table: "Reviews");

            migrationBuilder.AddColumn<uint>(
                name: "ReviewersScienceWorkId",
                table: "Reviews",
                type: "int unsigned",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_ReviewersScienceWorkId",
                table: "Reviews",
                column: "ReviewersScienceWorkId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_ReviewersScienceWorks_ReviewersScienceWorkId",
                table: "Reviews",
                column: "ReviewersScienceWorkId",
                principalTable: "ReviewersScienceWorks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
