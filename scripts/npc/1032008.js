function start() {
    if(cm.haveItem(4031045)){
        var em = cm.getEventManager("Boats");
        cm.sendYesNo("Do you want to go to Orbis?");
    }else{
        cm.sendOk("I aint free hoe, go away!");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("Okay, talk to me if you change your mind!");
	cm.dispose();
	return;
    }
    var em = cm.getEventManager("Boats");
    cm.gainItem(4031045, -1);
	cm.sendOk("Ha scammed you deep shit");
    cm.dispose();
}	