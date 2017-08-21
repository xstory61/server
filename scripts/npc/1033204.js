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

/* Everton
	Ludibrium Random Eye Change.
*/
var status = 0;
var post = "";

function start() {
    action(1, 0, 0);
}

function action(m,t,s) {
   if(status == 0)
   {
	   cm.sendSimple("#e#r\t\t\t\t\t\t\tRanks#n#k \r\n\ #L0#Rebirths#l\t\t\t\t\t#L1#Currency#l\r\n\t#L2#Event Points#l\t\t\t\t#L4#Event Wins#l\r\n\t\t#L6#Omok Score#l\t\t\t\t#L5#Omok Wins#l\r\n\t\t\t#L7#Fish Points#l\t\t\t\t\t#L8#Fish Level#l\r\n\t\t\t\t#L3#Fame#l\t\t\t\t\t\t\t\t#L10#Online Time#l\r\n\t\t\t\t\t#L9#JQ Points#l");
	   status++;
	 
   }
   else{
	   if(m < 1){
		   cm.dispose();
	   }
    else if(status == 1)
     {
	   if(s == 0)
		   post =  cm.Rbrank();
	   else if(s == 1)
		   post = cm.Currank();
	   else if(s == 2)
		   post =  cm.Eprank();
	   else if(s == 3)
		  post =   cm.Famerank();
	   else if(s == 4)
		   post =  cm.Erprank();
	   else if(s == 5)
		   post =  cm.Omokrank();
	   else if(s == 6)
		   post =  cm.Omscorerank();
	   else if(s == 7)
		   post =  cm.Fishptsrank();
	   else if(s == 8)
		   post = cm.Fishexprank();
	   else if(s == 9)
		   post =  cm.Jqptsrank();
	     else if(s == 10)
		   post =  cm.Onlinerank();
		   
	  
	cm.sendOk(post);  
	cm.dispose();
   }
   }
}
