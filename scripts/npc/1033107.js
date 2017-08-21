
var status = 0;
var id = 0;
var msg = "";
var infinity = "\t\t\t\t\t\t\t#r#e MapleInfinity#k Bootcamp#n\r\n";
function start() {
    
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if(status == 0){
		cm.sendNext(infinity + "Hello, I'm the owner of this bootcamp, clicking #e#r'Next'#k#n will send you to the bootcamp map as long as you have below 100 rbs! Have Fun!");
		status++;
	
	}
	else if(status == 1){
		if(mode < 1){
			cm.dispose();
		}
		else{
			if(cm.getPlayer().getRebirths() > 99)
				cm.sendOk(infinity + "You have 100 rbs or above! Therefore, you don't have the privilege to enter my bootcamp!");
			else
				cm.getPlayer().changeMap(130010110);
		}
		cm.dispose();
	}
}  