using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskManagementSystem.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddTaskstable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "projectLead",
                table: "Projects",
                newName: "projectLeadId");

            migrationBuilder.RenameIndex(
                name: "IX_Projects_projectLead",
                table: "Projects",
                newName: "IX_Projects_projectLeadId");

            migrationBuilder.AlterColumn<int>(
                name: "id",
                table: "ProjectUsers",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectUsers",
                table: "ProjectUsers",
                columns: new[] { "projectId", "userId" });

            migrationBuilder.CreateTable(
                name: "ProjectGroups",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    projectId = table.Column<int>(type: "int", nullable: false),
                    clientId = table.Column<int>(type: "int", nullable: false),
                    createdAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    updatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectGroups", x => x.id);
                    table.ForeignKey(
                        name: "FK_ProjectGroups_Projects_projectId",
                        column: x => x.projectId,
                        principalTable: "Projects",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectGroups_Users_clientId",
                        column: x => x.clientId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ProjectTasks",
                columns: table => new
                {
                    taskId = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    projectId = table.Column<int>(type: "int", nullable: false),
                    groupId = table.Column<int>(type: "int", nullable: false),
                    taskType = table.Column<int>(type: "int", nullable: false , defaultValue: 0),
                    title = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    dueDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    assigneeId = table.Column<int>(type: "int", nullable: false),
                    reporter = table.Column<int>(type: "int", nullable: false),
                    status = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    priority = table.Column<int>(type: "int", nullable: false),
                    progress = table.Column<int>(type: "int", nullable: false),
                    estimatedTime = table.Column<double>(type: "double", nullable: false),
                    loggedTime = table.Column<double>(type: "double", nullable: false),
                    clientId = table.Column<int>(type: "int", nullable: false),
                    createdAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    updatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectTasks", x => x.taskId);
                    table.ForeignKey(
                        name: "FK_ProjectTasks_ProjectGroups_groupId",
                        column: x => x.groupId,
                        principalTable: "ProjectGroups",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectTasks_Projects_projectId",
                        column: x => x.projectId,
                        principalTable: "Projects",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectTasks_Users_assigneeId",
                        column: x => x.assigneeId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectTasks_Users_clientId",
                        column: x => x.clientId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "TaskAttachments",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    fileName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    filePath = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    uploadedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    taskId = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    projectTasktaskId = table.Column<string>(type: "varchar(100)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    clientId = table.Column<int>(type: "int", nullable: false),
                    createdAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    updatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskAttachments", x => x.id);
                    table.ForeignKey(
                        name: "FK_TaskAttachments_ProjectTasks_projectTasktaskId",
                        column: x => x.projectTasktaskId,
                        principalTable: "ProjectTasks",
                        principalColumn: "taskId");
                    table.ForeignKey(
                        name: "FK_TaskAttachments_Users_clientId",
                        column: x => x.clientId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "TaskComments",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    author = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    postedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    content = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    taskId = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    projectTasktaskId = table.Column<string>(type: "varchar(100)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    clientId = table.Column<int>(type: "int", nullable: false),
                    createdAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    updatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskComments", x => x.id);
                    table.ForeignKey(
                        name: "FK_TaskComments_ProjectTasks_projectTasktaskId",
                        column: x => x.projectTasktaskId,
                        principalTable: "ProjectTasks",
                        principalColumn: "taskId");
                    table.ForeignKey(
                        name: "FK_TaskComments_Users_clientId",
                        column: x => x.clientId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "Users",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "Roles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProjectGroups_clientId",
                table: "ProjectGroups",
                column: "clientId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectGroups_projectId",
                table: "ProjectGroups",
                column: "projectId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTasks_assigneeId",
                table: "ProjectTasks",
                column: "assigneeId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTasks_clientId",
                table: "ProjectTasks",
                column: "clientId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTasks_groupId",
                table: "ProjectTasks",
                column: "groupId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTasks_projectId",
                table: "ProjectTasks",
                column: "projectId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTasks_taskId",
                table: "ProjectTasks",
                column: "taskId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TaskAttachments_clientId",
                table: "TaskAttachments",
                column: "clientId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskAttachments_projectTasktaskId",
                table: "TaskAttachments",
                column: "projectTasktaskId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskComments_author",
                table: "TaskComments",
                column: "author",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TaskComments_clientId",
                table: "TaskComments",
                column: "clientId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskComments_projectTasktaskId",
                table: "TaskComments",
                column: "projectTasktaskId");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Users_projectLeadId",
                table: "Projects",
                column: "projectLeadId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Users_projectLeadId",
                table: "Projects");

            migrationBuilder.DropTable(
                name: "TaskAttachments");

            migrationBuilder.DropTable(
                name: "TaskComments");

            migrationBuilder.DropTable(
                name: "ProjectTasks");

            migrationBuilder.DropTable(
                name: "ProjectGroups");

            migrationBuilder.DropIndex(
                name: "UserNameIndex",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "RoleNameIndex",
                table: "Roles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectUsers",
                table: "ProjectUsers");

            migrationBuilder.RenameColumn(
                name: "projectLeadId",
                table: "Projects",
                newName: "projectLead");

            migrationBuilder.RenameIndex(
                name: "IX_Projects_projectLeadId",
                table: "Projects",
                newName: "IX_Projects_projectLead");

            migrationBuilder.AlterColumn<int>(
                name: "id",
                table: "ProjectUsers",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectUsers",
                table: "ProjectUsers",
                column: "id");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "Users",
                column: "NormalizedUserName");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "Roles",
                column: "NormalizedName");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectUsers_clientId",
                table: "ProjectUsers",
                column: "clientId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectUsers_projectId",
                table: "ProjectUsers",
                column: "projectId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectUsers_Users_clientId",
                table: "ProjectUsers",
                column: "clientId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Users_projectLead",
                table: "Projects",
                column: "projectLead",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
