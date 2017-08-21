var status = 0;
gms = ["yuffy","rabbit","Kanwar","Roy","danny","Wizet","Iced","xxxx","autist","acorn","clear","lolzer","azn"];
function start() {
 
    action(1, 0, 0);
}

function action(mode, type, selection) {
	if(mode < 1){
		cm.dispose();
	}
	else{
		if(status == 0){
		    var msg = "#r#e ------------------------------------------------------------------------------ #k#n\r\n\t\t\t\t\t\t\t\t\t\t #r#e Bulletin Board\r\n#k#n#r#e ------------------------------------------------------------------------------ #k#n\r\n";
			msg += "\t\t\t#eInfo#n\t\t\t\t\t\t\t\t#eMisc#n\t\t\t\t\t\t\t#eActions#n\r\n";
			cm.sendSimple(msg +"#L0#Staff List#l\t\t\t\t#L5#Gm Commands#l\t\t#L3#Unmute#l\r\n#L2#Server Updates#l\t#L1#Events Won#l\r\n#L4#Forum Events#l");
		    status++;
		} else if(status == 1){
			if(selection == 2){
				var text = cm.getClient().getWorldServer().getBoardInfo();
				cm.sendOk(text);
				cm.dispose();
			}
			else if(selection == 0){
				var staff = cm.getBoardStaff();
				cm.sendSimple(staff);
			    status++;
			}
			else if(selection == 1){
				var event = cm.eventsWon();
				cm.sendOk(event);
				cm.dispose();
			}
			else if(selection == 4){
				var forum = cm.getClient().getWorldServer().getBoardEvents();
				cm.sendOk(forum);
				cm.dispose();
			}
			else if(selection == 5){
				var coms = cm.getClient().getWorldServer().getBoardGm();
				cm.sendOk(coms);
				cm.dispose();
			}
			else if(selection == 3){
				cm.getPlayer().setMuted(false);
				cm.getPlayer().dropMessage(6,"You've been unmuted");
				cm.dispose();
			}
		} else if(status == 2){
			var details = cm.getClient().getWorldServer().getBoardDetails(gms[selection]);
			cm.sendOk(details);
			cm.dispose();
		}			
	}
}