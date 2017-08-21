var status = -1
var info = [
["Introduction", "MapleFlare uses a Patron system, instead of a donor system. It basically works the same way but it just sounds nicer. Donor systems are permanent but MapleFlare's Patron system are counted in days."], 
["Benefits", "Patron has access to additional commands, such as, @psay blahblahblah Idc what commands.\r\nPatrons also get access to @autorebirth."],
["How to get Patron Status", "You'll have to donate a minimum of $15 USD to get your patron status. For every $15 USD you donated, you'll get a month of Patron status."],
["I understand how it works, thanks.", "I hope you understand everything about Patron ! If you don't feel free to come back to me again, Enjoy your Journey throughout MapleFlare !"]
];

function start() {
	var text = "Hello, I can provide all informations about Patron that you need to know about\r\n";
	for (i = 0; i < info.length; i++) {
		text += "#L" + i + "# " + info[i][0] + ".#l\r\n";
	}
	cm.sendSimple(text);
}

function action(mode, type, selection) {
	if (mode != 1) {
		cm.dispose();
		return;
	}
	status ++;
	if (status == 0) {
		cm.sendOk(info[selection][1]);
	}
	cm.dispose();
}