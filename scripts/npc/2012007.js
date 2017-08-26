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

/* Rinz the assistant
	Orbis Random Hair/Hair Color Change.
*/
var status = 0;


function start() {
  action(1,0,0);
}

function action(mode, type, selection) {
	if(status == 0){
		cm.sendGetNumber("Would you like to play Unscramble?! Enter below the number of letters for the word you'd like to unscramble! \r\n\r\n#rPlease enter number of letters:",3,3,20);
	//cm.sendOk("Would you like to play Unscramble?! Enter below the number of letters for the word you'd like to unscramble!");	
	//  cm.sendGetText("wtf do u want \r\n\r\n#r boi:");
	//  cm.sendOk("Closed");
	//  cm.dispose();
	status++;
		//cm.dispose();
	}
	else{
		if(mode < 1){
			cm.dispose();
		}
		else{
			if(status == 1){
				//cm.sendOk("heya boi");
				//cm.sendOk(cm.getText()+"");
			
				
				cm.startMapUnscramble(cm.getText());
				cm.dispose();
			}
		}
	}
	
}
