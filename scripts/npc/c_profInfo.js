var status = -1;
var prevSel = -1;

function start() {
	cm.sendSimple("Would you like to know more about Professions?", ["Tell me more about Miner", "Tell me more about Fisher", "Tell me more about Hunter", "Tell me more about Henehoe", "#e#rReset my current Profession"]);
}

function action(mode, type, selection) {
	if (mode != 1) {
		cm.dispose();
		return;
	}
	status ++;
	if (status == 0) {
		prevSel = selection;
		switch (selection) {
		case 0:
			cm.sendYesNo("Miners are granted with 50% more Ore drops from mobs at @mine.\r\n#eWould you like to become a Miner?");
			break;
		case 1:
			cm.sendYesNo("Fishers are granted with 50% more fish from fishing at @fish.\r\n#eWould you like to become a Fisher?");
			break;
		case 2:
			cm.sendYesNo("Hunters are granted with 50% more drops from all mobs!\r\n#eWould you like to become a Hunter?");
			break;
		case 3:
			cm.sendYesNo("Henehoe's have lesser cool-down on commands such as @bomb.\r\n#eWould you like to become a Henehoe?");
			break;
		case 4:
			if (cm.getPlayer().getProfession().name() == "NONE") {
				cm.sendOk("You do not have a Profession to reset!");
				cm.dispose();
			} else {
				status = 99;
				cm.sendYesNo("Are you sure you want to reset your Profession?\r\nYour current profession is " + cm.getPlayer().getProfession().name() + "\r\n#e#r<It costs 5 Fireflies to reset your Profession>");
			}
			break;
		}
	} else if (status == 1) {
		if (cm.getPlayer().getProfession().name() == "NONE") {
			cm.getPlayer().setProfession(Packages.client.MapleProfessionType.getById(prevSel + 1));
			cm.sendOk("Your perk has been successfully set to " + cm.getPlayer().getProfession().name() + "!");
			cm.dispose();
		} else {
			cm.sendOk("You already have a Profession! Try again after resetting.");
			cm.dispose();
		}
	} else if (status == 100) {
		if (cm.getPlayer().getProfession().name() != "NONE" && cm.haveItem(4009999, 5)) {
			cm.getPlayer().setProfession(Packages.client.MapleProfessionType.getById(0));
			cm.gainItem(4009999, -5);
			cm.sendOk("Your perk has been successfully reset to " + cm.getPlayer().getProfession().name() + "!");
			cm.dispose();
		} else {
			cm.sendOk("You do not have the required amount of Firefly to do this!");
			cm.dispose();
		}
	}
}