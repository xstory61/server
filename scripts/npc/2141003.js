/**
 *
 * @author Troxied
 * @npc Tut NPC
 */
importPackage(Packages.packet);
var nxAmount = 5000
status = 0, wrong = 0;
serverQuestions = [["What is the name of this server?", 0, "Memory", "MapleHarbor", "Eunoia"], ["What is the MAIN currency of this server?", 1, "Cat Dolls", "Dark Soul Rock", "Snow Flakes"], ["What are the default rates (Exp/Mesos/Drop)?", 1, "1000/700/2", "250/50/2", "1696/1696/6"], ["What is the command to display the commands?", 0, "@commands/@help", "@showme", "@idk"], ["Where are majority of the npcs located?", 2, "Free Market", "@all", "@home"], ["Where is the best place to train for new players?", 1, "@tot <floor number> command (Eos Tower)", "Boot Camp", "Free Market 1-6 Boss Spawner"], ["What is the command to call for a GM?", 2, "@helpme", "@gmcall", "@callgm"], ["Who is the owner of this server?", 0, "Arrow", "Deadpool", "Astro"], ["Who is Memory's Mascot?", 0, "Innocent Memory", "Astro", "Lucky Charm", "Mr.Toasty"]];
// answer = selection # of answer
starterPacks = [[[1302015, 1312039, 1322065, 1402053, 1412035, 1422039, 1432050, 1442071, 1050100, 1072238, 1082223, 1102041], [1452062, 1462056, 1050100, 1072238, 1082223, 1102041], [1372046, 1382062, 1050100, 1072238, 1082223, 1102041], [1332081, 1472077, 1050100, 1072238, 1082223, 1102041], [1482029, 1492030, 1050100, 1072238, 1082223, 1102041]], [[1302015, 1312039, 1322065, 1402053, 1412035, 1422039, 1432050, 1442071, 1051098, 1072238, 1082223, 1102041], [1452062, 1462056, 1051098, 1072238, 1082223, 1102041], [1372046, 1382062, 1051098, 1072238, 1082223, 1102041], [1332081, 1472077, 1051098, 1072238, 1082223, 1102041], 
[1492030, 1051098, 1072238, 1082223, 1102041]]];

var selectedGender;
//2141003
 
function start() {
        action(1, 0, 0);
}
 
function action(mode, type, selection) {
        status++;
        if (mode != 1 || status == (serverQuestions.length + 3)) {
                if (status == (serverQuestions.length + 3)) {
                        cm.gainItem(4031466, ((10 - wrong) * 10));
                        cm.warp(450005100);
                }
                cm.dispose();
                return;
        }
        
        switch (cm.getPlayer().getMapId()) {
                case 450005010:
                        Stage_2(); //mobs rlly stage 3
                        break;
                case 63:
                        Stage_3(selection); //quiz really stage 2 
                        break;
                case 450005100:
                        Stage_4();
                        break;
                case 450000010 :
                        Stage_5(selection);
                        break;
        }
}
function Stage_2() { 
        if (status == 1 && cm.getPlayer().getRebirths() == 0) {
                if (cm.haveItem(4031466, 0)) {
                        cm.sendNext("Hello #h #! Welcome to Memory's Tutorial c:\r\n#ePress Next to Continue >#n");
                } else {
                        //cm.sendOk("Hello #h #! Welcome to Memory's Tutorial stage 1!\r\n\r\n#gStage 1 Task#k: Bring me back 30 Dark Soul Rocks.\r\n\r\n#eYou currently have #c4000252#/30 Dark Soul Rock.#n");
						cm.getPlayer().dropMessage("Use @help if you are confused.");
                        cm.dispose();
                }
        } else if (status == 2 && cm.getPlayer().getRebirths() == 0) {
		        amount = cm.getPlayer().getItemQuantity(4031466, false);
				cm.gainItem(4031466, -(amount - 1)); 
                cm.warp(63);
                cm.getPlayer().dropMessage("In case you didn't know by now, Dark Soul Rock is the MAIN currency of Memory.");
                cm.dispose();
        }
}
 
function Stage_3(selection) {
        if (status == 1 && cm.getPlayer().getRebirths() == 0) {
                cm.sendNext("Welcome to Stage 1 #b#h ##k.\r\nIn this stage I will quiz you on some of the core gameplay features, Good Luck!\r\n\r\n#ePress next to get started#n.");
        } else if (status >= 2 && status < (serverQuestions.length + 2)) {
                if (status > 2) {
                        if (selection != serverQuestions[status - 3][1]) {
                                wrong++;
                        }
                }
                var talk = serverQuestions[status - 2][0] + "#b";
                for (var i = 2; i < serverQuestions[status - 2].length; i++) {
                        talk += "\r\n#L" + (i - 2) + "#" + serverQuestions[status - 2][i] + "#l";
                }
                cm.sendSimple(talk);
        } else if (status == (serverQuestions.length + 2)) {
                var talk = "You got " + (10 - wrong) + " questions right, and thus you earn " + ((10 - wrong) * 10) + " Dark Soul Rocks! Those were the correct answers:";
                for (var i = 0; i < serverQuestions.length; i++) {
                        talk += "\r\nQuestion " + (i + 1) + ": " + serverQuestions[i][(serverQuestions[i][1] + 2)];
                }
                cm.sendNext(talk);
        }
}
function Stage_4() {
	if (status == 1 && cm.getPlayer().getRebirths() == 0) {// old mob id 9300328
		if (cm.haveItem(4032031, 5)) {
		cm.sendNext("#e#bAhh you found my #t4032031#(s), Thank you <3 ! I will now warp you to the final stage!#k");
	} else {
		cm.sendOk("#h #, could you please do me a favour? I've recently lost my #t4032031# if you'll be so kind to help me find my #i4032031# #t4032031##k\r\n#r*Hint* I lost it somewhere around this map.#k");
		cm.dispose();
	}
	} else if (status == 2) {
                cm.gainItem(4032031, -cm.itemQuantity(4032031));
		cm.warp(450000010);
		cm.dispose();
	}
}
function Stage_5(selection) {
	if (status == 1) {
		cm.sendSimple("You have finally made it to Stage 4. In this stage you will select your starter pack.\r\n\r\nWhat gender are you?\r\n\r\n#L0#[Male]#l \r\n#L1#[Female]#l");
	} else if (status == 2) {
		selectedGender = selection;
		cm.sendSimple("Now please select the job of your choice:\r\n#L0#Warrior#l \r\n#L1#Bowman#l \r\n#L2#Magician#l \r\n#L3#Thief#l \r\n#L4#Pirate#l");
	} else if (status == 3) {
		for each(var i in starterPacks[selectedGender][selection]) {
			cm.gainItem(i);
		}
		cm.warp(450002000); //home map
		cm.getPlayer().getCashShop().gainCash(1, nxAmount);
		cm.getPlayer().announce(Packages.tools.MaplePacketCreator.earnTitleMessage("You have earned " + nxAmount + " NX"));
		cm.getPlayer().announce(Packages.tools.MaplePacketCreator.serverNotice(1, "Hey!! please remember that If you're ever stuck and need help, type: @staff/@team to see which gm is online and available. Then use @callgm <Insert message here> to contact them.\r\nAlso If you can't talk to any npc or if they're bugged, type: @dispose.  Before you go, did you know that for every person online, the exp rate goes up by +1!\r\nPlease remember to vote for us every 24 hours for cool rewards!\r\nGood bye <3"));
		cm.getPlayer().announce(Packages.tools.MaplePacketCreator.serverNotice(1, "You have successfully finished the tutorial. Please remember to explore and always have fun."));
		cm.getPlayer().dropMessage("<~~~~~~Welcome 2 Memory!~~~~~~~>");
		cm.getPlayer().dropMessage("You may change your Hairstyle at @styler!");
		cm.getPlayer().dropMessage("You can start out your journey by leveling at @bootcamp!");
		cm.dispose();
	}
}