var selections = ["#eManage Perks", "Manage Potential Abilities", "Manage Mounts", "Change Chat Text Color"];
var status = -1;

var cubes = [5062000, 5062001, 5062002]; // , 5062003, 5062005, 5062103
var cubeSel = 0;

var colorSel = 0;

var perk;

function getColor(id) {
	switch (id) {
	case 0:
		return "Default";
	case 1:
		return "White";
	case 2:	
		return "Orange";
	case 3:
		return "Pink";
	case 4:
		return "Purple";
	case 5:
		return "Light Green";
	case 6:
		return "Red";
	case 7:
		return "Blue";
	case 8:
		return "Green";
	case 9:
		return "Yellow";
	}
}

function start() {
	cm.sendSimple("What would you like to do?", 2, selections);
}

function action(mode, type, selection) {
	if (mode != 1) {
		cm.dispose();
		return;
	}
	status ++;
	switch(status) {
	case 0:
		switch(selection) {
		case 0:
			status = 29;
			cm.sendSimple("#ePlease choose a Perk. " + (cm.getPlayer().getPerk().name() != "NONE" ? "\r\nYour current perk is " + cm.getPlayer().getPerk().name() + "." : "") + "\r\n(You may change your Perk anytime for a small fee)", 2, ["EXP Whore", "Drop Whore", "Meso Whore", "NX Whore", (cm.getPlayer().isPatron ? "#d" : "#r") + "Patron Whore", "#rReset to Default Perk#n#k"]);
			break;
		case 1:
			status = 9;
			cm.sendSimple("Here are your current Potential Abilities:#e\r\n" + cm.getPlayer().getPAllStats() + "% All Stats\r\n" + cm.getPlayer().getPAttack() + " Att/M.att#n", 2, ["Re-roll Potential Abilities"]);
			break;
		case 2:
			cm.sendOk("Work-in-Progress", 2);
			cm.dispose();
			//cm.openNpc(9060000);
			break;
		case 3:
			status = 19;
			cm.sendSimple("Your current Chat Text Color is " + getColor(cm.getPlayer().getChatType()) + ".\r\nWould you like to change it to another color?", 2, ["#e#kOrange", "Pink", "Purple", "Light Green", "Red", "Blue", "Green", "#rReset to Default"]); // 2-8
			break;
		}
		break;
	case 10: // Cube Selection
		var selText = "How would you like to reset your Potential Abilities?#e\r\n" + cm.getPlayer().getPAllStats() + "% All Stats\r\n" + cm.getPlayer().getPAttack() + " Att/M.att#n\r\n#b";
		for (var i = 0; i < cubes.length; i ++) {
			selText += "#L" + cubes[i] + "##t" + cubes[i] + "##l\r\n";
		}
		cm.sendSimple(selText, 2);
	case 11: // Cube Details
		cubeSel = selection;
		var detail = "Are you sure you would like to use #t" + cubeSel + "#?\r\n#e";
		if (cubeSel == 5062000) {
			detail += "Has a chance of taking away Potential Abilities.\r\n"
			detail += "Low-Grade Potential Abilities.\r\n"
		} else if (cubeSel == 5062001) {
			detail += "Has a low chance of taking away Potential Abilities.\r\n"
			detail += "Low-Grade Potential Abilities.\r\n"
		} else if (cubeSel == 5062002) {
			detail += "Has a lower chance of taking away Potential Abilities.\r\n"
			detail += "Medium-Grade Potential Abilities.\r\n"
		} else if (cubeSel == 5062003) {
			detail += "Has a lower chance of taking away Potential Abilities.\r\n"
			detail += "???-Grade Potential Abilities.\r\n"
		} else if (cubeSel == 5062005) {
			detail += "Has the lowest chance of taking away Potential Abilities.\r\n"
			detail += "High-Grade Potential Abilities.\r\n"
		} else if (cubeSel == 5062103) {
			detail += "Has the lowest chance of taking away Potential Abilities.\r\n"
			detail += "Legendary-Grade Potential Abilities.\r\n"
		}
		cm.sendYesNo(detail, 2);
	case 12:
		if (!cm.haveItem(cubeSel, 1)) {
			cm.sendOk("You do not have any #t" + cubeSel + "#!", 2);
			cm.dispose();
			return;
		}
		cm.gainItem(cubeSel, -1);
		cm.getPlayer().resetPotential(cubeSel - 5062000);
		status = 9;
		cm.sendSimple("Your Potential Abilities have been re-rolled!#e\r\n" + cm.getPlayer().getPAllStats() + "% All Stats\r\n" + cm.getPlayer().getPAttack() + " Att/M.att#n", 2, ["Re-roll Potential Abilities"]);
	case 20:
		colorSel = selection + 2;
		var text = "";
		if (colorSel != 9)
			text += "Are you sure you would like to switch to " + getColor(colorSel) + ",\r\nFor 12 Legendary Augury?";
		else
			text += "Are you sure you would like to reset your chat color?";
		cm.sendYesNo(text, 2);
		break;
	case 21:
		if (cm.haveItem(4033334, 12) || colorSel == 9) {
			if (colorSel != 9) {
				cm.getPlayer().setChatType(colorSel);
				cm.gainItem(4033334, -12);
			} else {
				cm.getPlayer().setChatType(0);
			}
			cm.sendOk("You have successfully changed your chat color to " + getColor(cm.getPlayer().getChatType()) + "!", 2);
		} else {
			cm.sendOk("You do not have enough Legendary Augury's\r\nto change your chat color!", 2);
		}
		break;
	case 30: // Perk
		perk = Packages.client.MaplePerkType.getById(selection + 1);
		if (perk == null) {
			if (cm.getPlayer().getPerk().name() != "NONE") {
				status = 34;
				cm.sendYesNo("Are you sure you would like to reset your Perk for\r\n5 Fireflies?", 2);
			} else {
				cm.sendOk("You do not have a Perk to reset!", 2);
				cm.dispose();
			}
		} else
			cm.sendYesNo("#e" + perk.name() + " Statistics:\r\n#b\tEXP Rate: " + perk.getExpRate() + "\r\n\tDrop Rate: " + perk.getDropRate() + "\r\n\tMeso Rate: " + perk.getMesoRate() + "\r\n\tNX Rate: " + perk.getNXRate() + "\r\n#rAre you sure you would like to change your Perk to this?" + (perk.requirePatron() ? "(This Perk requires Patron Status)" : ""), 2);
		break;
	case 31:
		if (cm.getPlayer().getPerk().name() != "NONE") {
			cm.sendOk("You already have a Perk! Reset your Perk before changing to a new one!", 2);
		} else {
			if (perk.requirePatron && !cm.getPlayer().isPatron()) {
				cm.sendOk("You need to be a Patron to select this Perk.", 2);
			} else {
				cm.getPlayer().setPerk(perk);
				cm.getPlayer().setRates();
				cm.sendOk("Your Perk has been successfully set to " + perk.name() + "!", 2);
			}
		}
		cm.dispose();
		break;
	case 35: // Reset Perk
		if (cm.haveItem(4009999, 5)) {
			cm.getPlayer().setPerk(Packages.client.MaplePerkType.getById(0));
			cm.gainItem(4009999, -5);
			cm.getPlayer().setRates();
			cm.sendOk("Your Perk has been successfully reset!", 2);
		} else
			cm.sendOk("You do not have enough Fireflies to reset your Perk.", 2);
		
		cm.dispose();
		break;
	default:
		cm.dispose();
	}
}