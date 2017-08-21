function start(arg) {
	if (arg == "force") {
		action(1, 0, 0);
	} else {
		cm.sendNext("Would you like to proceed to the next stage?");
	}
}

function action(mode, type, selection) {
	if (mode != 1) {
		cm.dispose();
		return;
	}
	if ((cm.getPlayer().getLevel() >= 120 && cm.getPlayer().getMapId() < 390000300) || (cm.getPlayer().getLevel() >= 70 && cm.getPlayer().getMapId() < 390000200) || (cm.getPlayer().getLevel() >= 30 && cm.getPlayer().getMapId() < 390000100) && cm.getPlayer().getRebirths() <= 100) {
		cm.warp(cm.getPlayer().getMapId() + 100);
		cm.sendOk("You have passed a stage of Memory's Boot Camp!");
	} else {
		if (cm.getPlayer().getLevel() == 200 || cm.getPlayer().getRebirths() >= 100) {
			cm.warp(910000000, 25);
			cm.sendOk("It looks like you're done here, come back next time!");
		} else
			cm.sendOk("It seems that you haven't reached the target level, talk to me again when you do!");
	}
	cm.dispose();
}