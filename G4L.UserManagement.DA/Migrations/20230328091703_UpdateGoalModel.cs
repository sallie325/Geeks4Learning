using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace G4L.UserManagement.DA.Migrations
{
    public partial class UpdateGoalModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isReached",
                table: "Goals");

            migrationBuilder.RenameColumn(
                name: "TimeLimit",
                table: "Goals",
                newName: "TimeLeft");

            migrationBuilder.RenameColumn(
                name: "Summary",
                table: "Goals",
                newName: "GoalTitle");

            migrationBuilder.AddColumn<int>(
                name: "ArchiveCount",
                table: "Goals",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "AttendenceId",
                table: "Goals",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<TimeSpan>(
                name: "Duration",
                table: "Goals",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddColumn<Guid>(
                name: "GoalId",
                table: "Goals",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<int>(
                name: "GoalStatus",
                table: "Goals",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PauseCount",
                table: "Goals",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Goals",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "GoalComment",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    GoalId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CommentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GoalStatus = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoalComment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GoalComment_Goals_GoalId",
                        column: x => x.GoalId,
                        principalTable: "Goals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GoalTask",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TaskId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsCompleted = table.Column<bool>(type: "bit", nullable: false),
                    GoalId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoalTask", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GoalTask_Goals_GoalId",
                        column: x => x.GoalId,
                        principalTable: "Goals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GoalComment_GoalId",
                table: "GoalComment",
                column: "GoalId");

            migrationBuilder.CreateIndex(
                name: "IX_GoalTask_GoalId",
                table: "GoalTask",
                column: "GoalId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GoalComment");

            migrationBuilder.DropTable(
                name: "GoalTask");

            migrationBuilder.DropColumn(
                name: "ArchiveCount",
                table: "Goals");

            migrationBuilder.DropColumn(
                name: "AttendenceId",
                table: "Goals");

            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Goals");

            migrationBuilder.DropColumn(
                name: "GoalId",
                table: "Goals");

            migrationBuilder.DropColumn(
                name: "GoalStatus",
                table: "Goals");

            migrationBuilder.DropColumn(
                name: "PauseCount",
                table: "Goals");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Goals");

            migrationBuilder.RenameColumn(
                name: "TimeLeft",
                table: "Goals",
                newName: "TimeLimit");

            migrationBuilder.RenameColumn(
                name: "GoalTitle",
                table: "Goals",
                newName: "Summary");

            migrationBuilder.AddColumn<bool>(
                name: "isReached",
                table: "Goals",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
