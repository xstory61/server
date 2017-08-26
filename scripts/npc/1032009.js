var id = new Array();
var status = 0;
var thing = 0;
var slot;
var p = null;

function start() {
    status = -1;
    cm.sendSimple("Select option\r\n\r\n"
		+ "#L0#Face#l\r\n\r\n"
		+ "#L1#Hair#l");
}


function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 2 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
		
		if (p == null) {
			p = selection;
		}
        
		switch (p) {
			case 0:
				setFace(selection);
				break;
			case 1:
				setHair(selection);
				break;
			default:
				cm.sendOk("This operation is not handled");
				cm.dispose();
				break;
		}
    }
}

function setHair(sel) {
	if (status == 0) {
		cm.sendGetText("#eHey #h #! I can check a hair id for you.  \r\n\r\n#rPlease enter the hair ID:");           
	} else if (status == 1) {
		id[0] = cm.getText();  
		var str = "" + id[0];
		if (str.length == 5/* && str.charAt(4).equals("0")*/) {
			cm.sendStyle("Choose a style!", id);
		} else  {
			cm.getPlayer().dropMessage("The number must be 5 digits long!");
			start(); // restart
		}

	} else if (status == 2) {
		cm.setHair(id[0]);
		cm.getPlayer().dropMessage("Hair ID Tested: " + id[0]);
		cm.dispose();
	} 
}

function setFace(sel) {
	if (status == 0) {
		cm.sendGetText("#eHey #h #! I can check a FACE id for you.  \r\n\r\n#rPlease enter the FACE ID:");           
	} else if (status == 1) {
		id[0] = cm.getText();  
		var str = "" + id[0];
		if (str.length == 5/* && str.charAt(4).equals("0")*/) {
			cm.sendStyle("Choose a style!", id);
		} else  {
			cm.getPlayer().dropMessage("The number must be 5 digits long!");
			start(); // restart
		}

	} else if (status == 2) {
		cm.setFace(id[0]);
		cm.getPlayer().dropMessage("FACE ID Tested: " + id[0]);
		cm.dispose();
	} 
}

