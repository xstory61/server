var status = -1;

function start() {
	if (cm.getPlayer().getSmegaPrefix() == "") {
	cm.sendSimple("Hello, I am the Smega Prefix NPC I can set your Smega Prefix to a text you desire for a fee of 5 #i4031466# #t4031466#.\r\n\r\n#L0#I'd like to set my Smega Prefix#l\r\n#L1#I'd like to know what Smega prefix does.#l");
	} else {
	cm.sendSimple("Welcome back ! Would you like to change your smega prefix again?\r\nCurrent Smega Prefix: " + cm.getPlayer().getSmegaPrefix() + ".\r\n\r\n#L0#Yes#l\r\n#L2#No thanks.");
	}
}

function action(mode, type, selection) {
	if (mode != 1) {
		cm.dispose();
		return;
	}
	status++;
	if (status == 0) {
		switch(selection) {
			case 0:
				cm.sendGetText("Please tell me the desired Smega Prefix you want.");
			break;
			case 1:
				cm.sendOk("Smega prefix is basically the medal text when you smega, if you have a smega prefix it will show that text instead of your medal's if you have one.");
				cm.dispose();
			break;
			case 2:
				cm.dispose();
			break;
		}
	} else if (status == 1) {
		if (cm.getText().length() <= 30) {
			 if (cm.haveItem(4031466, 5)) {
				cm.gainItem(4031466, -5);
				cm.getPlayer().setSmegaPrefix(cm.getText());
				cm.sendOk("Your Smega prefix has been set to " + cm.getText() + ". Come back to me if you want to change your smega prefix again !");
			} else {
				cm.sendOk("You do not have enough Dark Soul Rocks.");
			}
		} else {
			cm.sendOk("The Smega Prefix must be 15 characters and below.");
		}	
		cm.dispose();
	}
}