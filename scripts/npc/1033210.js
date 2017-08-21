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
/* guild creation npc */
var status = 0;
var sel;
var infinity = "\t\t\t\t\t\t\t\t\t#d#eMapleInfinity#k Guilds#n\r\n";
function start() {
    cm.sendSimple(infinity + "What would you like to do?\r\n#b#L0#Create a Guild#l\r\n#L1#Disband your Guild#l\r\n#L2#Increase your Guild's capacity#l\r\n#L10#Change your Guild's name#l#k");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            sel = selection;
            if (selection == 0) {
                if (cm.getPlayer().getGuildId() > 0) {
                    cm.sendOk(infinity + "You may not create a new Guild while you are in one.");
                    cm.dispose();
                } else
                    cm.sendYesNo(infinity + "Creating a Guild costs #b 1500000 mesos#k, are you sure you want to continue?");
            } else if (selection == 1) {
                if (cm.getPlayer().getGuildId() < 1 || cm.getPlayer().getGuildRank() != 1) {
                    cm.sendOk(infinity + "You can only disband a Guild if you are the leader of that Guild.");
                    cm.dispose();
                } else
                    cm.sendYesNo(infinity + "Are you sure you want to disband your Guild? You will not be able to recover it afterward and all your GP will be gone.");
            } else if (selection == 2) {
                if (cm.getPlayer().getGuildId() < 1 || cm.getPlayer().getGuildRank() != 1) {
                    cm.sendOk(infinity + "You can only increase your Guild's capacity if you are the leader.");
                    cm.dispose();
                } else
                    cm.sendYesNo(infinity + "Increasing your Guild capacity by #b5#k costs #b 500000 mesos#k, are you sure you want to continue?");
            } else if (selection == 10) {
            	if (cm.getPlayer().getGuildId() < 1 || cm.getPlayer().getGuildRank() != 1) {
                    cm.sendOk(infinity + "You can only increase your Guild's name if you are the leader.");
                    cm.dispose();
                    return;
                } else {
                	cm.sendYesNo(infinity + "Changing of Guild name costs #b120 Dark Rock Souls#k, are you sure you want to continue?");
                }
            } 
        } else if (status == 2) {
            if (sel == 0 && cm.getPlayer().getGuildId() <= 0) {
                cm.getPlayer().genericGuildMessage(1);
                cm.dispose();
            } else if (cm.getPlayer().getGuildId() > 0 && cm.getPlayer().getGuildRank() == 1) {
                if (sel == 1) {
                    cm.getPlayer().disbandGuild();
                    cm.dispose();
                } else if (sel == 2) {
                    cm.getPlayer().increaseGuildCapacity();
                    cm.dispose();
                } else if (sel == 10) {
					cm.sendGetText(infinity + "What would you like to change your Guild's name to?\r\n#b<Make sure the name is within 1 to 20 characters>"); 
				}
            }
        } else if (status == 3) {
        	if (sel == 10) {
				if (cm.haveItem(4031466, 120)) {
					if (Packages.net.server.guild.MapleGuild.isGuildNameChangeAcceptable(cm.getText())) {
						cm.gainItem(4031466, -120);
						cm.getPlayer().getGuild().changeName(cm.getText());
						cm.sendOk(infinity + "Your Guild's name has been successfully changed to " + cm.getText());
					} else
						cm.sendOk(infinity + "Invalid guild name! Either the guild name is in use or the name is not within 1 to 20 characters!"); 
				} else
					cm.sendOk(infinity + "You need 120 Dark Soul Rocks to change your guild name."); 
			}
        	cm.dispose();
        }
    }
}
