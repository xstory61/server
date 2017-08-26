function start() {
	if (cm.getPlayer().getRebirths() < 100) {
		cm.sendYesNo("#e<Training Boot Camp>#n\r\nHey! have you heard about the Boot Camp?\r\nIt helps players below 100 Rebirths to level up an become stronger!\r\nWould you like to enter the Boot Camp?");
	} else {
		cm.sendOk("The Boot Camp is only available for players below 100 Rebirths. Please train at the FM rooms 8 - 22.");
		cm.dispose();
	}
}

function action(mode, type, selection) {
	if (mode != 1) {
		cm.dispose();
		return;
	}
	if (cm.getPlayer().getLevel() == 200) {
		cm.sendOk("Rebirth before entering the Boot camp !");
	} else if (cm.getPlayer().getLevel() >= 120) {
		cm.warp(390000300); // Level 120 map.
		cm.sendOk("Please train here till you reach level 200.");
	} else if (cm.getPlayer().getLevel() >= 70) {
		cm.warp(390000200); // level 70 map
		cm.sendOk("Please train here till you reach level 120");
	} else if (cm.getPlayer().getLevel() >= 30) {
		cm.warp(390000100); // Level 30 Map.
		cm.sendOk("Please train here till you reach level 70.");
	} else if (cm.getPlayer().getLevel() <= 29) {
		cm.warp(390000000); // Below level 30 map.
		cm.sendOk("Please train here till you reach level 30.");
	}
	cm.dispose();
}