var status = -1;


function start() {
	if (cm.haveItem(4032031, 5)) {
		cm.sendNext("#e#bAhh you found my #t4032031#(s), Thank you <3 !#k");
	} else {
		cm.sendOk("#e#rHello and welcome to Memory!#k But could you do me a favour before starting? I've recently lost my #t4032031# if you'll be so kind to help me find my #i4032031# #t4032031##k\r\n#r*Hint* I lost them somewhere up the slope!#k");
		cm.dispose();
	}
}

function action(mode, type, selection) {
	if (mode != 1) {
		cm.dispose();
		return;
	}
	status ++;
	if (status == 0) {
		cm.sendYesNo("Once again, Welcome to Memory! If you still do not have our WZ Edits, please do change to our WZ files or #e#ryou'll crash#k#n in the next chat.\r\n\r\nWould you like to proceed?");
	} else if (status == 1) {
		cm.sendNext(" Memory,\r\n\r\nLooks like you're good to go! See you soon! I'll now warp you to the Tutorial");
	} else if (status == 2) {
		cm.gainItem(4032031, -cm.itemQuantity(4032031));
		//cm.gainItem(2000005, 400);
		//cm.gainItem(4001434, 5);
		//cm.gainStatItem(1002419, 100, 100, 100, 100, 15, 15);
		cm.levelto(11);
		cm.warp(63);
		cm.worldMessage(cm.getPlayer().getGender() == 0 ? ("[Welcome] " + cm.getPlayer().getName() + " has joined Memory! Let's all welcome him !") : ("[Welcome] " + cm.getPlayer().getName() + " has joined Memory! Let's all welcome her !"));
		cm.sendOk("Good luck on your Adventures!\r\nUse @help to find out the commands!");
		cm.dispose();
	}
}