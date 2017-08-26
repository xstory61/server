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
/* @Author Jvlaple */

tier1 = [1702263,1702266,1702277,1702295,1702335,1000015,1000016,1002225,1002716,1002717,1002959,1003072,1003268,1003269];
tier2 = [1702265,1702267,1702325,1702340,1702361,1702433,1702454,1702455,1003216,1003409,1003500,1003501,1003517,1003518,1003536,1003186,1003187];
tier3 = [1702286,1702408,1702423,1702440,1702442,1702453,1702456,1702457,1402503,1402513,1442298,1003422,1003674,1003829,1045008];
var status = 0;

var counter = 0;

function start() {
    action(1,0,0);
}
function action(m,t,s){
	if(status == 0){
		var talk = "Pick out of the following items! \r\n";	
            
	  
	  talk+= " \r\n\r\n \t\t\t\t\t\t\t\t\t #eTier 1 - 10EP Each \r\n";
		for(var i=0; i < tier1.length;i++)			
			talk+= "#L"+i+"##i"+tier1[i]+"#";		
		talk+= "#l \r\n\r\n \t\t\t\t\t\t\t\t\t  Tier 2 - 15EP Each \r\n";
		
		
		for(var j=0; j< tier2.length;j++){
			counter = i + j;
			talk+= "#L"+counter+"##i"+tier2[j]+"#";
		}
        talk+= "#l \r\n\r\n \t\t\t\t\t\t\t\t\t  Tier 3 - 20EP Each \r\n";	
	
		
		for(var k=0; k< tier3.length;k++){
			counter = i + j + k;
			talk+= "#L"+counter+"##i"+tier3[k]+"#";
		}			
	
		
	  cm.sendSimple(talk);
		status++;
		
	}
	else if(status == 1){ 	  
	 /*   cm.sendOk("Heres your selection +" + s);
		cm.dispose(); */
		if(cm.haveSpace()){
			if(s < tier1.length){
				if(cm.getClient().getPlayer().getEventpoints() > 9){
		cm.gainItem(tier1[s]);
		cm.showItemsgained(tier1[s],1);
		cm.getClient().getPlayer().addEventpoints(-10);
		cm.getClient().getPlayer().dropMessage(5,"You've lost 10 Event points");
			}
			else
			cm.getClient().getPlayer().dropMessage(5,"Error. You don't have enough ep!");
			cm.dispose();
		}		
		else if(s > tier1.length -1 && s < tier1.length + tier2.length ){
			if(cm.getClient().getPlayer().getEventpoints() > 14){
		cm.gainItem(tier2[s-tier1.length]);
		cm.showItemsgained(tier2[s-tier1.length],1);
		cm.getClient().getPlayer().addEventpoints(-15);
		cm.getClient().getPlayer().dropMessage(5,"You've lost 15 Event points");
		
			}
			else
			cm.getClient().getPlayer().dropMessage(5,"Error. You don't have enough ep!");
			cm.dispose();
		}
		else if(s > tier1.length + tier2.length - 1 && s < tier1.length + tier2.length + tier3.length){
			if(cm.getClient().getPlayer().getEventpoints() > 19){
		cm.gainItem(tier3[s-(tier1.length + tier2.length)]);
		cm.showItemsgained(tier3[s-(tier1.length + tier2.length)],1);
		cm.getClient().getPlayer().addEventpoints(-20);
		cm.getClient().getPlayer().dropMessage(5,"You've lost 20 Event points");
		
			}
			else
			cm.getClient().getPlayer().dropMessage(5,"Error. You don't have enough ep!");
			cm.dispose();
	    }		
		else
			cm.sendOk("You don't have enough ep!");
			cm.dispose();
	  }
        else
          cm.getClient().getPlayer().dropMessage(5,"Error. Please check if you have empty space in your inventory before trying again.");
          cm.dispose();	  
	}
}