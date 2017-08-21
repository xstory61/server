/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* NimaKIN
	Female Hair for GM.
*/
var status = 0;
var beauty = 0;
var haircolor = Array();
var skin = Array(0, 1, 2, 3, 4, 5, 9, 10, 11, 12, 13);
var hair = Array(31000, 31010, 31020, 31030, 31040, 31050, 31060, 31070, 31080, 31090, 31100, 31110, 31120, 31130, 31140, 31150, 
					31160, 31170, 31180, 31190, 31200, 31210, 31220, 31230, 31240, 31250, 31260, 31270, 31280, 31290, 31300, 31310, 
					31320, 31330, 31340, 31350, 31400, 31410, 31420, 31430, 31440, 31450, 31460, 31470, 31480, 31490, 31510, 31520, 
					31530, 31540, 31550, 31560, 31570, 31580, 31590, 31600, 31610, 31620, 31630, 31640, 31650, 31660, 31670, 31680, 
					31690, 31700, 31710, 31720, 31730, 31740, 31750, 31760, 31770, 31790, 31800);
					
var hair2 = Array(31810, 31820, 31830, 31840, 31850, 31860, 31870, 31880, 31890, 31900, 31910, 31920, 31930, 31940, 31950, 31960, 
					31970, 31980, 31990, 34000, 34010, 34020, 34030, 34040, 34050, 34060, 34070, 34080, 34090, 34100, 34110, 34120, 
					34130, 34140, 34150, 34160, 34170, 34180, 34190, 34200, 34210, 34220, 34230, 34240, 34250, 34260, 34270, 34280, 
					34290, 34300, 34310, 34320, 34330, 34340, 34350, 34360, 34370, 34380, 34390, 34400, 34410, 34420, 34430, 34440, 
					34450, 34460, 34470, 34480, 34490, 34510, 34540, 34560, 34580, 34590, 34600, 34610, 34620, 34630, 34640, 34650, 
					34660, 34670, 34680, 34690, 34700, 34710, 34720, 34730, 34740, 34750, 34760, 34770, 34780, 34790, 34800, 34810, 
					34820, 34830, 34840, 34850, 34860, 34870, 34880, 34890, 34900, 34910, 34940, 34950, 34960, 34970, 34980, 34990, 
					38700);
					
var hair3 = Array(32030, 32110, 32190, 32200, 32210, 32230, 32240, 32250, 32270, 32280, 32290, 32300, 32330, 32340, 32350, 32360, 
					32430, 32440, 32450, 32460, 32470, 32480, 32490, 32500, 32510, 32560, 32570, 32580, 32590, 32600, 32620, 32650, 
					32660, 35080, 35100, 35110, 35120, 35210, 35390, 36060, 36460, 36500, 36600, 36730, 36870, 36980, 36990, 37000, 
					37010, 37020, 37030, 37040, 37060, 37070, 37080, 37090, 37100, 37110, 37120, 37130, 37140, 37150, 37190, 37200, 
					37210, 37220, 37230, 37240, 37250, 37260, 37270, 37280, 37420, 37430, 37440, 37450, 37460, 37490, 37560, 37570, 
					37580, 37590, 37600, 37610, 37620, 37630, 37640, 37650, 37660, 37670, 37700, 37710, 37720, 37740, 37750, 37760, 
					37770, 37780, 37790, 37800, 37810, 37820, 37830, 37840, 37850, 37860, 37870, 37880, 37890, 37910, 37920, 37930, 
					37940);
					
var hair4 = Array(37950, 37960, 37970, 37980, 37990, 38000, 38010, 38020, 38030, 38040, 38060, 38070, 38090, 38100, 38120, 38130, 
					38140, 38150, 38160, 38170, 38180, 38190, 38200, 38210, 38220, 38230, 38240, 38250, 38260, 38270, 38280, 38290, 
					38300, 38310, 38390, 38400, 38410, 38420, 38430, 38450, 38460, 38470, 38480, 38490, 38510, 38520, 39090, 39050, 
					39070, 39100, 39110, 39120, 35480, 35490, 35500, 35540, 35580, 35620, 35640, 38560, 38570, 38580, 38590, 38600, 
					38620, 38630, 38640, 38650, 38660, 38670, 38690, 38700, 38710, 38720, 38730, 38740, 38750, 38760, 38770, 38780, 
					38800, 38810, 38820, 38830, 38840, 38850, 38860, 38880, 38890, 38900, 38910, 38930, 38940, 38950, 38960, 39190, 
					39210, 39220, 38790, 39250, 39280, 39290, 39300, 39310, 39320, 39400, 39410, 39420, 39430, 39580, 39600, 39610, 
					39620, 39870);
					
var hair5 = Array(31220, 32540, 31520, 31530, 31610, 31640, 31890, 32140, 32550, 34150, 34210, 34610, 35110, 37070, 37940, 38010, 38160, 38790, 38840, 38860, 39250, 37130);
					
var hairnew = Array();

var face = Array(21000, 21001, 21002, 21003, 21004, 21005, 21006, 21007, 21008, 21009, 21010, 21011, 21012, 21013, 21014, 21016, 21017, 
					21018, 21019, 21020, 21022, 21023, 21024);
					
var face2 = Array(21021, 21025, 21026, 21027, 21028, 21029, 21030, 21031, 21033, 21034, 21035, 21036, 21037, 21038, 21041, 21042, 21043, 
					21044, 21045, 21046, 21047, 21048, 21049, 21050, 21051, 21052, 21053, 21054, 21055, 21056, 21057, 21058, 21059, 21060, 
					21061, 21062, 21063, 21064, 21065, 21068, 21069, 21070, 21071, 21072, 21073, 21074, 21075, 21076, 21077, 21078);
					
var face3 = Array(21079, 21080, 21081, 21082, 21083, 21084, 21085, 21086, 21087, 21088, 21089, 21090, 21091, 21092, 21093, 21094, 21095, 
					21096, 21097, 21098, 21099, 24001, 24002, 24003, 24004, 24005, 24006, 24007, 24008, 24009, 24010, 24011, 24012, 24013, 
					24014, 24015, 24016, 24017, 24018, 24019, 24020, 24022, 24024, 24025, 24026, 24027, 24028, 24029, 24031, 24033, 24034, 
					24035, 24036, 24037, 24038, 24039, 24040, 28841);

var face4 = Array(24041, 24050, 24051, 24053, 24055, 24057, 24058, 24059, 24060, 24062, 24064, 24068, 24069, 24072, 24074, 24075, 
					24077, 24078, 24079, 24080, 24085, 24086, 24090, 24091, 24092, 24093, 24094, 24097, 24099, 25003, 25006, 25007, 25009, 
					25010, 25011, 25012, 25013, 26000, 26001, 26002, 26003, 26004, 26005, 26006, 26007, 26009, 26010, 26011, 26012, 26013, 
					26014, 26015);

var face5 = Array(21004, 21003, 21031, 21028, 21033, 21036, 21041, 21042, 21044, 23025, 21078);
					
var facenew = Array();
var colors = Array();

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			//if(cm.getPlayer().isGM() == false) {
				//cm.sendOk("You aren't a GM!");
				//cm.dispose();
			//} else {
				if(cm.getPlayer().getGender() == 0 || 1) {
					cm.sendSimple("Hey there! I could change the way you look! What would you like to change?" +
					"\r\n#L0#Skin#l \r\n\r\n#r#L1#Hair#l \n#b#L5#Hair2#l \n#r#L6#Hair3#l \n#b#L9#Hair4#l \r\n#k#L10#Common Hair#l" +
					"\r\n\r\n#r#L3#Eyes#l \n#b#L7#Eyes2#l \n#r#L8#Eyes3#l \n#b#L11#Eyes4#l \r\n#k#L12#Common Eyes#l" +
					"\r\n\r\n#L2#Hair Color#l \n#L4#Eye Color#l");
				}
			//}
		} else if (status == 1) {
			if (selection == 0) {
				beauty = 1;
				cm.sendStyle("Pick one?", skin);
			} else if (selection == 1) {
				beauty = 2;
				hairnew = Array();
				for(var i = 0; i < hair.length; i++) {
					hairnew.push(hair[i] + parseInt(cm.getPlayer().getHair() % 10));
				}
				cm.sendStyle("Pick one?", hairnew);
			} else if (selection == 5) {
				beauty = 2;
				hairnew = Array();
				for(var i = 0; i < hair2.length; i++) {
					hairnew.push(hair2[i] + parseInt(cm.getPlayer().getHair() % 10));
				}
				cm.sendStyle("Pick one?", hairnew);
			} else if (selection == 6) {
				beauty = 2;
				hairnew = Array();
				for(var i = 0; i < hair3.length; i++) {
					hairnew.push(hair3[i] + parseInt(cm.getPlayer().getHair() % 10));
				}
				cm.sendStyle("Pick one?", hairnew);
			} else if (selection == 2) {
				beauty = 3;
				haircolor = Array();
				var current = parseInt(cm.getPlayer().getHair()/10)*10;
				for(var i = 0; i < 8; i++) {
					haircolor.push(current + i);
				}
				cm.sendStyle("Pick one?", haircolor);
			} else if (selection == 3) {
				beauty = 4;
				facenew = Array();
				for(var i = 0; i < face.length; i++) {
					facenew.push(face[i] + cm.getPlayer().getFace() % 1000 - (cm.getPlayer().getFace() % 100));
				}
				cm.sendStyle("Pick one?", facenew);
			} else if (selection == 7) {
				beauty = 4;
				facenew = Array();
				for(var i = 0; i < face2.length; i++) {
					facenew.push(face2[i] + cm.getPlayer().getFace() % 1000 - (cm.getPlayer().getFace() % 100));
				}
				cm.sendStyle("Pick one?", facenew);
			} else if (selection == 8) {
				beauty = 4;
				facenew = Array();
				for(var i = 0; i < face3.length; i++) {
					facenew.push(face3[i] + cm.getPlayer().getFace() % 1000 - (cm.getPlayer().getFace() % 100));
				}
				cm.sendStyle("Pick one?", facenew);
			} else if (selection == 11) {
				beauty = 4;
				facenew = Array();
				for(var i = 0; i < face4.length; i++) {
					facenew.push(face4[i] + cm.getPlayer().getFace() % 1000 - (cm.getPlayer().getFace() % 100));
				}
				cm.sendStyle("Pick one?", facenew);
			} else if (selection == 12) {
				beauty = 4;
				facenew = Array();
				for(var i = 0; i < face5.length; i++) {
					facenew.push(face5[i] + cm.getPlayer().getFace() % 1000 - (cm.getPlayer().getFace() % 100));
				}
				cm.sendStyle("Pick one?", facenew);
			} else if (selection == 4) {
				beauty = 5;
				var current = cm.getPlayer().getFace() % 100 + 21000;
				colors = Array();
				colors = Array(current , current + 100, current + 200, current + 300, current +400, current + 500, current + 600, current + 700, current + 800);
				cm.sendStyle("Pick one?", colors);
				
			} else if (selection == 9) {
				beauty = 2;
				hairnew = Array();
				for(var i = 0; i < hair4.length; i++) {
					hairnew.push(hair4[i] + parseInt(cm.getPlayer().getHair() % 10));
				}
				cm.sendStyle("Pick one?", hairnew);
			} else if (selection == 10) {
				beauty = 2;
				hairnew = Array();
				for(var i = 0; i < hair5.length; i++) {
					hairnew.push(hair5[i] + parseInt(cm.getPlayer().getHair() % 10));
				}
				cm.sendStyle("Pick one?", hairnew);
			}
		}
		else if (status == 2){
			cm.dispose();
			if (beauty == 1){
				cm.setSkin(skin[selection]);
			}
			if (beauty == 2){
				cm.setHair(hairnew[selection]);
			}
			if (beauty == 3){
				cm.setHair(haircolor[selection]);
			}
			if (beauty == 4){
				cm.setFace(facenew[selection]);
			}
			if (beauty == 5){
				cm.setFace(colors[selection]);
			}
		}
	}
}
