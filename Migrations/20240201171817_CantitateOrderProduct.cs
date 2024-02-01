using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Test_Asp.NET.Migrations
{
    /// <inheritdoc />
    public partial class CantitateOrderProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Cantitate",
                table: "OrderProducts",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cantitate",
                table: "OrderProducts");
        }
    }
}
