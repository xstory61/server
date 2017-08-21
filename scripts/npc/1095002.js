/*maps = [["Valley of Heroes", 610020000], ["Breath of Lava", 280020000], ["Ghost Chimney", 682000200], ["Ola Ola", 109030002], ["Fitness Test", 109040000], ["Forest of Patience", 101000100], ["Deep Forest of Patience", 105040310]]; 
var status = 0;
function start() { 
    action(1,0,0); 
} 

function action(m, t, s) { 
    if(status == 0){
		 var talk = "I am the Jump Quest Warper! What Jump Quest will it be?"; 
    for(var j = 0; j < maps.length; j++) 
        talk += "\r\n#L"+j+"#"+maps[j][0]+"#l"; 
    cm.sendSimple(talk);
    status++;	
	//cm.dispose();
    }
    else if(status == 1){ 
	
        cm.getClient().getPlayer().changeMap(maps[s][1]); 
      //  cm.sendOk("Make it to the top for a prize!"); 
      //  cm.getClient().getChannelServer().getWorldInterface().broadcastMessage(null, MaplePacketCreator.serverNotice(6, "#h # has started the Jump Quest!").getBytes()); 
      cm.dispose();
   } 
}  */

var status = 0;
var id = 0;
var msg = "";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }else if (mode == 0){
        cm.dispose();
		return;		
    } else {
		if(mode < 1){
			cm.dispose();
		}
		else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendNext("Hey there! I'm the JQ npc. Please click #r'Next'#k to choose a JQ!");
		} else if (status == 1) {
			cm.sendSimple("Which Jump Quest would you be interested in doing?" +
			"\r\n#L0# Ghost Chimney" +
			"\r\n#L1# Pet-Walking Road" +
			"\r\n#L2# Ludibrium Pet Walkway" +
			"\r\n#L3# Witch Tower 1st Floor V1" +
			"\r\n#L4# MapleStory Physical Fitness Challenge<Level 1>" +
			"\r\n#L8# Rescue Gaga!" +
			"\r\n#L9# Breath of Lava<Level 1>" +
			"\r\n#L10# Breath of Lava<Level 2>" +
			"\r\n#L11# B1<Area 1>" +
			"\r\n#L13# B2<Area 1>" +
			"\r\n#L15# B3<Area 1>" +
			"\r\n#L18# The Forest of Patience<Step 1>" +
			"\r\n#L19# The Forest of Patience<Step 2>" +
			"\r\n#L20# The Forest of Patience<Step 3>" +
			"\r\n#L21# The Forest of Patience<Step 4>" +
			"\r\n#L22# The Forest of Patience<Step 5>" +
			"\r\n#L23# The Deep Forest of Patience<Step 1>" +
			"\r\n#L24# The Deep Forest of Patience<Step 2>" +
			"\r\n#L25# The Deep Forest of Patience<Step 3>" +
			"\r\n#L26# The Deep Forest of Patience<Step 4>" +
			"\r\n#L27# The Deep Forest of Patience<Step 5>" +
			"\r\n#L28# The Deep Forest of Patience<Step 6>" +
			"\r\n#L29# The Deep Forest of Patience<Step 7>" +
			"\r\n#L30# Witch Tower 1st Floor V2" +
			"\r\n#L31# Witch Tower 2nd Floor V1" +			
			"\r\n#L33# Witch Tower 2nd Floor V2" +
			"\r\n#L34# Witch Tower 2nd Floor V3" +
			"\r\n#L35# Witch Tower 2nd Floor V4" +			
			"\r\n#L36# Toy Factory <Sector4>" +
			"\r\n#L37# Valley of Heroes 1" +	
			"\r\n#L38# Valley of Heroes 2" +	
			"\r\n#L39# The Forgotten Darkness");
		} else if (selection == 0) {
			/*cm.warp(682000200);
			//cm.getPlayer().ChimneyTimer();
			cm.getClient().getPlayer().startJQ();
			cm.dispose();	*/
			id = 682000200;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
		} else if (selection == 1) {
		//	cm.warp(100000202);
		//	cm.getPlayer().HenLudiTimer();
		//	cm.dispose();
		id = 100000202;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
		} else if (selection == 2) {
		//	cm.warp(220000006);
		//	cm.getPlayer().HenLudiTimer();
		//	cm.dispose();
			id = 220000006;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
		} else if (selection == 3) {
		//	cm.warp(980044000);
			//cm.getPlayer().CookieTimer();
		//	cm.dispose();
			id = 980044000;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
		} else if (selection == 4) {
		//	cm.warp(109040001);
		//	cm.getPlayer().Fit1Timer();
		//	cm.getPlayer().Fit2Timer();
		//	cm.getPlayer().Fit3Timer();
		//	cm.getPlayer().Fit4Timer();
			cm.dispose();
			id = 109040001;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
		} else if (selection == 8) {
		//	cm.warp(922240000);
		//	cm.getPlayer().GagaTimer();
		//	cm.dispose();
			id = 922240000;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
		} else if (selection == 9) {
		//	cm.warp(280020000);
		//	cm.getPlayer().Zak1Timer();
		//	cm.getPlayer().Zak2Timer();
		//	cm.dispose();
			id = 280020000;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
		} else if (selection == 10) {
		//	cm.warp(280020001);
		//	cm.getPlayer().Zak1Timer();
		//	cm.getPlayer().Zak2Timer();
		//	cm.dispose();
			id = 280020001;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
		} else if (selection == 11) {
		//	cm.warp(103000900);
		//	cm.dispose();
			id = 103000900;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
		} else if (selection == 13) {
		//	cm.warp(103000903);
		//	cm.dispose();
			id = 103000903;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
		} else if (selection == 15) {
		//	cm.warp(103000906);
		//	cm.dispose();
			id = 103000906;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
		} else if (selection == 18) {
		//	cm.warp(101000100);
		//	cm.dispose();
			id = 101000100;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
		} else if (selection == 19) {
		//	cm.warp(101000101);
		//	cm.dispose();
			id = 101000101;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
		} else if (selection == 20) {
		//	cm.warp(101000102);
		//	cm.dispose();
			id = 101000102;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
		} else if (selection == 21) {
		//	cm.warp(101000103);
		//	cm.dispose();
			id = 101000103;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
		} else if (selection == 22) {
		//	cm.warp(101000104);
		//	cm.dispose();
			id = 101000104;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
		} else if (selection == 23) {
		//	cm.warp(105040310);
		//	cm.dispose();
			id = 105040310;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
		} else if (selection == 24) {
		//	cm.warp(105040311);
		//	cm.dispose();
			id = 105040311;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
		} else if (selection == 25) {
		//	cm.warp(105040312);
		//	cm.dispose();
			id = 105040312;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
		} else if (selection == 26) {
		//	cm.warp(105040313);
		//	cm.dispose();
			id = 105040313;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
		} else if (selection == 27) {
		//	cm.warp(105040314);
		//	cm.dispose();
			id = 105040314;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
		} else if (selection == 28) {
		//	cm.warp(105040315);
		//	cm.dispose();
			id = 105040315;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
		} else if (selection == 29) {
		//	cm.warp(105040316);
		//	cm.dispose();
			id = 105040316;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
		} else if (selection == 30) {
		//	cm.warp(980041000);
		//	cm.dispose();
			id = 980041000;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
		} else if (selection == 31) {
		//	cm.warp(980041100);
		//	cm.dispose();
			id = 980041100;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
		} else if (selection == 32) {
		//	cm.warp(980042100);
		//	cm.dispose();
	        id = 980042100;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
		} else if (selection == 34) {
		//	cm.warp(980044100);
		//	cm.dispose();
			id = 980044100;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
		} else if (selection == 35) {
		//	cm.warp(980043100);
		//	cm.dispose();			
			id = 980043100;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
		
		} else if (selection == 36) {
		//	cm.warp(922000000);
		//	cm.dispose();
			id = 922000000;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
        } else if (selection == 37) {	
			id = 610020000;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
        } else if (selection == 38) {	
			id = 610020001;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
        } else if (selection == 39) {	
			id = 922020000;
			msg+= cm.JQrank(id) + "\r\n" + cm.JQpersrank(id) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
        }  
		else if(selection == 100){
			cm.getPlayer().startJQ(id)
			cm.dispose();
		}
		else
		 cm.dispose();
		
		}
    }
}  