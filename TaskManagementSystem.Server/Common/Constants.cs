﻿using Microsoft.AspNetCore.Identity;
using System.Data;
using TaskManagementSystem.Server.Models;

namespace TaskManagementSystem.Server.Common
{
    public static class Constants
    {
        public static string _jwtSecret = "$#HJ#@KJ4z32&*#JKHSJKHSJKHJK#*(#JKsad";


        public enum UserType
        {
            ClientAdmin,
            User
        }

        public enum CLaimsValue
        {
            CreateTask,
            ViewTask,
            EditTask,
            DeleteTask,
            AssignTask,
            ChangeTaskStatus,
            CommentOnTask,
            ViewTaskDetails,
            ManageTaskAttachments,
            SetTaskPriority,
            SetTaskDeadline,
            ViewTaskAnalytics,
            ViewAssignedTasks,
            ViewOwnTasks,
            ViewTeamTasks,
            ManageTaskCategories,
            ManageTaskTags,
            ManageTaskProjects,
            ViewTaskHistory,
            ViewTaskComments
        }




        public static List<Country> allCountries = new List<Country>()
        {
            new Country() { id = 100, name = "Libya", phoneCode = "+434", flagSvg = "https://flagcdn.com/ly.svg", countryCode = "LY", timeZone = "UTC+01:00" },
            new Country() { id = 101, name = "South Korea", phoneCode = "+410", flagSvg = "https://flagcdn.com/kr.svg", countryCode = "KR", timeZone = "UTC+09:00" },
            new Country() { id = 102, name = "Liechtenstein", phoneCode = "+438", flagSvg = "https://flagcdn.com/li.svg", countryCode = "LI", timeZone = "UTC+01:00" },
            new Country() { id = 103, name = "Nicaragua", phoneCode = "+558", flagSvg = "https://flagcdn.com/ni.svg", countryCode = "NI", timeZone = "UTC-06:00" },
            new Country() { id = 104, name = "Ecuador", phoneCode = "+218", flagSvg = "https://flagcdn.com/ec.svg", countryCode = "EC", timeZone = "UTC-06:00" },
            new Country() { id = 105, name = "Maldives", phoneCode = "+462", flagSvg = "https://flagcdn.com/mv.svg", countryCode = "MV", timeZone = "UTC+05:00" },
            new Country() { id = 106, name = "Algeria", phoneCode = "+012", flagSvg = "https://flagcdn.com/dz.svg", countryCode = "DZ", timeZone = "UTC+01:00" },
            new Country() { id = 107, name = "Kyrgyzstan", phoneCode = "+417", flagSvg = "https://flagcdn.com/kg.svg", countryCode = "KG", timeZone = "UTC+06:00" },
            new Country() { id = 108, name = "Finland", phoneCode = "+246", flagSvg = "https://flagcdn.com/fi.svg", countryCode = "FI", timeZone = "UTC+02:00" },
            new Country() { id = 109, name = "Antarctica", phoneCode = "+010", flagSvg = "https://flagcdn.com/aq.svg", countryCode = "AQ", timeZone = "UTC-03:00" },
            new Country() { id = 110, name = "Kenya", phoneCode = "+404", flagSvg = "https://flagcdn.com/ke.svg", countryCode = "KE", timeZone = "UTC+03:00" },
            new Country() { id = 111, name = "Cuba", phoneCode = "+192", flagSvg = "https://flagcdn.com/cu.svg", countryCode = "CU", timeZone = "UTC-05:00" },
            new Country() { id = 112, name = "Montserrat", phoneCode = "+500", flagSvg = "https://flagcdn.com/ms.svg", countryCode = "MS", timeZone = "UTC-04:00" },
            new Country() { id = 113, name = "Poland", phoneCode = "+616", flagSvg = "https://flagcdn.com/pl.svg", countryCode = "PL", timeZone = "UTC+01:00" },
            new Country() { id = 114, name = "Åland Islands", phoneCode = "+248", flagSvg = "https://flagcdn.com/ax.svg", countryCode = "AX", timeZone = "UTC+02:00" },
            new Country() { id = 115, name = "Ethiopia", phoneCode = "+231", flagSvg = "https://flagcdn.com/et.svg", countryCode = "ET", timeZone = "UTC+03:00" },
            new Country() { id = 116, name = "Togo", phoneCode = "+768", flagSvg = "https://flagcdn.com/tg.svg", countryCode = "TG", timeZone = "UTC" },
            new Country() { id = 117, name = "Bosnia and Herzegovina", phoneCode = "+070", flagSvg = "https://flagcdn.com/ba.svg", countryCode = "BA", timeZone = "UTC+01:00" },
            new Country() { id = 118, name = "Uruguay", phoneCode = "+858", flagSvg = "https://flagcdn.com/uy.svg", countryCode = "UY", timeZone = "UTC-03:00" },
            new Country() { id = 119, name = "Guam", phoneCode = "+316", flagSvg = "https://flagcdn.com/gu.svg", countryCode = "GU", timeZone = "UTC+10:00" },
            new Country() { id = 120, name = "Cape Verde", phoneCode = "+132", flagSvg = "https://flagcdn.com/cv.svg", countryCode = "CV", timeZone = "UTC-01:00" },
            new Country() { id = 121, name = "Chad", phoneCode = "+148", flagSvg = "https://flagcdn.com/td.svg", countryCode = "TD", timeZone = "UTC+01:00" },
            new Country() { id = 122, name = "Vatican City", phoneCode = "+336", flagSvg = "https://flagcdn.com/va.svg", countryCode = "VA", timeZone = "UTC+01:00" },
            new Country() { id = 123, name = "Palau", phoneCode = "+585", flagSvg = "https://flagcdn.com/pw.svg", countryCode = "PW", timeZone = "UTC+09:00" },
            new Country() { id = 124, name = "Haiti", phoneCode = "+332", flagSvg = "https://flagcdn.com/ht.svg", countryCode = "HT", timeZone = "UTC-05:00" },
            new Country() { id = 125, name = "Yemen", phoneCode = "+887", flagSvg = "https://flagcdn.com/ye.svg", countryCode = "YE", timeZone = "UTC+03:00" },
            new Country() { id = 126, name = "Eswatini", phoneCode = "+748", flagSvg = "https://flagcdn.com/sz.svg", countryCode = "SZ", timeZone = "UTC+02:00" },
            new Country() { id = 127, name = "Zimbabwe", phoneCode = "+716", flagSvg = "https://flagcdn.com/zw.svg", countryCode = "ZW", timeZone = "UTC+02:00" },
            new Country() { id = 128, name = "Greece", phoneCode = "+300", flagSvg = "https://flagcdn.com/gr.svg", countryCode = "GR", timeZone = "UTC+02:00" },
            new Country() { id = 130, name = "Saint Martin", phoneCode = "+663", flagSvg = "https://flagcdn.com/mf.svg", countryCode = "MF", timeZone = "UTC-04:00" },
            new Country() { id = 131, name = "Antigua and Barbuda", phoneCode = "+028", flagSvg = "https://flagcdn.com/ag.svg", countryCode = "AG", timeZone = "UTC-04:00" },
            new Country() { id = 132, name = "Cyprus", phoneCode = "+196", flagSvg = "https://flagcdn.com/cy.svg", countryCode = "CY", timeZone = "UTC+02:00" },
            new Country() { id = 133, name = "Sint Maarten", phoneCode = "+534", flagSvg = "https://flagcdn.com/sx.svg", countryCode = "SX", timeZone = "UTC-04:00" },
            new Country() { id = 134, name = "Monaco", phoneCode = "+492", flagSvg = "https://flagcdn.com/mc.svg", countryCode = "MC", timeZone = "UTC+01:00" },
            new Country() { id = 135, name = "Fiji", phoneCode = "+242", flagSvg = "https://flagcdn.com/fj.svg", countryCode = "FJ", timeZone = "UTC+12:00" },
            new Country() { id = 136, name = "Ukraine", phoneCode = "+804", flagSvg = "https://flagcdn.com/ua.svg", countryCode = "UA", timeZone = "UTC+02:00" },
            new Country() { id = 137, name = "Martinique", phoneCode = "+474", flagSvg = "https://flagcdn.com/mq.svg", countryCode = "MQ", timeZone = "UTC-04:00" },
            new Country() { id = 138, name = "Hong Kong", phoneCode = "+344", flagSvg = "https://flagcdn.com/hk.svg", countryCode = "HK", timeZone = "UTC+08:00" },
            new Country() { id = 139, name = "Portugal", phoneCode = "+620", flagSvg = "https://flagcdn.com/pt.svg", countryCode = "PT", timeZone = "UTC-01:00" },
            new Country() { id = 140, name = "Bhutan", phoneCode = "+064", flagSvg = "https://flagcdn.com/bt.svg", countryCode = "BT", timeZone = "UTC+06:00" },
            new Country() { id = 141, name = "Nepal", phoneCode = "+524", flagSvg = "https://flagcdn.com/np.svg", countryCode = "NP", timeZone = "UTC+05:45" },
            new Country() { id = 142, name = "France", phoneCode = "+250", flagSvg = "https://flagcdn.com/fr.svg", countryCode = "FR", timeZone = "UTC-10:00" },
            new Country() { id = 143, name = "Ireland", phoneCode = "+372", flagSvg = "https://flagcdn.com/ie.svg", countryCode = "IE", timeZone = "UTC" },
            new Country() { id = 144, name = "United Arab Emirates", phoneCode = "+784", flagSvg = "https://flagcdn.com/ae.svg", countryCode = "AE", timeZone = "UTC+04:00" },
            new Country() { id = 145, name = "Guernsey", phoneCode = "+831", flagSvg = "https://flagcdn.com/gg.svg", countryCode = "GG", timeZone = "UTC+00:00" },
            new Country() { id = 146, name = "Saint Lucia", phoneCode = "+662", flagSvg = "https://flagcdn.com/lc.svg", countryCode = "LC", timeZone = "UTC-04:00" },
            new Country() { id = 147, name = "Dominican Republic", phoneCode = "+214", flagSvg = "https://flagcdn.com/do.svg", countryCode = "DO", timeZone = "UTC-04:00" },
            new Country() { id = 148, name = "Serbia", phoneCode = "+688", flagSvg = "https://flagcdn.com/rs.svg", countryCode = "RS", timeZone = "UTC+01:00" },
            new Country() { id = 149, name = "Botswana", phoneCode = "+072", flagSvg = "https://flagcdn.com/bw.svg", countryCode = "BW", timeZone = "UTC+02:00" },
            new Country() { id = 150, name = "Ivory Coast", phoneCode = "+384", flagSvg = "https://flagcdn.com/ci.svg", countryCode = "CI", timeZone = "UTC" },
            new Country() { id = 151, name = "Ghana", phoneCode = "+288", flagSvg = "https://flagcdn.com/gh.svg", countryCode = "GH", timeZone = "UTC" },
            new Country() { id = 152, name = "Comoros", phoneCode = "+174", flagSvg = "https://flagcdn.com/km.svg", countryCode = "KM", timeZone = "UTC+03:00" },
            new Country() { id = 153, name = "Azerbaijan", phoneCode = "+031", flagSvg = "https://flagcdn.com/az.svg", countryCode = "AZ", timeZone = "UTC+04:00" },
            new Country() { id = 154, name = "United Kingdom", phoneCode = "+826", flagSvg = "https://flagcdn.com/gb.svg", countryCode = "GB", timeZone = "UTC-08:00" },
            new Country() { id = 155, name = "Central African Republic", phoneCode = "+140", flagSvg = "https://flagcdn.com/cf.svg", countryCode = "CF", timeZone = "UTC+01:00" },
            new Country() { id = 156, name = "Palestine", phoneCode = "+275", flagSvg = "https://flagcdn.com/ps.svg", countryCode = "PS", timeZone = "UTC+02:00" },
            new Country() { id = 157, name = "Caribbean Netherlands", phoneCode = "+535", flagSvg = "https://flagcdn.com/bq.svg", countryCode = "BQ", timeZone = "UTC-04:00" },
            new Country() { id = 158, name = "Taiwan", phoneCode = "+158", flagSvg = "https://flagcdn.com/tw.svg", countryCode = "TW", timeZone = "UTC+08:00" },
            new Country() { id = 159, name = "Kiribati", phoneCode = "+296", flagSvg = "https://flagcdn.com/ki.svg", countryCode = "KI", timeZone = "UTC+12:00" },
            new Country() { id = 160, name = "Venezuela", phoneCode = "+862", flagSvg = "https://flagcdn.com/ve.svg", countryCode = "VE", timeZone = "UTC-04:00" },
            new Country() { id = 161, name = "Burkina Faso", phoneCode = "+854", flagSvg = "https://flagcdn.com/bf.svg", countryCode = "BF", timeZone = "UTC" },
            new Country() { id = 162, name = "Benin", phoneCode = "+204", flagSvg = "https://flagcdn.com/bj.svg", countryCode = "BJ", timeZone = "UTC+01:00" },
            new Country() { id = 163, name = "Western Sahara", phoneCode = "+732", flagSvg = "https://flagcdn.com/eh.svg", countryCode = "EH", timeZone = "UTC" },
            new Country() { id = 164, name = "Finland", phoneCode = "+246", flagSvg = "https://flagcdn.com/fi.svg", countryCode = "FI", timeZone = "UTC+02:00" },
            new Country() { id = 165, name = "Gibraltar", phoneCode = "+292", flagSvg = "https://flagcdn.com/gi.svg", countryCode = "GI", timeZone = "UTC+01:00" },
            new Country() { id = 166, name = "Mali", phoneCode = "+466", flagSvg = "https://flagcdn.com/ml.svg", countryCode = "ML", timeZone = "UTC" },
            new Country() { id = 167, name = "Argentina", phoneCode = "+032", flagSvg = "https://flagcdn.com/ar.svg", countryCode = "AR", timeZone = "UTC-03:00" },
            new Country() { id = 168, name = "Seychelles", phoneCode = "+690", flagSvg = "https://flagcdn.com/sc.svg", countryCode = "SC", timeZone = "UTC+04:00" },
            new Country() { id = 169, name = "Moldova", phoneCode = "+498", flagSvg = "https://flagcdn.com/md.svg", countryCode = "MD", timeZone = "UTC+02:00" },
            new Country() { id = 170, name = "Nauru", phoneCode = "+520", flagSvg = "https://flagcdn.com/nr.svg", countryCode = "NR", timeZone = "UTC+12:00" },
            new Country() { id = 171, name = "Italy", phoneCode = "+380", flagSvg = "https://flagcdn.com/it.svg", countryCode = "IT", timeZone = "UTC+01:00" },
            new Country() { id = 172, name = "Vanuatu", phoneCode = "+548", flagSvg = "https://flagcdn.com/vu.svg", countryCode = "VU", timeZone = "UTC+11:00" },
            new Country() { id = 173, name = "Palau", phoneCode = "+585", flagSvg = "https://flagcdn.com/pw.svg", countryCode = "PW", timeZone = "UTC+09:00" },
            new Country() { id = 174, name = "Uzbekistan", phoneCode = "+860", flagSvg = "https://flagcdn.com/uz.svg", countryCode = "UZ", timeZone = "UTC+05:00" },
            new Country() { id = 175, name = "Congo", phoneCode = "+178", flagSvg = "https://flagcdn.com/cg.svg", countryCode = "CG", timeZone = "UTC+01:00" },
            new Country() { id = 176, name = "Turks and Caicos Islands", phoneCode = "+796", flagSvg = "https://flagcdn.com/tc.svg", countryCode = "TC", timeZone = "UTC-04:00" },
            new Country() { id = 177, name = "Chile", phoneCode = "+152", flagSvg = "https://flagcdn.com/cl.svg", countryCode = "CL", timeZone = "UTC-03:00" },
            new Country() { id = 178, name = "Morocco", phoneCode = "+504", flagSvg = "https://flagcdn.com/ma.svg", countryCode = "MA", timeZone = "UTC" },
            new Country() { id = 179, name = "Switzerland", phoneCode = "+756", flagSvg = "https://flagcdn.com/ch.svg", countryCode = "CH", timeZone = "UTC+01:00" },
            new Country() { id = 180, name = "Denmark", phoneCode = "+208", flagSvg = "https://flagcdn.com/dk.svg", countryCode = "DK", timeZone = "UTC+01:00" },
            new Country() { id = 181, name = "Saint Helena", phoneCode = "+654", flagSvg = "https://flagcdn.com/sh.svg", countryCode = "SH", timeZone = "UTC" },
            new Country() { id = 182, name = "Nicaragua", phoneCode = "+558", flagSvg = "https://flagcdn.com/ni.svg", countryCode = "NI", timeZone = "UTC-06:00" },
            new Country() { id = 183, name = "Barbados", phoneCode = "+052", flagSvg = "https://flagcdn.com/bb.svg", countryCode = "BB", timeZone = "UTC-04:00" },
            new Country() { id = 184, name = "South Sudan", phoneCode = "+728", flagSvg = "https://flagcdn.com/ss.svg", countryCode = "SS", timeZone = "UTC+03:00" },
            new Country() { id = 185, name = "Greenland", phoneCode = "+304", flagSvg = "https://flagcdn.com/gl.svg", countryCode = "GL", timeZone = "UTC-04:00" },
            new Country() { id = 186, name = "Aruba", phoneCode = "+533", flagSvg = "https://flagcdn.com/aw.svg", countryCode = "AW", timeZone = "UTC-04:00" },
            new Country() { id = 187, name = "Oman", phoneCode = "+512", flagSvg = "https://flagcdn.com/om.svg", countryCode = "OM", timeZone = "UTC+04:00" },
            new Country() { id = 188, name = "Eritrea", phoneCode = "+232", flagSvg = "https://flagcdn.com/er.svg", countryCode = "ER", timeZone = "UTC+03:00" },
            new Country() { id = 189, name = "Kosovo", phoneCode = "+780", flagSvg = "https://flagcdn.com/xk.svg", countryCode = "XK", timeZone = "UTC+01:00" },
            new Country() { id = 190, name = "Slovakia", phoneCode = "+703", flagSvg = "https://flagcdn.com/sk.svg", countryCode = "SK", timeZone = "UTC+01:00" },
            new Country() { id = 191, name = "Algeria", phoneCode = "+012", flagSvg = "https://flagcdn.com/dz.svg", countryCode = "DZ", timeZone = "UTC+01:00" },
            new Country() { id = 192, name = "Peru", phoneCode = "+604", flagSvg = "https://flagcdn.com/pe.svg", countryCode = "PE", timeZone = "UTC-05:00" },
            new Country() { id = 193, name = "Suriname", phoneCode = "+740", flagSvg = "https://flagcdn.com/sr.svg", countryCode = "SR", timeZone = "UTC-03:00" },
            new Country() { id = 194, name = "Romania", phoneCode = "+642", flagSvg = "https://flagcdn.com/ro.svg", countryCode = "RO", timeZone = "UTC+02:00" },
            new Country() { id = 195, name = "Belgium", phoneCode = "+056", flagSvg = "https://flagcdn.com/be.svg", countryCode = "BE", timeZone = "UTC+01:00" },
            new Country() { id = 196, name = "Swaziland", phoneCode = "+748", flagSvg = "https://flagcdn.com/sz.svg", countryCode = "SZ", timeZone = "UTC+02:00" },
            new Country() { id = 197, name = "Syria", phoneCode = "+760", flagSvg = "https://flagcdn.com/sy.svg", countryCode = "SY", timeZone = "UTC+02:00" },
            new Country() { id = 198, name = "United States", phoneCode = "+840", flagSvg = "https://flagcdn.com/us.svg", countryCode = "US", timeZone = "UTC-12:00" },
            new Country() { id = 199, name = "Togo", phoneCode = "+768", flagSvg = "https://flagcdn.com/tg.svg", countryCode = "TG", timeZone = "UTC" },
            new Country() { id = 200, name = "Liberia", phoneCode = "+430", flagSvg = "https://flagcdn.com/lr.svg", countryCode = "LR", timeZone = "UTC" },
            new Country() { id = 201, name = "Bahrain", phoneCode = "+048", flagSvg = "https://flagcdn.com/bh.svg", countryCode = "BH", timeZone = "UTC+03:00" },
            new Country() { id = 202, name = "Singapore", phoneCode = "+702", flagSvg = "https://flagcdn.com/sg.svg", countryCode = "SG", timeZone = "UTC+08:00" },
            new Country() { id = 203, name = "Slovenia", phoneCode = "+705", flagSvg = "https://flagcdn.com/si.svg", countryCode = "SI", timeZone = "UTC+01:00" },
            new Country() { id = 204, name = "Saint Kitts and Nevis", phoneCode = "+659", flagSvg = "https://flagcdn.com/kn.svg", countryCode = "KN", timeZone = "UTC-04:00" },
            new Country() { id = 205, name = "Burundi", phoneCode = "+108", flagSvg = "https://flagcdn.com/bi.svg", countryCode = "BI", timeZone = "UTC+02:00" },
            new Country() { id = 206, name = "Saint Pierre and Miquelon", phoneCode = "+666", flagSvg = "https://flagcdn.com/pm.svg", countryCode = "PM", timeZone = "UTC-03:00" },
            new Country() { id = 207, name = "Marshall Islands", phoneCode = "+584", flagSvg = "https://flagcdn.com/mh.svg", countryCode = "MH", timeZone = "UTC+12:00" },
            new Country() { id = 208, name = "Tuvalu", phoneCode = "+798", flagSvg = "https://flagcdn.com/tv.svg", countryCode = "TV", timeZone = "UTC+12:00" },
            new Country() { id = 209, name = "Tanzania", phoneCode = "+834", flagSvg = "https://flagcdn.com/tz.svg", countryCode = "TZ", timeZone = "UTC+03:00" },
            new Country() { id = 210, name = "Yemen", phoneCode = "+887", flagSvg = "https://flagcdn.com/ye.svg", countryCode = "YE", timeZone = "UTC+03:00" },
            new Country() { id = 211, name = "Montenegro", phoneCode = "+499", flagSvg = "https://flagcdn.com/me.svg", countryCode = "ME", timeZone = "UTC+01:00" },
            new Country() { id = 212, name = "Norfolk Island", phoneCode = "+574", flagSvg = "https://flagcdn.com/nf.svg", countryCode = "NF", timeZone = "UTC+11:30" },
            new Country() { id = 213, name = "Malawi", phoneCode = "+454", flagSvg = "https://flagcdn.com/mw.svg", countryCode = "MW", timeZone = "UTC+02:00" },
            new Country() { id = 214, name = "Zimbabwe", phoneCode = "+716", flagSvg = "https://flagcdn.com/zw.svg", countryCode = "ZW", timeZone = "UTC+02:00" },
            new Country() { id = 215, name = "Jordan", phoneCode = "+400", flagSvg = "https://flagcdn.com/jo.svg", countryCode = "JO", timeZone = "UTC+02:00" },
            new Country() { id = 216, name = "Canada", phoneCode = "+124", flagSvg = "https://flagcdn.com/ca.svg", countryCode = "CA", timeZone = "UTC-08:00" },
            new Country() { id = 217, name = "Svalbard and Jan Mayen", phoneCode = "+744", flagSvg = "https://flagcdn.com/sj.svg", countryCode = "SJ", timeZone = "UTC+01:00" },
            new Country() { id = 218, name = "Solomon Islands", phoneCode = "+090", flagSvg = "https://flagcdn.com/sb.svg", countryCode = "SB", timeZone = "UTC+11:00" },
            new Country() { id = 219, name = "Cook Islands", phoneCode = "+184", flagSvg = "https://flagcdn.com/ck.svg", countryCode = "CK", timeZone = "UTC-10:00" },
            new Country() { id = 220, name = "Bangladesh", phoneCode = "+050", flagSvg = "https://flagcdn.com/bd.svg", countryCode = "BD", timeZone = "UTC+06:00" },
            new Country() { id = 221, name = "Indonesia", phoneCode = "+360", flagSvg = "https://flagcdn.com/id.svg", countryCode = "ID", timeZone = "UTC+09:00" },
            new Country() { id = 222, name = "Falkland Islands", phoneCode = "+238", flagSvg = "https://flagcdn.com/fk.svg", countryCode = "FK", timeZone = "UTC-03:00" },
            new Country() { id = 223, name = "Dominica", phoneCode = "+212", flagSvg = "https://flagcdn.com/dm.svg", countryCode = "DM", timeZone = "UTC-04:00" },
            new Country() { id = 224, name = "Myanmar", phoneCode = "+104", flagSvg = "https://flagcdn.com/mm.svg", countryCode = "MM", timeZone = "UTC+06:30" },
            new Country() { id = 225, name = "Angola", phoneCode = "+024", flagSvg = "https://flagcdn.com/ao.svg", countryCode = "AO", timeZone = "UTC+01:00" },
            new Country() { id = 226, name = "Tokelau", phoneCode = "+772", flagSvg = "https://flagcdn.com/tk.svg", countryCode = "TK", timeZone = "UTC+14:00" },
            new Country() { id = 227, name = "Cambodia", phoneCode = "+116", flagSvg = "https://flagcdn.com/kh.svg", countryCode = "KH", timeZone = "UTC+07:00" },
            new Country() { id = 228, name = "Australia", phoneCode = "+036", flagSvg = "https://flagcdn.com/au.svg", countryCode = "AU", timeZone = "UTC+11:00" },
            new Country() { id = 229, name = "Belize", phoneCode = "+084", flagSvg = "https://flagcdn.com/bz.svg", countryCode = "BZ", timeZone = "UTC-06:00" },
            new Country() { id = 230, name = "Mongolia", phoneCode = "+496", flagSvg = "https://flagcdn.com/mn.svg", countryCode = "MN", timeZone = "UTC+08:00" },
            new Country() { id = 231, name = "Guatemala", phoneCode = "+320", flagSvg = "https://flagcdn.com/gt.svg", countryCode = "GT", timeZone = "UTC-06:00" },
            new Country() { id = 232, name = "Egypt", phoneCode = "+818", flagSvg = "https://flagcdn.com/eg.svg", countryCode = "EG", timeZone = "UTC+02:00" },
            new Country() { id = 233, name = "Ecuador", phoneCode = "+218", flagSvg = "https://flagcdn.com/ec.svg", countryCode = "EC", timeZone = "UTC-06:00" },
            new Country() { id = 234, name = "Saint Barthélemy", phoneCode = "+652", flagSvg = "https://flagcdn.com/bl.svg", countryCode = "BL", timeZone = "UTC-04:00" },
            new Country() { id = 235, name = "Pitcairn", phoneCode = "+612", flagSvg = "https://flagcdn.com/pn.svg", countryCode = "PN", timeZone = "UTC-08:00" },
            new Country() { id = 236, name = "Norway", phoneCode = "+578", flagSvg = "https://flagcdn.com/no.svg", countryCode = "NO", timeZone = "UTC+01:00" },
            new Country() { id = 237, name = "Saint Vincent and the Grenadines", phoneCode = "+670", flagSvg = "https://flagcdn.com/vc.svg", countryCode = "VC", timeZone = "UTC-04:00" },
            new Country() { id = 238, name = "New Zealand", phoneCode = "+554", flagSvg = "https://flagcdn.com/nz.svg", countryCode = "NZ", timeZone = "UTC+13:00" },
            new Country() { id = 239, name = "Gabon", phoneCode = "+266", flagSvg = "https://flagcdn.com/ga.svg", countryCode = "GA", timeZone = "UTC+01:00" },
            new Country() { id = 240, name = "Papua New Guinea", phoneCode = "+598", flagSvg = "https://flagcdn.com/pg.svg", countryCode = "PG", timeZone = "UTC+10:00" },
            new Country() { id = 241, name = "Cape Verde", phoneCode = "+132", flagSvg = "https://flagcdn.com/cv.svg", countryCode = "CV", timeZone = "UTC-01:00" },
            new Country() { id = 242, name = "India", phoneCode = "+356", flagSvg = "https://flagcdn.com/in.svg", countryCode = "IN", timeZone = "UTC+05:30" },
            new Country() { id = 243, name = "Haiti", phoneCode = "+332", flagSvg = "https://flagcdn.com/ht.svg", countryCode = "HT", timeZone = "UTC-05:00" },
            new Country() { id = 244, name = "Gambia", phoneCode = "+270", flagSvg = "https://flagcdn.com/gm.svg", countryCode = "GM", timeZone = "UTC" },
            new Country() { id = 245, name = "Albania", phoneCode = "+008", flagSvg = "https://flagcdn.com/al.svg", countryCode = "AL", timeZone = "UTC+01:00" },
            new Country() { id = 246, name = "Sweden", phoneCode = "+752", flagSvg = "https://flagcdn.com/se.svg", countryCode = "SE", timeZone = "UTC+01:00" },
            new Country() { id = 247, name = "Cyprus", phoneCode = "+196", flagSvg = "https://flagcdn.com/cy.svg", countryCode = "CY", timeZone = "UTC+02:00" },
            new Country() { id = 248, name = "Mauritius", phoneCode = "+480", flagSvg = "https://flagcdn.com/mu.svg", countryCode = "MU", timeZone = "UTC+04:00" },
            new Country() { id = 249, name = "Vietnam", phoneCode = "+704", flagSvg = "https://flagcdn.com/vn.svg", countryCode = "VN", timeZone = "UTC+07:00" },
            new Country() { id = 250, name = "Morocco", phoneCode = "+504", flagSvg = "https://flagcdn.com/ma.svg", countryCode = "MA", timeZone = "UTC" },
            new Country() { id = 251, name = "Tajikistan", phoneCode = "+762", flagSvg = "https://flagcdn.com/tj.svg", countryCode = "TJ", timeZone = "UTC+05:00" },
            new Country() { id = 252, name = "Lebanon", phoneCode = "+961", flagSvg = "https://flagcdn.com/lb.svg", countryCode = "LB", timeZone = "UTC+02:00" },
            new Country() { id = 253, name = "Bermuda", phoneCode = "+060", flagSvg = "https://flagcdn.com/bm.svg", countryCode = "BM", timeZone = "UTC-04:00" },
            new Country() { id = 254, name = "Netherlands", phoneCode = "+528", flagSvg = "https://flagcdn.com/nl.svg", countryCode = "NL", timeZone = "UTC+01:00" },
            new Country() { id = 255, name = "Saudi Arabia", phoneCode = "+682", flagSvg = "https://flagcdn.com/sa.svg", countryCode = "SA", timeZone = "UTC+03:00" },
            new Country() { id = 256, name = "Germany", phoneCode = "+276", flagSvg = "https://flagcdn.com/de.svg", countryCode = "DE", timeZone = "UTC+01:00" },
            new Country() { id = 257, name = "Guinea-Bissau", phoneCode = "+624", flagSvg = "https://flagcdn.com/gw.svg", countryCode = "GW", timeZone = "UTC" },
            new Country() { id = 258, name = "Russia", phoneCode = "+643", flagSvg = "https://flagcdn.com/ru.svg", countryCode = "RU", timeZone = "UTC+03:00" },
            new Country() { id = 259, name = "Senegal", phoneCode = "+686", flagSvg = "https://flagcdn.com/sn.svg", countryCode = "SN", timeZone = "UTC" },
            new Country() { id = 260, name = "Malaysia", phoneCode = "+458", flagSvg = "https://flagcdn.com/my.svg", countryCode = "MY", timeZone = "UTC+08:00" },
            new Country() { id = 261, name = "Iran", phoneCode = "+364", flagSvg = "https://flagcdn.com/ir.svg", countryCode = "IR", timeZone = "UTC+03:30" },
            new Country() { id = 262, name = "Sri Lanka", phoneCode = "+144", flagSvg = "https://flagcdn.com/lk.svg", countryCode = "LK", timeZone = "UTC+05:30" },
            new Country() { id = 263, name = "Anguilla", phoneCode = "+660", flagSvg = "https://flagcdn.com/ai.svg", countryCode = "AI", timeZone = "UTC-04:00" },
            new Country() { id = 264, name = "British Indian Ocean Territory", phoneCode = "+086", flagSvg = "https://flagcdn.com/io.svg", countryCode = "IO", timeZone = "UTC+06:00" },
            new Country() { id = 265, name = "Serbia", phoneCode = "+688", flagSvg = "https://flagcdn.com/rs.svg", countryCode = "RS", timeZone = "UTC+01:00" },
            new Country() { id = 266, name = "Luxembourg", phoneCode = "+442", flagSvg = "https://flagcdn.com/lu.svg", countryCode = "LU", timeZone = "UTC+01:00" },
            new Country() { id = 267, name = "Turkey", phoneCode = "+792", flagSvg = "https://flagcdn.com/tr.svg", countryCode = "TR", timeZone = "UTC+03:00" },
            new Country() { id = 268, name = "Belarus", phoneCode = "+112", flagSvg = "https://flagcdn.com/by.svg", countryCode = "BY", timeZone = "UTC+03:00" },
            new Country() { id = 269, name = "South Korea", phoneCode = "+410", flagSvg = "https://flagcdn.com/kr.svg", countryCode = "KR", timeZone = "UTC+09:00" },
            new Country() { id = 270, name = "Latvia", phoneCode = "+428", flagSvg = "https://flagcdn.com/lv.svg", countryCode = "LV", timeZone = "UTC+02:00" },
            new Country() { id = 271, name = "Norfolk Island", phoneCode = "+574", flagSvg = "https://flagcdn.com/nf.svg", countryCode = "NF", timeZone = "UTC+11:30" },
            new Country() { id = 272, name = "Argentina", phoneCode = "+032", flagSvg = "https://flagcdn.com/ar.svg", countryCode = "AR", timeZone = "UTC-03:00" },
            new Country() { id = 273, name = "Slovenia", phoneCode = "+705", flagSvg = "https://flagcdn.com/si.svg", countryCode = "SI", timeZone = "UTC+01:00" },
            new Country() { id = 274, name = "Zambia", phoneCode = "+894", flagSvg = "https://flagcdn.com/zm.svg", countryCode = "ZM", timeZone = "UTC+02:00" },
            new Country() { id = 275, name = "Libya", phoneCode = "+434", flagSvg = "https://flagcdn.com/ly.svg", countryCode = "LY", timeZone = "UTC+02:00" },
            new Country() { id = 276, name = "Ukraine", phoneCode = "+804", flagSvg = "https://flagcdn.com/ua.svg", countryCode = "UA", timeZone = "UTC+02:00" },
            new Country() { id = 277, name = "Moldova", phoneCode = "+498", flagSvg = "https://flagcdn.com/md.svg", countryCode = "MD", timeZone = "UTC+02:00" },
            new Country() { id = 278, name = "Faroe Islands", phoneCode = "+234", flagSvg = "https://flagcdn.com/fo.svg", countryCode = "FO", timeZone = "UTC" },
            new Country() { id = 279, name = "Finland", phoneCode = "+246", flagSvg = "https://flagcdn.com/fi.svg", countryCode = "FI", timeZone = "UTC+02:00" },
            new Country() { id = 280, name = "Mozambique", phoneCode = "+508", flagSvg = "https://flagcdn.com/mz.svg", countryCode = "MZ", timeZone = "UTC+02:00" },
            new Country() { id = 281, name = "Czech Republic", phoneCode = "+203", flagSvg = "https://flagcdn.com/cz.svg", countryCode = "CZ", timeZone = "UTC+01:00" },
            new Country() { id = 282, name = "Bosnia and Herzegovina", phoneCode = "+070", flagSvg = "https://flagcdn.com/ba.svg", countryCode = "BA", timeZone = "UTC+01:00" },
            new Country() { id = 283, name = "Guinea", phoneCode = "+324", flagSvg = "https://flagcdn.com/gn.svg", countryCode = "GN", timeZone = "UTC" },
            new Country() { id = 284, name = "Thailand", phoneCode = "+764", flagSvg = "https://flagcdn.com/th.svg", countryCode = "TH", timeZone = "UTC+07:00" },
            new Country() { id = 285, name = "Sierra Leone", phoneCode = "+694", flagSvg = "https://flagcdn.com/sl.svg", countryCode = "SL", timeZone = "UTC" },
            new Country() { id = 286, name = "Macedonia", phoneCode = "+807", flagSvg = "https://flagcdn.com/mk.svg", countryCode = "MK", timeZone = "UTC+01:00" },
            new Country() { id = 287, name = "Fiji", phoneCode = "+242", flagSvg = "https://flagcdn.com/fj.svg", countryCode = "FJ", timeZone = "UTC+12:00" },
            new Country() { id = 288, name = "Nigeria", phoneCode = "+566", flagSvg = "https://flagcdn.com/ng.svg", countryCode = "NG", timeZone = "UTC+01:00" },
            new Country() { id = 289, name = "France", phoneCode = "+250", flagSvg = "https://flagcdn.com/fr.svg", countryCode = "FR", timeZone = "UTC+01:00" },
            new Country() { id = 290, name = "Portugal", phoneCode = "+620", flagSvg = "https://flagcdn.com/pt.svg", countryCode = "PT", timeZone = "UTC" },
            new Country() { id = 291, name = "Bulgaria", phoneCode = "+100", flagSvg = "https://flagcdn.com/bg.svg", countryCode = "BG", timeZone = "UTC+02:00" },
            new Country() { id = 292, name = "Greece", phoneCode = "+300", flagSvg = "https://flagcdn.com/gr.svg", countryCode = "GR", timeZone = "UTC+02:00" },
            new Country() { id = 293, name = "Ethiopia", phoneCode = "+231", flagSvg = "https://flagcdn.com/et.svg", countryCode = "ET", timeZone = "UTC+03:00" },
            new Country() { id = 294, name = "Saint Helena", phoneCode = "+654", flagSvg = "https://flagcdn.com/sh.svg", countryCode = "SH", timeZone = "UTC" },
            new Country() { id = 295, name = "Guadeloupe", phoneCode = "+312", flagSvg = "https://flagcdn.com/gp.svg", countryCode = "GP", timeZone = "UTC-04:00" },
            new Country() { id = 296, name = "Uganda", phoneCode = "+800", flagSvg = "https://flagcdn.com/ug.svg", countryCode = "UG", timeZone = "UTC+03:00" },
            new Country() { id = 297, name = "Montserrat", phoneCode = "+500", flagSvg = "https://flagcdn.com/ms.svg", countryCode = "MS", timeZone = "UTC-04:00" },
            new Country() { id = 298, name = "Namibia", phoneCode = "+516", flagSvg = "https://flagcdn.com/na.svg", countryCode = "NA", timeZone = "UTC+01:00" },
            new Country() { id = 299, name = "Turkmenistan", phoneCode = "+795", flagSvg = "https://flagcdn.com/tm.svg", countryCode = "TM", timeZone = "UTC+05:00" },
            new Country() { id = 300, name = "Iceland", phoneCode = "+352", flagSvg = "https://flagcdn.com/is.svg", countryCode = "IS", timeZone = "UTC" }
        };

        public static List<Permission> allPermissions = new List<Permission>()
        {
            new Permission { Id = 1, Key= "AddUsers", Value = "AddUser", Description = "Permission to add a user" },
            new Permission { Id = 2, Key= "TaskModification", Value = "ModifyTask", Description = "Permission to modify a task" },
            new Permission { Id = 3, Key= "TaskDeletion", Value = "DeleteTask", Description = "Permission to delete a task" },
            new Permission { Id = 4, Key= "TaskAssignment", Value = "AssignTask", Description = "Permission to assign a task to a user" },
            new Permission { Id = 5, Key= "TaskCompletion", Value = "CompleteTask", Description = "Permission to mark a task as completed" },
            new Permission { Id = 6, Key= "TaskView", Value = "ViewTask", Description = "Permission to view task details" },
            new Permission { Id = 7, Key= "TaskPriorityChange", Value = "ChangeTaskPriority", Description = "Permission to change task priority" },
            new Permission { Id = 8, Key= "TaskStatusChange", Value = "ChangeTaskStatus", Description = "Permission to change task status" },
            new Permission { Id = 9, Key= "TaskComment", Value = "AddTaskComment", Description = "Permission to add comments to a task" },
            new Permission { Id = 10,Key = "TaskAttachment", Value = "AttachFileToTask", Description = "Permission to attach files to a task" },
            new Permission { Id = 11,Key = "UserManagement", Value = "ManageUsers", Description = "Permission to manage users" },
            new Permission { Id = 12,Key = "RoleManagement", Value = "ManageRoles", Description = "Permission to manage roles" },
            new Permission { Id = 13,Key = "ProjectCreation", Value = "CreateProject", Description = "Permission to create a project" },
            new Permission { Id = 14,Key = "ProjectDeletion", Value = "DeleteProject", Description = "Permission to delete a project" },
            new Permission { Id = 15,Key = "ProjectModification", Value = "ModifyProject", Description = "Permission to modify a project" },
            new Permission { Id = 16,Key = "TaskCreation", Value = "CreateTask", Description = "Permission to create a task" },
        };
    }
}
