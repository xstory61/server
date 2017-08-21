var status = 0;

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
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendNext("Welcome to the Jump Quest NPC");
		} else if (status == 1) {
			cm.sendSimple("Which Jump Quest would you be interested in doing?\r\n Any Jump Quest with a * next to it means there are currently no rewards for it yet." +
			"\r\n#L0# Ghost Chimney" +
			"\r\n#L1# Pet-Walking Road" +
			"\r\n#L2# Ludibrium Pet Walkway" +
			"\r\n#L3# Witch Tower 1st Floor" +
			"\r\n#L4# MapleStory Physical Fitness Challenge<Level 1>" +
			"\r\n#L8# **Rescue Gaga!" +
			"\r\n#L9# Breath of Lava<Level 1>" +
			"\r\n#L11# *B1<Area 1>" +
			"\r\n#L13# *B2<Area 1>" +
			"\r\n#L15# *B3<Area 1>" +
			"\r\n#L18# *The Forest of Patience<Step 1>" +
			"\r\n#L19# *The Forest of Patience<Step 2>" +
			"\r\n#L20# *The Forest of Patience<Step 3>" +
			"\r\n#L21# *The Forest of Patience<Step 4>" +
			"\r\n#L22# *The Forest of Patience<Step 5>" +
			"\r\n#L23# *The Deep Forest of Patience<Step 1>" +
			"\r\n#L24# *The Deep Forest of Patience<Step 2>" +
			"\r\n#L25# *The Deep Forest of Patience<Step 3>" +
			"\r\n#L26# *The Deep Forest of Patience<Step 4>" +
			"\r\n#L27# *The Deep Forest of Patience<Step 5>" +
			"\r\n#L28# *The Deep Forest of Patience<Step 6>" +
			"\r\n#L29# *The Deep Forest of Patience<Step 7>" +
			"\r\n#L30# *Toy Factory <Sector4> ");
		} else if (selection == 0) {
			cm.warp(682000200);
			cm.getPlayer().ChimneyTimer();
			cm.dispose();		
		} else if (selection == 1) {
			cm.warp(100000202);
			cm.getPlayer().HenLudiTimer();
			cm.dispose();
		} else if (selection == 2) {
			cm.warp(220000006);
			cm.getPlayer().HenLudiTimer();
			cm.dispose();
		} else if (selection == 3) {
			cm.warp(980044000);
			cm.getPlayer().CookieTimer();
			cm.dispose();
		} else if (selection == 4) {
			cm.warp(109040001);
			cm.getPlayer().Fit1Timer();
			cm.getPlayer().Fit2Timer();
			cm.getPlayer().Fit3Timer();
			cm.getPlayer().Fit4Timer();
			cm.dispose();
		} else if (selection == 8) {
			cm.warp(922240000);
			cm.getPlayer().GagaTimer();
			cm.dispose();
		} else if (selection == 9) {
			cm.warp(280020000);
			cm.getPlayer().Zak1Timer();
			cm.getPlayer().Zak2Timer();
			cm.dispose();
		} else if (selection == 11) {
			cm.warp(103000900);
			cm.dispose();
		} else if (selection == 13) {
			cm.warp(103000903);
			cm.dispose();
		} else if (selection == 15) {
			cm.warp(103000906);
			cm.dispose();
		} else if (selection == 18) {
			cm.warp(101000100);
			cm.dispose();
		} else if (selection == 19) {
			cm.warp(101000101);
			cm.dispose();
		} else if (selection == 20) {
			cm.warp(101000102);
			cm.dispose();
		} else if (selection == 21) {
			cm.warp(101000103);
			cm.dispose();
		} else if (selection == 22) {
			cm.warp(101000104);
			cm.dispose();
		} else if (selection == 23) {
			cm.warp(105040310);
			cm.dispose();
		} else if (selection == 24) {
			cm.warp(105040311);
			cm.dispose();
		} else if (selection == 25) {
			cm.warp(105040312);
			cm.dispose();
		} else if (selection == 26) {
			cm.warp(105040313);
			cm.dispose();
		} else if (selection == 27) {
			cm.warp(105040314);
			cm.dispose();
		} else if (selection == 28) {
			cm.warp(105040315);
			cm.dispose();
		} else if (selection == 29) {
			cm.warp(105040316);
			cm.dispose();	
		} else if (selection == 30) {
			cm.warp(922000000);
			cm.dispose();
			
        }
    }
}  