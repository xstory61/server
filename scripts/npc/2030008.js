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

/* Adobis
 * 
 * El Nath: The Door to Zakum (211042300)
 * 
 * Zakum Quest NPC 
 
 * Custom Quest 100200 = whether you can do Zakum
 * Custom Quest 100201 = Collecting Gold Teeth <- indicates it's been started
 * Custom Quest 100203 = Collecting Gold Teeth <- indicates it's finished
 * 4031061 = Piece of Fire Ore - stage 1 reward
 * 4031062 = Breath of Fire    - stage 2 reward
 * 4001017 = Eye of Fire       - stage 3 reward
 * 4000082 = Zombie's Gold Tooth (stage 3 req)
*/

var status = 0;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
   if (status == 0) {
        cm.sendSimple("Hello! I'm the All-in-one NPC, Here's a list of our NPCs .#b\r\n#L0#All-in-one Shop\r\n#L1#Styler\r\n#L2#Job Instructor\r\n#L3#Daily Reward\r\n#L4#Spinel\r\n#L5#JQs\r\n#L6#Ioc Vendor\r\n#L7#MSI\r\n#L8#Rank\r\n#L9#Delete Character");
        status++;
		
		
    } else {
        if (mode < 1) {
            cm.dispose();
        } else {
            if (status == 1) {
				 if(selection == 0){
				 cm.openNpc(1092019); 
					 // aio shop 1092019
				 }else if(selection == 1){
					 cm.openNpc(1530041);
					 // styler 1530041
				 } else if(selection == 2){
					 cm.openNpc(2012022);
					 // job advancer 2012022
				 } else if(selection == 3){
					 cm.openNpc(2012024);
					 // daily reward npc 2012024
				 } else if(selection == 4){
					 cm.openNpc(9000020);
					 // spinel 9000020
				 } else if(selection == 5){
					 cm.openNpc(1095002);
					 // jq npc 1095002
				 }  else if(selection == 6){
					 cm.openNpc(9201397);
					 // ioc vendor 9201397
				 }  else if(selection == 7){
					 cm.openNpc(2040002);
					 // MSI npc 2040002 
				 } else if(selection == 8){
					 cm.openNpc(2040019);
					 // Rank npc 2040019 				 
				 } else if(selection == 9){
					 cm.openNpc(1052005);
					 // Delete Character npc 1052005
				 } 
				 // Spawner 2012014
        }
      }
	}
}
