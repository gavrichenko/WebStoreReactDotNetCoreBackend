using Microsoft.EntityFrameworkCore.Migrations;

namespace GavrReactDotNetCoreBackend.Migrations
{
    public partial class OrdersTableTest3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Products_ProductId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_ProductId",
                table: "Orders");

            migrationBuilder.AddColumn<int>(
                name: "OrderModelId",
                table: "Products",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "Orders",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Products_OrderModelId",
                table: "Products",
                column: "OrderModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Orders_OrderModelId",
                table: "Products",
                column: "OrderModelId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Orders_OrderModelId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_OrderModelId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "OrderModelId",
                table: "Products");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "Orders",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateIndex(
                name: "IX_Orders_ProductId",
                table: "Orders",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Products_ProductId",
                table: "Orders",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
