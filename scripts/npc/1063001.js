var status = 0;
function start() { 
	action(1,0,0);
}

function action(m,t,s) {
	if(m < 1){
		cm.dispose();
	} else if(status == 0){
		cm.sendNext("0 - #fUI/UIWindow.img/QuestIcon/9/0#");
		status++;
	}else if(status == 1){
		cm.sendNext("1 -")
		status++;
	}else if(status == 2){
		cm.sendNext("2 -")
		status++;
	}else if(status == 3){
		cm.sendNext("3 -")
		status++;
	}else if(status == 4){
		cm.sendNext("4 -")
		status++;
	}else if(status == 5){
		cm.sendNext("5 -")
		status++;
	}
	
}