using Microsoft.EntityFrameworkCore.Migrations;

namespace G4L.UserManagement.DA.Migrations
{
    public partial class modifiedGoalComment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GoalComment_Goals_goalId",
                table: "GoalComment");

            migrationBuilder.RenameColumn(
                name: "goalId",
                table: "GoalComment",
                newName: "GoalId");

            migrationBuilder.RenameIndex(
                name: "IX_GoalComment_goalId",
                table: "GoalComment",
                newName: "IX_GoalComment_GoalId");

            migrationBuilder.AddForeignKey(
                name: "FK_GoalComment_Goals_GoalId",
                table: "GoalComment",
                column: "GoalId",
                principalTable: "Goals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GoalComment_Goals_GoalId",
                table: "GoalComment");

            migrationBuilder.RenameColumn(
                name: "GoalId",
                table: "GoalComment",
                newName: "goalId");

            migrationBuilder.RenameIndex(
                name: "IX_GoalComment_GoalId",
                table: "GoalComment",
                newName: "IX_GoalComment_goalId");

            migrationBuilder.AddForeignKey(
                name: "FK_GoalComment_Goals_goalId",
                table: "GoalComment",
                column: "goalId",
                principalTable: "Goals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
