using Microsoft.EntityFrameworkCore.Migrations;

namespace G4L.UserManagement.DA.Migrations
{
    public partial class addedGoalGolComment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GoalComment_Goals_GoalId",
                table: "GoalComment");

            migrationBuilder.DropColumn(
                name: "GoalStatus",
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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<int>(
                name: "GoalStatus",
                table: "GoalComment",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_GoalComment_Goals_GoalId",
                table: "GoalComment",
                column: "GoalId",
                principalTable: "Goals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
