using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace G4L.UserManagement.DA.Migrations
{
    public partial class UpdatedComments_Tasks : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GoalComment_Goals_GoalId",
                table: "GoalComment");

            migrationBuilder.DropForeignKey(
                name: "FK_GoalTask_Goals_GoalId",
                table: "GoalTask");

            migrationBuilder.DropColumn(
                name: "TaskId",
                table: "GoalTask");

            migrationBuilder.DropColumn(
                name: "AttendenceId",
                table: "Goals");

            migrationBuilder.DropColumn(
                name: "CommentId",
                table: "GoalComment");

            migrationBuilder.AlterColumn<Guid>(
                name: "GoalId",
                table: "GoalTask",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "GoalId",
                table: "GoalComment",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_GoalComment_Goals_GoalId",
                table: "GoalComment",
                column: "GoalId",
                principalTable: "Goals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_GoalTask_Goals_GoalId",
                table: "GoalTask",
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

            migrationBuilder.DropForeignKey(
                name: "FK_GoalTask_Goals_GoalId",
                table: "GoalTask");

            migrationBuilder.AlterColumn<Guid>(
                name: "GoalId",
                table: "GoalTask",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "TaskId",
                table: "GoalTask",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "AttendenceId",
                table: "Goals",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<Guid>(
                name: "GoalId",
                table: "GoalComment",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "CommentId",
                table: "GoalComment",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddForeignKey(
                name: "FK_GoalComment_Goals_GoalId",
                table: "GoalComment",
                column: "GoalId",
                principalTable: "Goals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GoalTask_Goals_GoalId",
                table: "GoalTask",
                column: "GoalId",
                principalTable: "Goals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
