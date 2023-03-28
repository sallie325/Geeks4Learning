using Microsoft.EntityFrameworkCore.Migrations;

namespace G4L.UserManagement.DA.Migrations
{
    public partial class updatedMigrationWithGoalModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TimeLeft",
                table: "Goals",
                newName: "TimeRemaining");

            migrationBuilder.RenameColumn(
                name: "PauseCount",
                table: "Goals",
                newName: "PausedCount");

            migrationBuilder.RenameColumn(
                name: "GoalTitle",
                table: "Goals",
                newName: "Title");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Goals",
                newName: "GoalTitle");

            migrationBuilder.RenameColumn(
                name: "TimeRemaining",
                table: "Goals",
                newName: "TimeLeft");

            migrationBuilder.RenameColumn(
                name: "PausedCount",
                table: "Goals",
                newName: "PauseCount");
        }
    }
}
