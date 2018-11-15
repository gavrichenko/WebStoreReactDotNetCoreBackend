using Microsoft.EntityFrameworkCore.Migrations;

namespace GavrReactDotNetCoreBackend.Migrations
{
    public partial class OrdersTableTest12 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "IdentityId",
                table: "Orders",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "isLogged",
                table: "Orders",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_IdentityId",
                table: "Orders",
                column: "IdentityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AspNetUsers_IdentityId",
                table: "Orders",
                column: "IdentityId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AspNetUsers_IdentityId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_IdentityId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "IdentityId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "isLogged",
                table: "Orders");
        }
    }
}
