using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GavrReactDotNetCoreBackend.Migrations
{
    public partial class OrdersTableInitial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IdentityId = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Phone = table.Column<int>(nullable: false),
                    AdditionalInfo = table.Column<string>(nullable: true),
                    PurchaseDate = table.Column<DateTime>(nullable: true),
                    Quantity = table.Column<int>(nullable: false),
                    ProductId = table.Column<string>(nullable: true),
                    ProductId1 = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_AspNetUsers_IdentityId",
                        column: x => x.IdentityId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Orders_Products_ProductId1",
                        column: x => x.ProductId1,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_IdentityId",
                table: "Orders",
                column: "IdentityId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_ProductId1",
                table: "Orders",
                column: "ProductId1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Orders");
        }
    }
}
