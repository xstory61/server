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

/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Orbis Magic Spot - Orbis Tower <1st Floor>(200082100)
-- By ---------------------------------------------------------------------------------------------
	Unknown
-- Version Info -----------------------------------------------------------------------------------
    1.2 - Now Official method (action(x,0,0) is weak) by Moogra.
	1.1 - Official Text and Method [Information]
	1.0 - First Version by Unknown
---------------------------------------------------------------------------------------------------
**/

menu = ["Snails","Papulatus Clock","Headless Horseman","Black Crow","Anego","Rooster","BigFoot","MushMom"];
mob = [100100,8500001,9400549,9400014,9400121,9600001,9400575,9500124];
hp = [23000000,3500000,35000000,75000000,340,32000000,20000];
exp = [596000,300000,1780000,3900000,33,2660000,1200];
pServ = "Memoryv83";
var status = 0;

function start() { /*
    if (cm.getMap().getMonsters().size() > 0)
        cm.sendOk("Sorry, there are some mobs already spawned. Kill them first.");
        cm.dispose();
    else{
        cm.sendNext("I summon Bosses for #b"+pServ+"#k. I summon 10 monsters at a time for free.");
    } */
	action(1,0,0);
}

function action(m,t,s) {
    if (m > 0)
        status++;
    else{
        cm.dispose();
        return;
    }
    if (status == 1) {
        talk = "Please remember I will summon 10.\r\n\r\n";
        for (var i = 0; i < menu.length; i++)
            talk += "#L"+i+"#"+menu[i]+"#l\r\n";
        cm.sendSimple(talk + "#L8#Cleardrops#l\r\n#L9#Kill All Monsters#l");
		status++;		
    }   	 
	else if (status > 1) {
        if (s == 8) {
            cm.getClient().getPlayer().getMap().clearDrops();
		//	cm.sendNext("s7");
			cm.dispose();
        } else if (s == 9) {
            cm.getClient().getPlayer().getMap().killAllMonsters();
		// cm.sendNext("s8");
			cm.dispose();
        }else{
			// cm.sendNext("s1-6");
			// cm.getClient().getPlayer().getMap().summonMob(mob[s],hp[s],exp[s],10);
			// cm.dispose();
			if(!cm.getClient().getPlayer().getMap().mobsAlive(cm.getClient().getPlayer())){
			 for(var i = 0; i < 10; i++){
			 // cm.getClient().getPlayer().getMap().spawnMonsterOnGroudBelow(MapleLifeFactory.getMonster(mob[s]), cm.getClient().getPlayer().getPosition());
			 cm.spawnMob(mob[s]);
			// cm.sendNext("heya");
			  }
			}
			else{ 
			  cm.sendOk("Please kill all the mobs currently spawned inorder to spawn more!");
			}
		  //  cm.summonMob(mob[s],hp[s],exp[s],10);
		   cm.dispose();
        }
        //cm.dispose();
		}
    }  
  
