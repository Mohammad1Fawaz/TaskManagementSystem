using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TaskManagementSystem.Server.Migrations
{
    /// <inheritdoc />
    public partial class RefreshTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Permissions",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Key = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Value = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    createdAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    updatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permissions", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ClientId = table.Column<int>(type: "int", nullable: true),

                    UserName = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NormalizedUserName = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NormalizedEmail = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EmailConfirmed = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    PasswordHash = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SecurityStamp = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ConcurrencyStamp = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumber = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumberConfirmed = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false),
                    createdAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    updatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Users_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "countries",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    phoneCode = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    flagSvg = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    countryCode = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    timeZone = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_countries", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),

                    Name = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NormalizedName = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ConcurrencyStamp = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    createdAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    updatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Roles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "UserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ClaimType = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ClaimValue = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserClaims_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "UserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProviderKey = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProviderDisplayName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_UserLogins_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "UserTokens",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    LoginProvider = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Value = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_UserTokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "UserVerificationCodes",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    VerificationCode = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    id = table.Column<int>(type: "int", nullable: false),
                    createdAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    updatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserVerificationCodes", x => new { x.UserId, x.VerificationCode });
                    table.ForeignKey(
                        name: "FK_UserVerificationCodes_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "RoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    ClaimType = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ClaimValue = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RoleClaims_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    RoleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_UserRoles_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRoles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "countries",
                columns: new[] { "id", "countryCode", "flagSvg", "name", "phoneCode", "timeZone" },
                values: new object[,]
                {
                    { 100, "LY", "https://flagcdn.com/ly.svg", "Libya", "+434", "UTC+01:00" },
                    { 101, "KR", "https://flagcdn.com/kr.svg", "South Korea", "+410", "UTC+09:00" },
                    { 102, "LI", "https://flagcdn.com/li.svg", "Liechtenstein", "+438", "UTC+01:00" },
                    { 103, "NI", "https://flagcdn.com/ni.svg", "Nicaragua", "+558", "UTC-06:00" },
                    { 104, "EC", "https://flagcdn.com/ec.svg", "Ecuador", "+218", "UTC-06:00" },
                    { 105, "MV", "https://flagcdn.com/mv.svg", "Maldives", "+462", "UTC+05:00" },
                    { 106, "DZ", "https://flagcdn.com/dz.svg", "Algeria", "+012", "UTC+01:00" },
                    { 107, "KG", "https://flagcdn.com/kg.svg", "Kyrgyzstan", "+417", "UTC+06:00" },
                    { 108, "FI", "https://flagcdn.com/fi.svg", "Finland", "+246", "UTC+02:00" },
                    { 109, "AQ", "https://flagcdn.com/aq.svg", "Antarctica", "+010", "UTC-03:00" },
                    { 110, "KE", "https://flagcdn.com/ke.svg", "Kenya", "+404", "UTC+03:00" },
                    { 111, "CU", "https://flagcdn.com/cu.svg", "Cuba", "+192", "UTC-05:00" },
                    { 112, "MS", "https://flagcdn.com/ms.svg", "Montserrat", "+500", "UTC-04:00" },
                    { 113, "PL", "https://flagcdn.com/pl.svg", "Poland", "+616", "UTC+01:00" },
                    { 114, "AX", "https://flagcdn.com/ax.svg", "Åland Islands", "+248", "UTC+02:00" },
                    { 115, "ET", "https://flagcdn.com/et.svg", "Ethiopia", "+231", "UTC+03:00" },
                    { 116, "TG", "https://flagcdn.com/tg.svg", "Togo", "+768", "UTC" },
                    { 117, "BA", "https://flagcdn.com/ba.svg", "Bosnia and Herzegovina", "+070", "UTC+01:00" },
                    { 118, "UY", "https://flagcdn.com/uy.svg", "Uruguay", "+858", "UTC-03:00" },
                    { 119, "GU", "https://flagcdn.com/gu.svg", "Guam", "+316", "UTC+10:00" },
                    { 120, "CV", "https://flagcdn.com/cv.svg", "Cape Verde", "+132", "UTC-01:00" },
                    { 121, "TD", "https://flagcdn.com/td.svg", "Chad", "+148", "UTC+01:00" },
                    { 122, "VA", "https://flagcdn.com/va.svg", "Vatican City", "+336", "UTC+01:00" },
                    { 123, "PW", "https://flagcdn.com/pw.svg", "Palau", "+585", "UTC+09:00" },
                    { 124, "HT", "https://flagcdn.com/ht.svg", "Haiti", "+332", "UTC-05:00" },
                    { 125, "YE", "https://flagcdn.com/ye.svg", "Yemen", "+887", "UTC+03:00" },
                    { 126, "SZ", "https://flagcdn.com/sz.svg", "Eswatini", "+748", "UTC+02:00" },
                    { 127, "ZW", "https://flagcdn.com/zw.svg", "Zimbabwe", "+716", "UTC+02:00" },
                    { 128, "GR", "https://flagcdn.com/gr.svg", "Greece", "+300", "UTC+02:00" },
                    { 130, "MF", "https://flagcdn.com/mf.svg", "Saint Martin", "+663", "UTC-04:00" },
                    { 131, "AG", "https://flagcdn.com/ag.svg", "Antigua and Barbuda", "+028", "UTC-04:00" },
                    { 132, "CY", "https://flagcdn.com/cy.svg", "Cyprus", "+196", "UTC+02:00" },
                    { 133, "SX", "https://flagcdn.com/sx.svg", "Sint Maarten", "+534", "UTC-04:00" },
                    { 134, "MC", "https://flagcdn.com/mc.svg", "Monaco", "+492", "UTC+01:00" },
                    { 135, "FJ", "https://flagcdn.com/fj.svg", "Fiji", "+242", "UTC+12:00" },
                    { 136, "UA", "https://flagcdn.com/ua.svg", "Ukraine", "+804", "UTC+02:00" },
                    { 137, "MQ", "https://flagcdn.com/mq.svg", "Martinique", "+474", "UTC-04:00" },
                    { 138, "HK", "https://flagcdn.com/hk.svg", "Hong Kong", "+344", "UTC+08:00" },
                    { 139, "PT", "https://flagcdn.com/pt.svg", "Portugal", "+620", "UTC-01:00" },
                    { 140, "BT", "https://flagcdn.com/bt.svg", "Bhutan", "+064", "UTC+06:00" },
                    { 141, "NP", "https://flagcdn.com/np.svg", "Nepal", "+524", "UTC+05:45" },
                    { 142, "FR", "https://flagcdn.com/fr.svg", "France", "+250", "UTC-10:00" },
                    { 143, "IE", "https://flagcdn.com/ie.svg", "Ireland", "+372", "UTC" },
                    { 144, "AE", "https://flagcdn.com/ae.svg", "United Arab Emirates", "+784", "UTC+04:00" },
                    { 145, "GG", "https://flagcdn.com/gg.svg", "Guernsey", "+831", "UTC+00:00" },
                    { 146, "LC", "https://flagcdn.com/lc.svg", "Saint Lucia", "+662", "UTC-04:00" },
                    { 147, "DO", "https://flagcdn.com/do.svg", "Dominican Republic", "+214", "UTC-04:00" },
                    { 148, "RS", "https://flagcdn.com/rs.svg", "Serbia", "+688", "UTC+01:00" },
                    { 149, "BW", "https://flagcdn.com/bw.svg", "Botswana", "+072", "UTC+02:00" },
                    { 150, "CI", "https://flagcdn.com/ci.svg", "Ivory Coast", "+384", "UTC" },
                    { 151, "GH", "https://flagcdn.com/gh.svg", "Ghana", "+288", "UTC" },
                    { 152, "KM", "https://flagcdn.com/km.svg", "Comoros", "+174", "UTC+03:00" },
                    { 153, "AZ", "https://flagcdn.com/az.svg", "Azerbaijan", "+031", "UTC+04:00" },
                    { 154, "GB", "https://flagcdn.com/gb.svg", "United Kingdom", "+826", "UTC-08:00" },
                    { 155, "CF", "https://flagcdn.com/cf.svg", "Central African Republic", "+140", "UTC+01:00" },
                    { 156, "PS", "https://flagcdn.com/ps.svg", "Palestine", "+275", "UTC+02:00" },
                    { 157, "BQ", "https://flagcdn.com/bq.svg", "Caribbean Netherlands", "+535", "UTC-04:00" },
                    { 158, "TW", "https://flagcdn.com/tw.svg", "Taiwan", "+158", "UTC+08:00" },
                    { 159, "KI", "https://flagcdn.com/ki.svg", "Kiribati", "+296", "UTC+12:00" },
                    { 160, "VE", "https://flagcdn.com/ve.svg", "Venezuela", "+862", "UTC-04:00" },
                    { 161, "BF", "https://flagcdn.com/bf.svg", "Burkina Faso", "+854", "UTC" },
                    { 162, "BJ", "https://flagcdn.com/bj.svg", "Benin", "+204", "UTC+01:00" },
                    { 163, "EH", "https://flagcdn.com/eh.svg", "Western Sahara", "+732", "UTC" },
                    { 164, "FI", "https://flagcdn.com/fi.svg", "Finland", "+246", "UTC+02:00" },
                    { 165, "GI", "https://flagcdn.com/gi.svg", "Gibraltar", "+292", "UTC+01:00" },
                    { 166, "ML", "https://flagcdn.com/ml.svg", "Mali", "+466", "UTC" },
                    { 167, "AR", "https://flagcdn.com/ar.svg", "Argentina", "+032", "UTC-03:00" },
                    { 168, "SC", "https://flagcdn.com/sc.svg", "Seychelles", "+690", "UTC+04:00" },
                    { 169, "MD", "https://flagcdn.com/md.svg", "Moldova", "+498", "UTC+02:00" },
                    { 170, "NR", "https://flagcdn.com/nr.svg", "Nauru", "+520", "UTC+12:00" },
                    { 171, "IT", "https://flagcdn.com/it.svg", "Italy", "+380", "UTC+01:00" },
                    { 172, "VU", "https://flagcdn.com/vu.svg", "Vanuatu", "+548", "UTC+11:00" },
                    { 173, "PW", "https://flagcdn.com/pw.svg", "Palau", "+585", "UTC+09:00" },
                    { 174, "UZ", "https://flagcdn.com/uz.svg", "Uzbekistan", "+860", "UTC+05:00" },
                    { 175, "CG", "https://flagcdn.com/cg.svg", "Congo", "+178", "UTC+01:00" },
                    { 176, "TC", "https://flagcdn.com/tc.svg", "Turks and Caicos Islands", "+796", "UTC-04:00" },
                    { 177, "CL", "https://flagcdn.com/cl.svg", "Chile", "+152", "UTC-03:00" },
                    { 178, "MA", "https://flagcdn.com/ma.svg", "Morocco", "+504", "UTC" },
                    { 179, "CH", "https://flagcdn.com/ch.svg", "Switzerland", "+756", "UTC+01:00" },
                    { 180, "DK", "https://flagcdn.com/dk.svg", "Denmark", "+208", "UTC+01:00" },
                    { 181, "SH", "https://flagcdn.com/sh.svg", "Saint Helena", "+654", "UTC" },
                    { 182, "NI", "https://flagcdn.com/ni.svg", "Nicaragua", "+558", "UTC-06:00" },
                    { 183, "BB", "https://flagcdn.com/bb.svg", "Barbados", "+052", "UTC-04:00" },
                    { 184, "SS", "https://flagcdn.com/ss.svg", "South Sudan", "+728", "UTC+03:00" },
                    { 185, "GL", "https://flagcdn.com/gl.svg", "Greenland", "+304", "UTC-04:00" },
                    { 186, "AW", "https://flagcdn.com/aw.svg", "Aruba", "+533", "UTC-04:00" },
                    { 187, "OM", "https://flagcdn.com/om.svg", "Oman", "+512", "UTC+04:00" },
                    { 188, "ER", "https://flagcdn.com/er.svg", "Eritrea", "+232", "UTC+03:00" },
                    { 189, "XK", "https://flagcdn.com/xk.svg", "Kosovo", "+780", "UTC+01:00" },
                    { 190, "SK", "https://flagcdn.com/sk.svg", "Slovakia", "+703", "UTC+01:00" },
                    { 191, "DZ", "https://flagcdn.com/dz.svg", "Algeria", "+012", "UTC+01:00" },
                    { 192, "PE", "https://flagcdn.com/pe.svg", "Peru", "+604", "UTC-05:00" },
                    { 193, "SR", "https://flagcdn.com/sr.svg", "Suriname", "+740", "UTC-03:00" },
                    { 194, "RO", "https://flagcdn.com/ro.svg", "Romania", "+642", "UTC+02:00" },
                    { 195, "BE", "https://flagcdn.com/be.svg", "Belgium", "+056", "UTC+01:00" },
                    { 196, "SZ", "https://flagcdn.com/sz.svg", "Swaziland", "+748", "UTC+02:00" },
                    { 197, "SY", "https://flagcdn.com/sy.svg", "Syria", "+760", "UTC+02:00" },
                    { 198, "US", "https://flagcdn.com/us.svg", "United States", "+840", "UTC-12:00" },
                    { 199, "TG", "https://flagcdn.com/tg.svg", "Togo", "+768", "UTC" },
                    { 200, "LR", "https://flagcdn.com/lr.svg", "Liberia", "+430", "UTC" },
                    { 201, "BH", "https://flagcdn.com/bh.svg", "Bahrain", "+048", "UTC+03:00" },
                    { 202, "SG", "https://flagcdn.com/sg.svg", "Singapore", "+702", "UTC+08:00" },
                    { 203, "SI", "https://flagcdn.com/si.svg", "Slovenia", "+705", "UTC+01:00" },
                    { 204, "KN", "https://flagcdn.com/kn.svg", "Saint Kitts and Nevis", "+659", "UTC-04:00" },
                    { 205, "BI", "https://flagcdn.com/bi.svg", "Burundi", "+108", "UTC+02:00" },
                    { 206, "PM", "https://flagcdn.com/pm.svg", "Saint Pierre and Miquelon", "+666", "UTC-03:00" },
                    { 207, "MH", "https://flagcdn.com/mh.svg", "Marshall Islands", "+584", "UTC+12:00" },
                    { 208, "TV", "https://flagcdn.com/tv.svg", "Tuvalu", "+798", "UTC+12:00" },
                    { 209, "TZ", "https://flagcdn.com/tz.svg", "Tanzania", "+834", "UTC+03:00" },
                    { 210, "YE", "https://flagcdn.com/ye.svg", "Yemen", "+887", "UTC+03:00" },
                    { 211, "ME", "https://flagcdn.com/me.svg", "Montenegro", "+499", "UTC+01:00" },
                    { 212, "NF", "https://flagcdn.com/nf.svg", "Norfolk Island", "+574", "UTC+11:30" },
                    { 213, "MW", "https://flagcdn.com/mw.svg", "Malawi", "+454", "UTC+02:00" },
                    { 214, "ZW", "https://flagcdn.com/zw.svg", "Zimbabwe", "+716", "UTC+02:00" },
                    { 215, "JO", "https://flagcdn.com/jo.svg", "Jordan", "+400", "UTC+02:00" },
                    { 216, "CA", "https://flagcdn.com/ca.svg", "Canada", "+124", "UTC-08:00" },
                    { 217, "SJ", "https://flagcdn.com/sj.svg", "Svalbard and Jan Mayen", "+744", "UTC+01:00" },
                    { 218, "SB", "https://flagcdn.com/sb.svg", "Solomon Islands", "+090", "UTC+11:00" },
                    { 219, "CK", "https://flagcdn.com/ck.svg", "Cook Islands", "+184", "UTC-10:00" },
                    { 220, "BD", "https://flagcdn.com/bd.svg", "Bangladesh", "+050", "UTC+06:00" },
                    { 221, "ID", "https://flagcdn.com/id.svg", "Indonesia", "+360", "UTC+09:00" },
                    { 222, "FK", "https://flagcdn.com/fk.svg", "Falkland Islands", "+238", "UTC-03:00" },
                    { 223, "DM", "https://flagcdn.com/dm.svg", "Dominica", "+212", "UTC-04:00" },
                    { 224, "MM", "https://flagcdn.com/mm.svg", "Myanmar", "+104", "UTC+06:30" },
                    { 225, "AO", "https://flagcdn.com/ao.svg", "Angola", "+024", "UTC+01:00" },
                    { 226, "TK", "https://flagcdn.com/tk.svg", "Tokelau", "+772", "UTC+14:00" },
                    { 227, "KH", "https://flagcdn.com/kh.svg", "Cambodia", "+116", "UTC+07:00" },
                    { 228, "AU", "https://flagcdn.com/au.svg", "Australia", "+036", "UTC+11:00" },
                    { 229, "BZ", "https://flagcdn.com/bz.svg", "Belize", "+084", "UTC-06:00" },
                    { 230, "MN", "https://flagcdn.com/mn.svg", "Mongolia", "+496", "UTC+08:00" },
                    { 231, "GT", "https://flagcdn.com/gt.svg", "Guatemala", "+320", "UTC-06:00" },
                    { 232, "EG", "https://flagcdn.com/eg.svg", "Egypt", "+818", "UTC+02:00" },
                    { 233, "EC", "https://flagcdn.com/ec.svg", "Ecuador", "+218", "UTC-06:00" },
                    { 234, "BL", "https://flagcdn.com/bl.svg", "Saint Barthélemy", "+652", "UTC-04:00" },
                    { 235, "PN", "https://flagcdn.com/pn.svg", "Pitcairn", "+612", "UTC-08:00" },
                    { 236, "NO", "https://flagcdn.com/no.svg", "Norway", "+578", "UTC+01:00" },
                    { 237, "VC", "https://flagcdn.com/vc.svg", "Saint Vincent and the Grenadines", "+670", "UTC-04:00" },
                    { 238, "NZ", "https://flagcdn.com/nz.svg", "New Zealand", "+554", "UTC+13:00" },
                    { 239, "GA", "https://flagcdn.com/ga.svg", "Gabon", "+266", "UTC+01:00" },
                    { 240, "PG", "https://flagcdn.com/pg.svg", "Papua New Guinea", "+598", "UTC+10:00" },
                    { 241, "CV", "https://flagcdn.com/cv.svg", "Cape Verde", "+132", "UTC-01:00" },
                    { 242, "IN", "https://flagcdn.com/in.svg", "India", "+356", "UTC+05:30" },
                    { 243, "HT", "https://flagcdn.com/ht.svg", "Haiti", "+332", "UTC-05:00" },
                    { 244, "GM", "https://flagcdn.com/gm.svg", "Gambia", "+270", "UTC" },
                    { 245, "AL", "https://flagcdn.com/al.svg", "Albania", "+008", "UTC+01:00" },
                    { 246, "SE", "https://flagcdn.com/se.svg", "Sweden", "+752", "UTC+01:00" },
                    { 247, "CY", "https://flagcdn.com/cy.svg", "Cyprus", "+196", "UTC+02:00" },
                    { 248, "MU", "https://flagcdn.com/mu.svg", "Mauritius", "+480", "UTC+04:00" },
                    { 249, "VN", "https://flagcdn.com/vn.svg", "Vietnam", "+704", "UTC+07:00" },
                    { 250, "MA", "https://flagcdn.com/ma.svg", "Morocco", "+504", "UTC" },
                    { 251, "TJ", "https://flagcdn.com/tj.svg", "Tajikistan", "+762", "UTC+05:00" },
                    { 252, "LB", "https://flagcdn.com/lb.svg", "Lebanon", "+961", "UTC+02:00" },
                    { 253, "BM", "https://flagcdn.com/bm.svg", "Bermuda", "+060", "UTC-04:00" },
                    { 254, "NL", "https://flagcdn.com/nl.svg", "Netherlands", "+528", "UTC+01:00" },
                    { 255, "SA", "https://flagcdn.com/sa.svg", "Saudi Arabia", "+682", "UTC+03:00" },
                    { 256, "DE", "https://flagcdn.com/de.svg", "Germany", "+276", "UTC+01:00" },
                    { 257, "GW", "https://flagcdn.com/gw.svg", "Guinea-Bissau", "+624", "UTC" },
                    { 258, "RU", "https://flagcdn.com/ru.svg", "Russia", "+643", "UTC+03:00" },
                    { 259, "SN", "https://flagcdn.com/sn.svg", "Senegal", "+686", "UTC" },
                    { 260, "MY", "https://flagcdn.com/my.svg", "Malaysia", "+458", "UTC+08:00" },
                    { 261, "IR", "https://flagcdn.com/ir.svg", "Iran", "+364", "UTC+03:30" },
                    { 262, "LK", "https://flagcdn.com/lk.svg", "Sri Lanka", "+144", "UTC+05:30" },
                    { 263, "AI", "https://flagcdn.com/ai.svg", "Anguilla", "+660", "UTC-04:00" },
                    { 264, "IO", "https://flagcdn.com/io.svg", "British Indian Ocean Territory", "+086", "UTC+06:00" },
                    { 265, "RS", "https://flagcdn.com/rs.svg", "Serbia", "+688", "UTC+01:00" },
                    { 266, "LU", "https://flagcdn.com/lu.svg", "Luxembourg", "+442", "UTC+01:00" },
                    { 267, "TR", "https://flagcdn.com/tr.svg", "Turkey", "+792", "UTC+03:00" },
                    { 268, "BY", "https://flagcdn.com/by.svg", "Belarus", "+112", "UTC+03:00" },
                    { 269, "KR", "https://flagcdn.com/kr.svg", "South Korea", "+410", "UTC+09:00" },
                    { 270, "LV", "https://flagcdn.com/lv.svg", "Latvia", "+428", "UTC+02:00" },
                    { 271, "NF", "https://flagcdn.com/nf.svg", "Norfolk Island", "+574", "UTC+11:30" },
                    { 272, "AR", "https://flagcdn.com/ar.svg", "Argentina", "+032", "UTC-03:00" },
                    { 273, "SI", "https://flagcdn.com/si.svg", "Slovenia", "+705", "UTC+01:00" },
                    { 274, "ZM", "https://flagcdn.com/zm.svg", "Zambia", "+894", "UTC+02:00" },
                    { 275, "LY", "https://flagcdn.com/ly.svg", "Libya", "+434", "UTC+02:00" },
                    { 276, "UA", "https://flagcdn.com/ua.svg", "Ukraine", "+804", "UTC+02:00" },
                    { 277, "MD", "https://flagcdn.com/md.svg", "Moldova", "+498", "UTC+02:00" },
                    { 278, "FO", "https://flagcdn.com/fo.svg", "Faroe Islands", "+234", "UTC" },
                    { 279, "FI", "https://flagcdn.com/fi.svg", "Finland", "+246", "UTC+02:00" },
                    { 280, "MZ", "https://flagcdn.com/mz.svg", "Mozambique", "+508", "UTC+02:00" },
                    { 281, "CZ", "https://flagcdn.com/cz.svg", "Czech Republic", "+203", "UTC+01:00" },
                    { 282, "BA", "https://flagcdn.com/ba.svg", "Bosnia and Herzegovina", "+070", "UTC+01:00" },
                    { 283, "GN", "https://flagcdn.com/gn.svg", "Guinea", "+324", "UTC" },
                    { 284, "TH", "https://flagcdn.com/th.svg", "Thailand", "+764", "UTC+07:00" },
                    { 285, "SL", "https://flagcdn.com/sl.svg", "Sierra Leone", "+694", "UTC" },
                    { 286, "MK", "https://flagcdn.com/mk.svg", "Macedonia", "+807", "UTC+01:00" },
                    { 287, "FJ", "https://flagcdn.com/fj.svg", "Fiji", "+242", "UTC+12:00" },
                    { 288, "NG", "https://flagcdn.com/ng.svg", "Nigeria", "+566", "UTC+01:00" },
                    { 289, "FR", "https://flagcdn.com/fr.svg", "France", "+250", "UTC+01:00" },
                    { 290, "PT", "https://flagcdn.com/pt.svg", "Portugal", "+620", "UTC" },
                    { 291, "BG", "https://flagcdn.com/bg.svg", "Bulgaria", "+100", "UTC+02:00" },
                    { 292, "GR", "https://flagcdn.com/gr.svg", "Greece", "+300", "UTC+02:00" },
                    { 293, "ET", "https://flagcdn.com/et.svg", "Ethiopia", "+231", "UTC+03:00" },
                    { 294, "SH", "https://flagcdn.com/sh.svg", "Saint Helena", "+654", "UTC" },
                    { 295, "GP", "https://flagcdn.com/gp.svg", "Guadeloupe", "+312", "UTC-04:00" },
                    { 296, "UG", "https://flagcdn.com/ug.svg", "Uganda", "+800", "UTC+03:00" },
                    { 297, "MS", "https://flagcdn.com/ms.svg", "Montserrat", "+500", "UTC-04:00" },
                    { 298, "NA", "https://flagcdn.com/na.svg", "Namibia", "+516", "UTC+01:00" },
                    { 299, "TM", "https://flagcdn.com/tm.svg", "Turkmenistan", "+795", "UTC+05:00" },
                    { 300, "IS", "https://flagcdn.com/is.svg", "Iceland", "+352", "UTC" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_RoleClaims_RoleId",
                table: "RoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Roles_UserId",
                table: "Roles",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "Roles",
                column: "NormalizedName");

            migrationBuilder.CreateIndex(
                name: "IX_UserClaims_UserId",
                table: "UserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserLogins_UserId",
                table: "UserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_RoleId",
                table: "UserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "Users",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "IX_Users_ClientId",
                table: "Users",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "Users",
                column: "NormalizedUserName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Permissions");

            migrationBuilder.DropTable(
                name: "RoleClaims");

            migrationBuilder.DropTable(
                name: "UserClaims");

            migrationBuilder.DropTable(
                name: "UserLogins");

            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "UserTokens");

            migrationBuilder.DropTable(
                name: "UserVerificationCodes");

            migrationBuilder.DropTable(
                name: "countries");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
