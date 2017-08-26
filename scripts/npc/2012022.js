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
var chosenjob = 910;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) 
{
	if (mode == -1) cm.dispose();
    else if (mode == 0 && status == 0) cm.dispose();
	if (mode == 1) status++;
	else status--;
	
    if (status == 0) {
		if((cm.getJobId() == 0 || cm.getJobId() == 1000 || cm.getJobId() == 2000) && cm.getLevel() >= 10){
		     var msg = "\t\t\t\t\t\t\t\t\t\t#r#eJob Advancer#k\r\n\tGo ahead and pick a job!#n #b\r\n#L0#Warrior\r\n#L1#Magician\r\n#L2#Bowman\r\n#L3#Thief\r\n#L4#Pirate\r\n\r\n#L5#Dawn Warrior\r\n#L6#Blaze Wizard\r\n#L7#Wind Archer\r\n#L8#Night Walker\r\n#L9#Thunder Breaker\r\n\r\n#L10#Aran";
			 if(cm.getPlayer().getGmjob() == 1)
				 msg+= "\r\n#d#L11#GM";
			 cm.sendSimple(msg);
			  status++;
		}
		else if(cm.getJobId() % 100 == 0 && cm.getLevel() >= 30){
			 if(cm.getJobId() == 100)
               cm.sendSimple("\t\t\t\t\t\t\t\t\t\t#r#eJob Advancer#n#k\r\nPlease pick the class of your choosing! #b\r\n#L0#Fighter\r\n#L1#Page\r\n#L2#Spearman"); 	
		     else if(cm.getJobId() == 200)
				cm.sendSimple("\t\t\t\t\t\t\t\t\t\t#r#eJob Advancer#n#k\r\nPlease pick the class of your choosing! #b\r\n#L0#FP Wizard\r\n#L1#IL Wizard\r\n#L2#Cleric");
             else if(cm.getJobId() == 300)
                cm.sendSimple("\t\t\t\t\t\t\t\t\t\t#r#eJob Advancer#n#k\r\nPlease pick the class of your choosing! #b\r\n#L0#Hunter\r\n#L1#Crossbowman"); 		
             else if(cm.getJobId() == 400)
                cm.sendSimple("\t\t\t\t\t\t\t\t\t\t#r#eJob Advancer#n#k\r\nPlease pick the class of your choosing! #b\r\n#L0#Assassin\r\n#L1#Bandit"); 
             else if(cm.getJobId() == 500)
                cm.sendSimple("\t\t\t\t\t\t\t\t\t\t#r#eJob Advancer#n#k\r\nPlease pick the class of your choosing! #b\r\n#L0#Brawler\r\n#L1#Gunslinger"); 	
			 else {
			   if(cm.getJobId() != 900) 
				cm.changeJobById(cm.getJobId() + 10);
			   else
				cm.sendOk("\t\t\t\t\t\t\t\t\t\t#r#eJob Advancer#n#k\r\nGms cannot job advance.");   
				cm.dispose();
			 }
			  status = 2;
		}
		else if((cm.getJobId() % 100 == 10 || cm.getJobId() % 100 == 20 || cm.getJobId() % 100 == 30) && cm.getLevel() >= 70){
			if(cm.getJobId() == 910){
				cm.sendOk("\t\t\t\t\t\t\t\t\t\t#r#eJob Advancer#n#k\r\nGms cannot job advance.");
				cm.dispose();
			}
			else{
			 cm.changeJobById(cm.getJobId() + 1);	
             cm.dispose();	
			}			 
		}
		else if((cm.getJobId() % 100 == 11 || cm.getJobId() % 100 == 21 || cm.getJobId() % 100 == 31) && cm.getLevel() >= 120){
			 if(cm.getJobId() < 1000 || cm.getJobId() > 2000)
			  cm.changeJobById(cm.getJobId() + 1);
		  
			 cm.dispose();
		}
		else{
			cm.sendOk("You cannot advance at the moment!");
           cm.dispose();	
		}		   
	} 
	else { 	 
		  if(mode < 1){
			  cm.dispose();
		  }
		  else{
			   if (status == 1){
				   if(selection == 0)
					 cm.changeJobById(100);	  
				   else if(selection == 1)
					   cm.changeJobById(200);	
				   else if(selection == 2)
					   cm.changeJobById(300);	
				   else if(selection == 3)
					   cm.changeJobById(400);
                   else if(selection == 4)				   
				      cm.changeJobById(500);
				   else if(selection == 5)				   
				      cm.changeJobById(1100);
				  else if(selection == 6)				   
				      cm.changeJobById(1200);
				  else if(selection == 7)				   
				      cm.changeJobById(1300);
				  else if(selection == 8)				   
				      cm.changeJobById(1400);
				  else if(selection == 9)				   
				      cm.changeJobById(1500);
				  else if(selection == 10)				   
				      cm.changeJobById(2100);
				  else if(selection == 11)
					  cm.changeJobById(900);				  
		 
		 //cm.changeJobById(chosenjob);	
		
		 cm.dispose();
			   }
			   if(status == 2){
				   if(selection == 0)
					 cm.changeJobById(cm.getJobId() + 10);	  
				   else if(selection == 1)
					   cm.changeJobById(cm.getJobId() + 20);	
				   else if(selection == 2)
					   cm.changeJobById(cm.getJobId() + 30);
				 
				
				   cm.dispose();
			   }
      }
  }   
}
