using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GavrReactDotNetCoreBackend.Migrations
{
    public partial class OrdersTableTest8 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Orders_OrderId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_OrderId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Orders");

            migrationBuilder.AddColumn<string>(
                name: "AdditionalInfo",
                table: "Orders",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Orders",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "PurchaseDate",
                table: "Orders",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "OrderItemModel",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ProductId = table.Column<string>(nullable: true),
                    ProductId1 = table.Column<int>(nullable: true),
                    Quantity = table.Column<int>(nullable: false),
                    OrderId = table.Column<string>(nullable: true),
                    OrderId1 = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItemModel", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderItemModel_Orders_OrderId1",
                        column: x => x.OrderId1,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OrderItemModel_Products_ProductId1",
                        column: x => x.ProductId1,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderItemModel_OrderId1",
                table: "OrderItemModel",
                column: "OrderId1");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItemModel_ProductId1",
                table: "OrderItemModel",
                column: "ProductId1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderItemModel");

            migrationBuilder.DropColumn(
                name: "AdditionalInfo",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "PurchaseDate",
                table: "Orders");

            migrationBuilder.AddColumn<int>(
                name: "OrderId",
                table: "Products",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "Orders",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Orders",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Products_OrderId",
                table: "Products",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Orders_OrderId",
                table: "Products",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
