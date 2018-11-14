using Microsoft.EntityFrameworkCore.Migrations;

namespace GavrReactDotNetCoreBackend.Migrations
{
    public partial class OrdersTableTest9 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItemModel_Orders_OrderId1",
                table: "OrderItemModel");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderItemModel_Products_ProductId1",
                table: "OrderItemModel");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderItemModel",
                table: "OrderItemModel");

            migrationBuilder.RenameTable(
                name: "OrderItemModel",
                newName: "OrderItems");

            migrationBuilder.RenameIndex(
                name: "IX_OrderItemModel_ProductId1",
                table: "OrderItems",
                newName: "IX_OrderItems_ProductId1");

            migrationBuilder.RenameIndex(
                name: "IX_OrderItemModel_OrderId1",
                table: "OrderItems",
                newName: "IX_OrderItems_OrderId1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderItems",
                table: "OrderItems",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Orders_OrderId1",
                table: "OrderItems",
                column: "OrderId1",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Products_ProductId1",
                table: "OrderItems",
                column: "ProductId1",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Orders_OrderId1",
                table: "OrderItems");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Products_ProductId1",
                table: "OrderItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderItems",
                table: "OrderItems");

            migrationBuilder.RenameTable(
                name: "OrderItems",
                newName: "OrderItemModel");

            migrationBuilder.RenameIndex(
                name: "IX_OrderItems_ProductId1",
                table: "OrderItemModel",
                newName: "IX_OrderItemModel_ProductId1");

            migrationBuilder.RenameIndex(
                name: "IX_OrderItems_OrderId1",
                table: "OrderItemModel",
                newName: "IX_OrderItemModel_OrderId1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderItemModel",
                table: "OrderItemModel",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItemModel_Orders_OrderId1",
                table: "OrderItemModel",
                column: "OrderId1",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItemModel_Products_ProductId1",
                table: "OrderItemModel",
                column: "ProductId1",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
