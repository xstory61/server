/*
	Interstellar
*/
/*  Author:			Art
	NPC Name: 		---
	Description: 	Delete Character
*/

var status = 0;
var info;
var text;
var i;
var selectedchar;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, sel) {
    if (mode == -1) cm.dispose();
    else if (mode == 0 && status == 0) cm.dispose();
    if (mode == 1) status++;
    else status--;
    
    if(status == 0)
    {
        i = 0;
        text = "Hello #h #, click on a character you wish to delete! #b \r\n" +
               "#L0##h ##l\r\n";
        if ((cm.getClient().loadCharacters(cm.getClient().getWorld()).size()) > 1){ 
            for (i = 0; i < cm.getClient().loadCharacterNames(cm.getClient().getWorld()).size(); text+= cm.getClient().loadCharacterNames(cm.getClient().getWorld()).get(i).equals(cm.getPlayer().getName()) ? "" : "\r\n#L" + (i + 1) + "#" + cm.getClient().loadCharacterNames(cm.getClient().getWorld()).get(i) + ".", i++);
        }
        cm.sendSimple(text + "\r\n\r\n#e#r#L" + (i + 1) + "#" + "Information#l");
        info = i + 1;    
    }
    else if(status == 1)
    {
        if (sel == info){
            cm.sendOk("#e#b\t\t\t\t\t\t\t\t\t\tInformation#n#k\r\nThe purpose of this NPC is to delete your characters.\r\n\r\n" + 
                      "#e#b\t\t\t\t\t\t\t\t\t\t\tNotice#n#k\r\nWhen you select the option to delete your character, there will be a confirmation notice asking you if you are sure.\r\n\r\n" +
                      "#e#b\t\t\t\t\t\t\t\t\t\t  Warning#n#k\r\nOnce you delete your character it is gone #r#eforever#n#k. We are not responsible for your use of this NPC.");
            
            cm.dispose();
        }
        else
        {
            cm.sendAcceptDecline("Are you a hundred-percent #esure?#n \r\nIf you press accept this character will be deleted and there is no way to recover it!");
            if (sel > 0) selectedCharacter = cm.getClient().loadCharacters(cm.getClient().getWorld()).get(sel - 1);
            info = sel;
        }
    }else if (status == 2)
    {
        if (info == 0)
        {
            cm.deleteChar(cm.getClient().getPlayer().getId());
            cm.getClient().disconnect(false,false);
            cm.dispose();
        }
        else
        {
            cm.deleteChar(selectedCharacter.getId());
            cm.sendOk("Done!");
            cm.dispose();
       }
    }
}
