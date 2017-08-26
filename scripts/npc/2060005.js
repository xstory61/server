/*
Multi-Purpose NPC
Author: Moogra
Fixed by Yiyuan of NakedStory83
 */


var possibleJobs = new Array();


function start() {
    status = -1;
    action(1, 0, 0);

}
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        elsecm.getClient().getPlayer().addEventpoints
            status--;

        if (status==0){
                cm.sendSimple("I am All-in-one NPC. You can also type #r@npcs#k to open me up anywhere! #rNpc that are not on the list will be located in#k #bHenesys#k \r\n\
#L9200000#Job Advance / World Tour\r\n\
#L4#Reset Stats\r\n\
#L9900000#Male Stlying\r\n\
#L9900001#Female Styling\r\n\
#L9000006#Event Point(s) rewards\r\n\
#L9201082#Donation Rewards\r\n\
#L1052010#Zenumist Marble rewards\r\n\
#L1002003#Vote Point(s) rewards\r\n\
#L9010002#Golden Maple Leaf rewards\r\n\
#L9201025#Training Map(Lv 100+) \r\n\
#L9001002#Enter the game room \r\n\
#L1100003#Item creator\r\n\
#L2050015#Buddy slot upgrade");

        }else if (status==1){
            if ( (!(selection == 4))&&(!(selection == 5)) ){
                cm.openNpc(selection);	
            }else if (selection == 4){
                cm.sendSimple("Which stat would you like to reset?\r\n\
#L10#Str\r\n\
#L11#Dex\r\n\
#L12#Intel\r\n\
#L13#Luk\r\n");
            }else if (selection == 5){
                    cm.setEventPoints(0);
                    cm.sendOk("Fixed");
                    cm.dispose();
            }
        }else if (status == 2){
            if (selection == 10){
                var p = cm.c.getPlayer();
                var totAp = p.getRemainingAp() + p.getStr() - 4;
                if (totAp >= 32767){
                        cm.sendOk("Your total stat after reset would have exceeded 32767, thus you cannot reset your stat");
                        cm.dispose();
                }else{
                    p.setStr(4);
                    p.setRemainingAp (totAp);
                    cm.dispose();
                    cm.reloadChar();
                }
            }else if (selection == 11){
                var p = cm.c.getPlayer();
                var totAp = p.getRemainingAp() + p.getDex() - 4;
                if (totAp >= 32767){
                        cm.sendOk("Your total stat after reset would have exceeded 32767, thus you cannot reset your stat");
                        cm.dispose();
                }else{
                    p.setDex(4);
                    p.setRemainingAp (totAp);
                    cm.dispose();
                    cm.reloadChar();
                }
            }else if (selection == 12){
                var p = cm.c.getPlayer();
                var totAp = p.getRemainingAp() + p.getInt() - 4;
                if (totAp >= 32767){
                        cm.sendOk("Your total stat after reset would have exceeded 32767, thus you cannot reset your stat");
                        cm.dispose();
                }else{
                    p.setInt(4);
                    p.setRemainingAp (totAp);
                    cm.dispose();
                    cm.reloadChar();
                }
            }else if (selection == 13){
                var p = cm.c.getPlayer();
                var totAp = p.getRemainingAp() + p.getLuk() - 4;
                if (totAp >= 32767){
                        cm.sendOk("Your total stat after reset would have exceeded 32767, thus you cannot reset your stat");
                        cm.dispose();
                }else{
                    p.setLuk(4);
                    p.setRemainingAp (totAp);
                    cm.dispose();
                    cm.reloadChar();
                }
            }
	}
    }
}