using Microsoft.EntityFrameworkCore.Migrations;

namespace Kongres.Api.Infrastructure.Migrations
{
    public partial class ChangeScienceWorksversiontobyte : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte>(
                name: "Version",
                table: "ScienceWorkInfos",
                nullable: false,
                oldClrType: typeof(uint),
                oldType: "int unsigned");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<uint>(
                name: "Version",
                table: "ScienceWorkInfos",
                type: "int unsigned",
                nullable: false,
                oldClrType: typeof(byte));
        }
    }
}
