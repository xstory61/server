importPackage(Packages.server.minigames);
importPackage(Packages.server.minigames.solo);
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
		if(cm.getPlayer().getMapId() != 910010300) {
			cm.getPlayer().setGameManager(new GameManager(cm.getPlayer(), 910010300, "pandajump"));
			var score = cm.getPlayer().getGameManager().getDatabase().getUserScore();
			cm.getPlayer().setGameManager(null);
			cm.sendSimple("\t\t\t\t\t\t\t\t\t\t  #e[PandaJump]#n\r\n\t\t\t\t\t\t\t\t\t#d#eDIFFICULTY:#r Normal#n#b\r\n\t\t\t\t\t\t\t\t\t  #L0#Start Game #k#e#n#l\r\n\r\n\t\t\t\t\t\t\t\t\t\t #k Your score: " + (score > 0 ? score : 0));
		} else {
			cm.sendYesNo("Would you like to leave this game?");
			sel = 1;
		}
	} else if (status == 2) {
		if(sel == 0) {			
			cm.getPlayer().setGameManager(new GameManager(cm.getPlayer(), 910010300, "pandajump"));
			cm.getPlayer().getGameManager().createInstancedMap();
			cm.getPlayer().getGameManager().startGame(PandaJump.class, false);
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