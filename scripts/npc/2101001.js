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
items = [1302000];
var status = 0;

function start() {
    action(1,0,0);
}
function action(m,t,s){
	if(status == 0){
		var talk = "Pick out of the following items \r\n";
		cm.sendSimple("Pick out of the following items")
		for(var i=0; i < items.length();i++)
			talk+= "#L"+i+"#"+items[i]+"#l";
		status++;
		
	}
	else if(status == 1){
		cm.gainItem(items[s]);
		cm.dispose();
	}
}