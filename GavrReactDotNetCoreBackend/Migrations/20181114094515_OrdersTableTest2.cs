using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GavrReactDotNetCoreBackend.Migrations
{
    public partial class OrdersTableTest2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Products_ProductId1",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_ProductId1",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "AdditionalInfo",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ProductId1",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "PurchaseDate",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "Phone",
                table: "Orders",
                newName: "Customer");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "Orders",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Products_ProductId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_ProductId",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "Customer",
                table: "Orders",
                newName: "Phone");

            migrationBuilder.AlterColumn<string>(
                name: "ProductId",
                table: "Orders",
                nullable: true,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AdditionalInfo",
                table: "Orders",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Orders",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProductId1",
                table: "Orders",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "PurchaseDate",
                table: "Orders",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_ProductId1",
                table: "Orders",
                column: "ProductId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Products_ProductId1",
                table: "Orders",
                column: "ProductId1",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
