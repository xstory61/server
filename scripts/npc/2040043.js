importPackage(Packages.server.minigames);
importPackage(Packages.server.minigames.solo);
importPackage(Packages.server.minigames.pvp);
var status = 0;
var sel = 0;

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
		if(cm.getPlayer().getMapId() != 101000004) {
			cm.getPlayer().setGameManager(new GameManager(cm.getPlayer(), 101000004, "hitman"));
			var score = cm.getPlayer().getGameManager().getDatabase().getUserScore();
			cm.getPlayer().setGameManager(null);
			cm.sendSimple("\t\t\t\t\t\t\t\t\t\t\t  #e[Hitman]#n\r\n\t\t\t\t\t\t\t\t\t  #d#eDIFFICULTY:#r Hard#n#b\r\n\t\t\t\t\t\t\t\t#L0#Start Game #k#e(Solo)#n#l#b\r\n\t\t\t\t\t\t\t\t#L1#Start Game #k#e(PVP)#n#l\r\n\r\n\t\t\t\t\t\t\t\t\t\t #kYour score: " + (score > 0 ? score : 0));
		} else {
			cm.sendYesNo("Would you like to leave this game?");
			sel = 1;
		}
	} else if (status == 2) {
		if(sel == 0) {			
			if(selection == 0) {
				cm.getPlayer().setGameManager(new GameManager(cm.getPlayer(), 101000004, "hitman"));
				cm.getPlayer().getGameManager().createInstancedMap();
				cm.getPlayer().getGameManager().startGame(Hitman.class, false);
			} else {
				if(cm.getPlayer().getParty() != null) {
					if(cm.isLeader()) {
						var party = cm.getPlayer().getParty().getMembers();
						var inMap = cm.partyMembersInMap(101000004);
						if(party.size() == 2) {
							if(inMap == party.size()) {
								var opponent = cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(party.get(1).getName());
								var map = cm.createInstancedMap();
								cm.getPlayer().setGameManager(new GameManager(cm.getPlayer(), opponent, map, "hitman"));
								cm.getPlayer().getGameManager().startGame(HitmanPVP.class, true);								
							} else {
								cm.sendOk("\t\t\t\t\t\t\t\t\t\t\t  #e[Hitman]#n\r\n\t\t\t\t\tPlease make sure all members are in the map.");
							}
						} else {
							cm.sendOk("\t\t\t\t\t\t\t\t\t\t\t  #e[Hitman]#n\r\n\t\t\t\t\tPlease make sure you have 2 in your party.");
						}
					} else {
						cm.sendOk("\t\t\t\t\t\t\t\t\t\t\t  #e[Hitman]#n\r\n\t\t\t\t\t\tPlease make sure you are the leader.");
					}
				} else {
					cm.sendOk("\t\t\t\t\t\t\t\t\t\t\t  #e[Hitman]#n\r\n\t\t\t\t\t\t\t\t\tPlease get into a party.");
				}
			}
			cm.dispose();
		} else if(sel == 1) {
			if(cm.getPlayer().getGameManager() != null) {
				cm.getPlayer().getGameManager().getCurrentGame().endGame();
				cm.dispose();
				return;
			}
			cm.warp(325090000);
			cm.dispose();
		}
	}
}