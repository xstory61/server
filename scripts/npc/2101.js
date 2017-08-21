/*
Scripted by Yz, AAFS's DEVTeam. 2010-2011. All right reserved.
--------------------------------------------------------------
Feel free to re-distribute my work, but remember to give the proper credits. 

Credit to Shawn in Rz
*/

importPackage(Packages.client);

var status = 0;
var chosenItem;
var selected = 1;
var selectedType = -1;
var selectedItem = -1;
var choice;
status = -1;

function start() {
    cm.sendSimple("Hey #b#h ##k. I'm #rInventory Cleaner#k. Well, do you think you need some #bcleaning#k? If yes, I will give u a small #rwarning#k. Once click, your item will be deleted. We won't #rrefund#k your item! So, choose wisely! \r\n#L0#Equip Cleaner#l \r\n#L1#Cash Cleaner#l");
}
function action(mode, type, selection){
    if (mode != 1) {
        cm.dispose();
        return;
    }else{
        status++;
    }
    if (status == 0){
        choice = selection;
        if (choice == 0){
            cm.sendSimple("Well, choose wisely! We won't refund your #rEquip#k if you selected wrong! \r\n\r\n"+cm.EquipList(cm.getClient()));
        }else if (choice == 1){
            cm.sendSimple("PWell, choose wisely! We won't refund your #rCash#k if you selected wrong!  \r\n\r\n"+cm.CashList(cm.getClient()));
        }
    }else if (status == 1){
        /*     not fully sure, but this should work for both since 
            selection will start at 0 regardless of which you chose */
      	selectedType = selection;
		var type = [MapleInventoryType.EQUIP,MapleInventoryType.CASH];
            chosenItem = cm.getPlayer().getInventory(type[choice]).getItem(selection).getItemId();
            cm.gainItem(chosenItem, -1);
            cm.sendOk("Thank you for your garbage!");
            cm.dispose();
    }
}