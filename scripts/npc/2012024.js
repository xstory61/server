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

var status = 0;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0) {
        cm.sendNext("\t\t\t\t\t\t\t\t\t\t#r#eDaily Reward#n#k\r\nHello! Would you like to receive your daily reward?\r\n\r\n #e#i5072000# x25 \r\n #i5076000# x10 \r\n #i4031039# x10000");
	
        status++;
    } else {
        if (mode < 1) {
            cm.dispose();
        } else {
            if (status == 1) {
				if(cm.getClient().canDaily().equals("can")){
					cm.getClient().getPlayer().getCashShop().gainCash(1, 10000);
					cm.gainItem(5072000,25);	
 					cm.gainItem(5076000,10);	
                    cm.showItemsgained(5072000,25);
					cm.showItemsgained(5076000,25);
                    cm.getClient().setDaily();					
					cm.dispose();
					}
				else
                   cm.sendOk("You've already received your daily reward! Talk to me again in #b#e" + cm.getClient().canDaily() + "#k#n hours, you brat!");
              cm.dispose();
		
        }
      }
	}
}
