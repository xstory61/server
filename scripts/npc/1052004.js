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
/* Denma the Owner
	Henesys VIP Eye Change.
*/
tier1 = [1302000, 1045000,1045001];
tier2 = [1045002,1045003,1045006,1045009,1045010];
tier3 = [1045004,1045005,1045007,1045008];
var status = -1;

var counter = 0;

function start() {
    action(1,0,0);
}
function action(m,t,s){
	
	if(status == -1){
		cm.sendNext("Welcome to the Sandbox Ioc Vendor! Please click 'Next' in-order to tryout our IoCs!");		
		status++;
	}
	else{
         if(m < 1)
		 {
			 cm.dispose();
		 }	
   else{		 
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
      if(cm.getClient().getPlayer().getMap().getId() == 180000001){		
	 /*   cm.sendOk("Heres your selection +" + s);
		cm.dispose(); */		
		if(s < tier1.length){
		cm.gainSandboxitem(tier1[s]);		
		//cm.gainItem(tier1[s]);
		cm.showItemsgained(tier1[s],1);		
		cm.dispose();		
			
		}
		else if(s > tier1.length -1 && s < tier1.length + tier2.length ){
		cm.gainSandboxitem(tier2[s-tier1.length]);		
		//cm.gainItem(tier2[s-tier1.length]);
		cm.showItemsgained(tier2[s-tier1.length],1);	
		cm.dispose();
			}
		else if(s > tier1.length + tier2.length - 1 && s < tier1.length + tier2.length + tier3.length){
		//cm.gainItem(tier3[s-(tier1.length + tier2.length)]);
		cm.gainSandboxitem(tier3[s-(tier1.length + tier2.length)]);
		cm.showItemsgained(tier3[s-(tier1.length + tier2.length)],1);	
		cm.dispose();
			}		
		else{
			cm.sendOk("You don't have enough ep!");
			cm.dispose();
		}
	  }
     else{
		cm.sendOk("You're not located in the desginated map! Therefore, you will not be allowed to tryout our IoCs!");
			cm.dispose(); 
	 }		 
	}
		}
	
	}
}
