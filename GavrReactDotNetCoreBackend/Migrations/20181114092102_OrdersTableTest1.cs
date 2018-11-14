using Microsoft.EntityFrameworkCore.Migrations;

namespace GavrReactDotNetCoreBackend.Migrations
{
    public partial class OrdersTableTest1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<string>(
                name: "Phone",
                table: "Orders",
                nullable: true,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Phone",
                table: "Orders",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IdentityId",
                table: "Orders",
                nullable: true);

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
    }
}
