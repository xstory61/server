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
		if(cm.getPlayer().getMapId() != 109020001) {
			cm.getPlayer().setGameManager(new GameManager(cm.getPlayer(), 109020001, "tag"));
			var score = cm.getPlayer().getGameManager().getDatabase().getUserScore();
			cm.getPlayer().setGameManager(null);
			cm.sendSimple("\t\t\t\t\t\t\t\t\t\t\t\t #e[Tag]#n\r\n\t\t\t\t\t\t\t\t\t  #d#eDIFFICULTY:#r Easy#n#b\r\n\t\t\t\t\t\t\t\t\t  #L0#Start Game #k#e#n#l");
		} else {
			cm.sendYesNo("Would you like to leave this game?");
			sel = 1;
		}
	} else if (status == 2) {
		if(sel == 0) {			
			if(cm.getPlayer().getParty() != null) {
					if(cm.isLeader()) {
						var party = cm.getPlayer().getParty().getMembers();
						var inMap = cm.partyMembersInMap();
						if(party.size() == 1) {
							if(inMap == party.size()) {
								var map = cm.createInstancedMap(109020001);
								cm.getPlayer().setGameManager(new GameManager(cm.getPlayer(), null, map, "tag"));
								cm.getPlayer().getGameManager().startGame(Tag.class, true);								
							} else {
								cm.sendOk("\t\t\t\t\t\t\t\t\t\t\t\t  #e[Tag]#n\r\n\t\t\t\t\tPlease make sure all members are in the map.");
							}
						} else {
							cm.sendOk("\t\t\t\t\t\t\t\t\t\t\t\t  #e[Tag]#n\r\n\t\t\t\t\tPlease make sure you have 6 in your party.");
						}
					} else {
						cm.sendOk("\t\t\t\t\t\t\t\t\t\t\t\t  #e[Tag]#n\r\n\t\t\t\t\t\tPlease make sure you are the leader.");
					}
				} else {
					cm.sendOk("\t\t\t\t\t\t\t\t\t\t\t\t  #e[Tag]#n\r\n\t\t\t\t\t\t\t\t\tPlease get into a party.");
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