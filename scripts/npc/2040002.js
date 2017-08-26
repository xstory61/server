/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/* Olson the Toy Soldier
	2040002

map: 922000010
quest: 3230
escape: 2040028
*/
var status = 0;
var id = 0;
function start() {
    action(1,0,0);
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else {
        status++;
        if (status == 1){ 		
            cm.sendNext("MSIs are obtainable by extracting your maxed abilities into the item, would you like to do that?");
		//	status++;
		//	cm.dispose();
		}
        else if (status == 2) {
            if(cm.canMSI()){
				if(cm.haveSpace()){
              id = cm.makeMSI();
			  cm.showItemsgained(id,1);
			  cm.sendOk("Congratulations! you've gained the #i"+id+"#, MSIs are powerful items, use them wisely");
				}
				else
					cm.sendOk("Please check if you have free space in your inventory before trying again.");
			}
		    else
				cm.sendOk("You don't match the stats needed, 30k in each ability");
			cm.dispose();

       }
    }
}	