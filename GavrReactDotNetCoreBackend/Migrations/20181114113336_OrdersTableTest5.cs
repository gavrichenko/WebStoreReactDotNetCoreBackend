using Microsoft.EntityFrameworkCore.Migrations;

namespace GavrReactDotNetCoreBackend.Migrations
{
    public partial class OrdersTableTest5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Orders_OrderModelId",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "OrderModelId",
                table: "Products",
                newName: "OrderId");

            migrationBuilder.RenameIndex(
                name: "IX_Products_OrderModelId",
                table: "Products",
                newName: "IX_Products_OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Orders_OrderId",
                table: "Products",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Orders_OrderId",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "OrderId",
                table: "Products",
                newName: "OrderModelId");

            migrationBuilder.RenameIndex(
                name: "IX_Products_OrderId",
                table: "Products",
                newName: "IX_Products_OrderModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Orders_OrderModelId",
                table: "Products",
                column: "OrderModelId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
