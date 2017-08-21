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

/* KIN
	Male Hair for GM.
*/
var status = 0;
var beauty = 0;
var haircolor = Array();
var skin = Array(0, 1, 2, 3, 4, 5, 9, 10, 11, 12, 13);

var hair = Array(30000, 30020, 30030, 30040, 30050, 30060, 30100, 30110, 30120, 30130, 30140, 30150, 30160, 30170, 30180, 30190, 
					30200, 30210, 30220, 30230, 30240, 30250, 30260, 30270, 30280, 30290, 30300, 30310, 30320, 30330, 30340, 30350, 
					30360, 30370, 30380, 30400, 30410, 30420, 30430, 30440, 30450, 30460, 30470, 30480, 30490, 30510, 30520, 30530, 
					30540, 30550, 30560, 30570, 30580, 30590, 30600, 30610, 30620, 30630, 30640, 30650, 30660, 30670, 30680, 30690, 
					30700, 30710, 30720, 30730, 30740, 30750, 30760, 30770, 30780, 30790, 30800, 30810, 30820);
				
var hair2 = Array(30830, 30840, 30850, 30860, 30870, 30880, 30890, 30900, 30910, 30920, 30930, 30940, 30950, 33030, 33040, 
					33060, 33080, 33090, 33100, 33110, 33120, 33130, 33150, 33170, 33180, 33190, 33200, 33210, 33220, 33230, 
					33240, 33250, 33260, 33270, 33280, 33290, 33310, 33320, 33330, 33340, 33350, 33360, 33370, 33380, 33390, 
					33400, 33410, 33420, 33440, 33450, 33460, 33470, 33480, 33490, 33500, 33510, 33520, 33530, 33540, 33550, 33580, 
					33600, 33610, 33620, 33630, 33640, 33650, 33660, 33670, 33680, 33690, 33700, 33710, 33720, 33730, 33740, 33750, 
					33760, 33770, 33780, 33790, 33800, 33810, 33820, 33830, 33990, 133377);
				
var hair3 = Array(32040, 32060, 32120, 32170, 32180, 32190, 32220, 32260, 32370, 32380, 32390, 32410, 32420, 32430, 32440, 32450, 
					32460, 32470, 32480, 32490, 32500, 32520, 32590, 32630, 32640, 35000, 35010, 35020, 35030, 35040, 35050, 35060, 
					35090, 35130, 35140, 35150, 35170, 35180, 35200, 35220, 35240, 35260, 35290, 35300, 35320, 35330, 35350, 35360, 
					35370, 35380, 36020, 36030, 36040, 36060, 36070, 36080, 36090, 36100, 36180, 36120, 36130, 36140, 36150, 36160, 
					36170, 36190, 36200, 36210, 36220, 36230, 36240, 36250, 36260, 36270, 36280, 36290, 36300, 36310, 36320, 
					36330, 36340, 36350, 36440, 36450, 36470, 36480, 36490, 36510, 36530, 32610);
				
var hair4 = Array(36580, 36610, 36630, 36640, 36650, 36670, 36680, 36690, 36700, 36710, 36750, 36770, 36780, 36790, 36800, 36810, 
					36830, 36840, 36880, 36890, 36900, 36910, 36920, 36930, 36950, 38510, 39080, 39130, 39180, 35420, 35430, 35470, 
					35460, 35530, 35520, 35510, 35600, 35590, 35580, 35570, 35670, 35660, 35650, 35630, 35610, 35680, 35690, 35700, 
					35720, 35730, 35740, 35750, 35760, 35770, 35780, 35790, 35800, 35950, 35960, 36000, 36540, 36550, 36570, 
					38370, 38950, 39260, 39570, 39860, 39880, 38050, 39810, 39850);
		
var hair5 = Array(30050, 30130, 30260, 30330, 30560, 30800, 30810, 30830, 32120, 32410, 33150, 33220, 33250, 33340);
		
var hairnew = Array();

var face = Array(20000, 20001, 20002, 20003, 20004, 20005, 20006, 20007, 20008, 20009, 20010, 20011, 20012, 20013, 20014, 20016, 20017, 
					20018, 20019, 20020, 20021, 20022, 20023, 20024, 20025);
					
var face2 = Array(20026, 20027, 20028, 20029, 20030, 20031, 20032, 20033, 20035, 20036, 20037, 20038, 20039, 20040, 20042, 20043, 20044, 20045, 
					20046, 20047, 20048, 20049, 20050, 20051, 20052, 20053, 20054, 20055, 20056, 20057, 20058, 20059, 20060, 20061, 20062, 20063, 
					20064, 20065, 20066, 20067, 20068, 20069, 20070);
					
var face3 = Array(20073, 20074, 20075, 20076, 20077, 20078, 20080, 20081, 20082, 20083, 20084, 20085, 20086, 20087, 20088, 20089, 
					20090, 20091, 20092, 20093, 20094, 20095, 20096, 20097, 20098, 20099, 23000, 23001, 23002, 23003, 23004, 23005, 23006, 
					23007, 23008, 23009, 23010, 23011, 23012, 23013);
					
var face4 = Array(23014, 23016, 23017, 23018, 23019, 23020, 23021, 23022, 23023, 23024, 23025, 23028, 23029, 
					23031, 23030, 23032, 23033, 23034, 23035, 23038, 23039, 23040, 23041, 23042, 23043, 23044, 
					23053, 23054, 23055, 23056, 23057, 23059, 23060, 23061, 23062, 23063, 23067, 23068, 23069,
					23074, 23075, 23085, 23086, 23087, 23088, 23089, 23090, 23091, 23092, 23095, 23097, 23099,
					26016, 26002, 25011, 25001);
					
var face5 = Array(20005, 20012, 20038, 20043, 20044, 20046, 20030, 20007);
					
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
					cm.sendSimple("Hey there! I could change the way you look! What would you like to change?" +
					"\r\n#L0#Skin#l \r\n\r\n#r#L1#Hair#l \n#b#L5#Hair2#l \n#r#L6#Hair3#l \n#b#L9#Hair4#l \r\n#k#L10#Common Hair#l" +
					"\r\n\r\n#r#L3#Eyes#l \n#b#L7#Eyes2#l \n#r#L8#Eyes3#l \n#b#L11#Eyes4#l \r\n#k#L12#Common Eyes#l" +
					"\r\n\r\n#L2#Hair Color#l \n#L4#Eye Color#l");
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
			}else if (selection == 2) {
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
				var current = cm.getPlayer().getFace() % 100 + 20000;
				colors = Array();
				colors = Array(current , current + 100, current + 200, current + 300, current +400, current + 500, current + 600, current + 700, current + 800);
				cm.sendStyle("Pick one?", colors);
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
