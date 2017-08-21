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
importPackage(Packages.server.minigames);
importPackage(Packages.server.minigames.solo);
var status = 0;

function start() {
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if(mode < 1) {
		cm.dispose();
		return;
	} else {
		status++;
	}
	if(status == 1) {
		cm.sendSimple("Select Game \r\n#L0#Game#l");
	} else if (status == 2) {
		if(cm.getPlayer().getName().equals("danny")) {
			//cm.getPlayer().setGameManager(new GameManager(cm.getPlayer(), 910010300, "pandajump"));
			//cm.getPlayer().setGameManager(new GameManager(cm.getPlayer(), 101000004, "hitman"));
			//cm.getPlayer().setGameManager(new GameManager(cm.getPlayer(), 101000004, "unscramble"));
			//cm.getPlayer().setGameManager(new GameManager(cm.getPlayer(), 302000000, "speedtype"));
			cm.getPlayer().setGameManager(new GameManager(cm.getPlayer(), 103000008, "nti"));
			cm.getPlayer().getGameManager().createInstancedMap();
			cm.getPlayer().getGameManager().startGame(NameTheItem.class, false);
			cm.dispose();
		} else {
			cm.sendOk("Only danny can access this");
			cm.dispose();
		}
	}
}