var chairs = [
[3010001, 0],
[3010705, 6],
[3010728, 8],
[3010729, 8],
[3010744, 8],
[3010840, 8],
[3010808, 8],
[3010669, 12],
[3010795, 12],
[3010709, 12],
[3010710, 12],
[3010711, 12],
[3010712, 12],
[3010713, 12],
[3010714, 18],
[3010819, 18],
[3010683, 18],
[3010698, 24],
[3010699, 26],
[3010865, 26],
[3010752, 26],
[3010626, 28],
[3010627, 28],
[3010628, 28],
[3010629, 28],
[3010630, 28],
[3010645, 28],
[3010646, 28],
[3010647, 28],
[3010648, 28],
[3010650, 30],
[3010754, 32],
[3010756, 32],
[3010690, 32],
[3010613, 32],
[3010609, 32],
[3010696, 40],
[3010737, 40],
[3010661, 54],
[3010677, 54],
[3010680, 54],
[3010681, 60],
[3010723, 60]
];

function start() {
	var text = "Hello! I'm the Chair Trader of MapleFlare!\r\nWould you like to purchase my Chairs?\r\n#e";
	for (var i = 0; i < chairs.length; i ++) {
		text += "#L" + i + "##i" + chairs[i][0] + "# #z" + chairs[i][0] + "# for " + chairs[i][1] + " Firefly.#l\r\n";
	}
	cm.sendSimple(text);
}

function action(mode, type, selection) {
	if (mode != 1) {
		cm.dispose();
		return;
	}
	if (cm.haveItem(4009999, chairs[selection][1]) && cm.canHold(chairs[selection][0])) {
		cm.gainItem(4009999, -chairs[selection][1]);
		cm.gainItem(chairs[selection][0]);
		cm.sendOk("Have fun with your new chair!");
	} else {
		cm.sendOk("You do not have enough Firefly for that!");
	}
	cm.dispose();
}