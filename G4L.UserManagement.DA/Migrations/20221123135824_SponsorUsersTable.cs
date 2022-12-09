using Microsoft.EntityFrameworkCore.Migrations;

namespace G4L.UserManagement.DA.Migrations
{
    public partial class SponsorUsersTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SponsoredUser_Sponsors_SponsorId",
                table: "SponsoredUser");

            migrationBuilder.DropForeignKey(
                name: "FK_SponsoredUser_Users_UserId",
                table: "SponsoredUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SponsoredUser",
                table: "SponsoredUser");

            migrationBuilder.RenameTable(
                name: "SponsoredUser",
                newName: "SponsoredUsers");

            migrationBuilder.RenameIndex(
                name: "IX_SponsoredUser_UserId",
                table: "SponsoredUsers",
                newName: "IX_SponsoredUsers_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SponsoredUsers",
                table: "SponsoredUsers",
                columns: new[] { "SponsorId", "UserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_SponsoredUsers_Sponsors_SponsorId",
                table: "SponsoredUsers",
                column: "SponsorId",
                principalTable: "Sponsors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SponsoredUsers_Users_UserId",
                table: "SponsoredUsers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SponsoredUsers_Sponsors_SponsorId",
                table: "SponsoredUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_SponsoredUsers_Users_UserId",
                table: "SponsoredUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SponsoredUsers",
                table: "SponsoredUsers");

            migrationBuilder.RenameTable(
                name: "SponsoredUsers",
                newName: "SponsoredUser");

            migrationBuilder.RenameIndex(
                name: "IX_SponsoredUsers_UserId",
                table: "SponsoredUser",
                newName: "IX_SponsoredUser_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SponsoredUser",
                table: "SponsoredUser",
                columns: new[] { "SponsorId", "UserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_SponsoredUser_Sponsors_SponsorId",
                table: "SponsoredUser",
                column: "SponsorId",
                principalTable: "Sponsors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SponsoredUser_Users_UserId",
                table: "SponsoredUser",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
