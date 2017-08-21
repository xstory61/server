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

/*
-- JavaScript -----------------
Lord Jonathan - Nautilus' Port
-- Created By --
Cody/Cyndicate
-- Totally Recreated by Moogra--
-- Function --
No specific function, useless text.
-- GMS LIKE --
*/
var status;
var text = "What would you like to browse?";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else {
		status--;
        if(status < 0)
			cm.dispose();
    }
    if (status == 0) {
        cm.sendNext("Hello #h #. I am the All-in-One seller of #rMapleInfinity#k"); 
    } else if (status == 1) {
        cm.sendSimple("" + text + " \r\n\r\n#L0##e#rMagician#l\r\n#L1#Thief#l\r\n#L2#Warrior#l\r\n#L3#Archer#l\r\n#L4#Pirate#l\r\n#L5#Common#l\r\n#L6#ETC#l");
    } else if (status == 2) {
        if (selection == 0) { // Magician Choices
            cm.sendSimple("" + text + " \r\n\r\n#L0##e#rHats#l\r\n#L1#Overalls#l\r\n#L2#Gloves#l\r\n#L3#Shields#l\r\n#L4#Shoes#k#l\r\n#L5##rWands#l\r\n#L6#Staffs#l");
        } else if (selection == 1) { // Thief Choices
            cm.sendSimple("" + text + " \r\n\r\n#L7##e#bHats#l\r\n#L8#Tops#l\r\n#L9#Bottoms#l\r\n#L10#Overalls#l\r\n#L11#Gloves#l\r\n#L12#Shields#l\r\n#L13#Shoes#l\r\n#L14#Daggers#l\r\n#L15#Claws#l\r\n#L16#Throwing Stars#l");
        } else if (selection == 2) { // Warrior Choices
            cm.sendSimple("" + text + " \r\n\r\n#L17##e#dHats#l\r\n#L18#Warrior Top#l\r\n#L19#Bottom#l\r\n#L20#Overalls#l\r\n#L21#Gloves#l\r\n#L22#Shields#l\r\n#L23#Shoes#l\r\n#L24#One-Handed Axes#l\r\n#L25#Two-Handed Axes#l\r\n#L26#One-Handed BWs#l\r\n#L27#Two-Handed BWs#l\r\n#L28#One-Handed Swords#l\r\n#L29#Two-Handed Swords#l\r\n#L30#Spears#l\r\n#L31#Pole Arms#l");
        } else if (selection == 3) { // Archer Choices
            cm.sendSimple("" + text + " \r\n\r\n#L32##e#gHats#l\r\n#L33#Overalls#l\r\n#L34#Gloves#l\r\n#L35#Shoes#l\r\n#L36#Bows#l\r\n#L37#CrossBows#l\r\n#L38#Arrows#l");
        } else if (selection == 4) { // Pirate Choices
            cm.sendSimple("" + text + " \r\n\r\n#L39##e#bHats#l\r\n#L40#Overalls#l\r\n#L41#Gloves#l\r\n#L42#Shoes#l\r\n#L43#Weapons#l\r\n#L44#Bullets and Capsules#l");
        } else if (selection == 5) { // Common Choices
            cm.sendSimple("" + text + " \r\n\r\n#L45##e#dHats#l\r\n#L46#Earrings#l\r\n#L47#Necklaces and Face Accessories#l\r\n#L48#Capes#l\r\n#L49#Overalls#l\r\n#L50#Gloves#l\r\n#L51#Shields#l\r\n#L52#Shoes#l\r\n#L53#Maple Weapons#l\r\n#L54#Level 0 Weapons#l");
        } else if (selection == 6) { // ETC Choices
            cm.sendSimple("" + text + " \r\n\r\n#L75#Super Megaphones, Gachapon Tickets, Rocks, and Morphs#l\r\n#L76#Boss Pieces#l\r\n#L77#Buffs and Potions#l\r\n#L78#Scrolls#l");
        }
    } else if (status == 3) {
        cm.openShop(5000+selection);
        cm.dispose();
    }
}
