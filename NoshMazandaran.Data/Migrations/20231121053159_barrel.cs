using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NoshMazandaran.Data.Migrations
{
    /// <inheritdoc />
    public partial class barrel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Customs");

            migrationBuilder.CreateTable(
                name: "ConcentrateColors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ColorName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConcentrateColors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Barrels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BarrelNo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BachNo = table.Column<int>(type: "int", nullable: false),
                    Weight = table.Column<int>(type: "int", nullable: false),
                    Brix = table.Column<double>(type: "float", nullable: false),
                    Acidity = table.Column<double>(type: "float", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ConcentrateType = table.Column<int>(type: "int", nullable: false),
                    PackType = table.Column<int>(type: "int", nullable: false),
                    ConcentrateStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Color = table.Column<int>(type: "int", nullable: false),
                    ColorRefId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Barrels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Barrels_ConcentrateColors_ColorRefId",
                        column: x => x.ColorRefId,
                        principalTable: "ConcentrateColors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Barrels_ColorRefId",
                table: "Barrels",
                column: "ColorRefId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Barrels");

            migrationBuilder.DropTable(
                name: "ConcentrateColors");

            migrationBuilder.CreateTable(
                name: "Customs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CompanyName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Telephone = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customs", x => x.Id);
                });
        }
    }
}
