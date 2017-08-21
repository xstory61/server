/*******************************************************
 *  Author : Troxied                                   * 
 *  Function: Gm Tool to edit players                  *
 *                                                     *
 *                                                     *
 *                                                     */
 
importPackage(Packages.client.inventory);
importPackage(Packages.server); 
importPackage(Packages.constants); 
importPackage(Packages.net); 
importPackage(Packages.tools); 
importPackage(Packages.scripting) 
var cserv, c, p, list, meh, type, slot, lulz, equip, item2; 
var ugh=false; 
//ugh = the boolean used to make sure we don't redeclare the slot of an item you selected 
var nigger; 
//the player selected 
var item; 
//the item selected 
var hah = ["Weapon Attack", "Magic Attack", "Strength", "Dexterity", "Intelligence", "Luck", "", "", "Owner", "", "Quantity", "", "Upgrade slots"]; 
//the array containing all of the names of stats that is called when asking "What do you want to change ____ to" and "___ has been changed to ___" 
var citemid; 
//the item id of the item you wish to create 
var FUCKINGPLAYERS=""; 
//the list of all the players including #L (selections) 
var st=-1; 
//status 
function start() { 
    if (!cm.getPlayer().isGM()){ 
        cm.sendOk("Only GM's may use this"); 
        cm.dispose(); 
        return; 
    } 
    p=cm.getPlayer(); 
    c=p.getClient(); 
    cserv=c.getWorldServer(); 
    meh=1; 
    var playerStr = cserv.getPlayerStorage().getAllPlayerNames(); 
    list=playerStr.split(", "); 
    for (var i=0;i<list.length;i++){ 
        FUCKINGPLAYERS+= "#L"+i+"#"+list[i]+"\r\n"; 
    } 
    cm.sendSimple("Hello #b#h ##k, Who are we going to spy on?\r\n"+FUCKINGPLAYERS+"#l"); 
} 
function action(m,t,s) { 
   if (m < 1) { 
        cm.dispose(); 
        return; 
    } 
    if (st==3 && s<0 && meh==1) 
        st=2; 
    st++; 
    if (st==0) { 
            nigger = c.getWorldServer().getPlayerStorage().getCharacterByName(list[s]);
            
            if (nigger==null) { 
                cm.dispose(); 
            } else 
        cm.sendSimple(nigger.getName()+" is a fellow Memory!\r\nWhat would you like to do?\r\n"+ 
        "#L1#Edit Inventory#l \r\n#L2#Lookup Stats#l"); 
    } else if (st==1){ 
        meh=s; 
        if (meh==1){ 
            cm.sendSimple("What do you want to check?\r\n"+ 
            "#L0#Equips\r\n#L1#Use\r\n#L2#Setup\r\n#L3#ETC\r\n#L4#Cash\r\n#L5#Equipped#l"); 
        } else if (meh==2){ 
           cm.sendOk(nigger.getName()+"'s stats:\r\n"+ "Dex: "+nigger.getDex()+ "\r\nStr: "+nigger.getStr()+"\r\nInt: "+nigger.getInt()+"\r\nLuk: "+nigger.getLuk()+"\r\nLevel: "+nigger.getLevel()+ 
           "\r\nJob: "+nigger.getJob()); 
        } 
    } else if (st==2){ 
        if (meh==1){ 
            type = MapleInventoryType.getByType(s !=5 ? s + 1: -1); 
            if (s==6){ 
                cm.sendGetText("What is the Item ID?"); 
                st=15; 
            } 
            else { 
            var herpaderp=""; 

            for (var i=(type.getType()!=-1?0:-120); i<(type.getType()!=-1?nigger.getInventory(type).getSlotLimit(): 20); i++){ 
                item = nigger.getInventory(type).getItem(i); 
                if (item ==null) 
                    continue; 
                if (type.getType != 3) 
                herpaderp+="#L"+item.getPosition()+"##v"+item.getItemId()+"##l"; 
            else 
                herpaderp+=""+item.getPosition()+"##v"+item.getItemId()+"#"; 
            } 
            if (herpaderp==""){ 
                cm.sendOk("There are no items in this inventory."); 
                cm.dispose(); 
            } 
            else if (s==0||s==5){ 
                cm.sendSimple("Equip list: "+herpaderp); 
            } else { 
                cm.sendSimple("Item list: "+herpaderp); 
            } 
        } 
        } 
    } else if (st ==3){ 
        if (meh==1) { 
            if (!ugh) { 
            slot=s; 
            ugh=true; 
        } 
           item = nigger.getInventory(type).getItem(slot); 
           var isequip= MapleItemInformationProvider.getInstance().isEquip(item.getItemId()); 
           if (!isequip) { 
                cm.sendSimple("#t"+item.getItemId()+"# - #v"+item.getItemId()+"# ("+item.getItemId()+")\r\n"+ 
                "#L10#Quantity: "+item.getQuantity()+ 
                "\r\n#L8#Owner: "+item.getOwner()+ 
                "\r\n\r\n#L6##rApply Changes#l\r\n "+ 
                "\r\n#L7#Send this item to another player.#l"+ 
                "\r\n#L9#Remove Item#l"); 

           } else { 
                item = cm.getEquip(slot, nigger); 
                if (type.getType()==-1){ 
                    item =cm.getEquipped(slot, nigger); 
                } 
                cm.sendSimple("#t"+item.getItemId()+"# - #v"+item.getItemId()+"# ("+item.getItemId()+")\r\n"+ 
                "#L0#Wep Attack: "+item.getWatk()+ 
                "\r\n#L1#Magic Attack: "+item.getMatk()+ 
                "\r\n#L2#Str: "+item.getStr()+ 
                "\r\n#L3#Dex: "+item.getDex()+ 
                "\r\n#L4#Int: "+item.getInt()+ 
                "\r\n#L5#Luk: "+item.getLuk()+
				"\r\n#L12#Upgrade slots:"+ item.getUpgradeSlots() +
                "\r\n#L8#Owner: "+item.getOwner()+ 
                "\r\n\r\n#L6##rApply Changes#l\r\n "+ 
                "#L7#Send this item to another player.#l"+ 
                "\r\n#L9#Remove Item"); 
            } 
        } 
    } else if (st==4) { 
        lulz = s; 
        if (s==9) { 
            MapleInventoryManipulator.removeFromSlot(nigger.getClient(), type, slot, item.getQuantity(), false); 
            p.dropMessage("Item removed successfully."); 
            cm.dispose(); 
            return; 
        } else if (s == 7) {
            cm.sendSimple("Who do you want to send this to?\r\n"+FUCKINGPLAYERS+"#l"); 
        } else if (s != 6) {
            cm.sendGetText("What would you like to change "+hah[s]+" to?"); 
            } else {
                nigger.equipChanged(); 
                nigger.getClient().getSession().write(MaplePacketCreator.getCharInfo(nigger)); 
                nigger.getMap().removePlayer(nigger); 
                nigger.getMap().addPlayer(nigger); 
                cm.dispose(); 
            }
    } else if (st ==5) {
        if (meh ==1) { 
            if (lulz==7) { 
                for (var i = 1; i < ServerConstants.CHANNEL_NUMBER + 1; i++) { 
                var cserv_= ChannelServer.getInstance(i); 
                var ret = cserv_.getPlayerStorage().getCharacterByName(list[s]); 
                if (ret != null) { 
                    nigger = ret; 
                    break; 
                }
            }
            if (nigger==null) {
                cm.dispose(); 
                return; 
            }
            MapleInventoryManipulator.addFromDrop(nigger.getClient(), item.copy(), false);
			p.dropMessage("Item copied and sent.");
			nigger.dropMessage("Item recieved from "+p.getName());
			cm.dispose();
            return;
			}
            var variable = parseInt(cm.getText());
            if ((isNaN(variable) || variable < 0 || variable > 32767) && lulz != 8) {
                cm.sendOk("That is not a legal number."+lulz);
            } else {
                switch(lulz) {
                    case 0: item.setWatk(variable);
					break;
                    case 1: item.setMatk(variable);
					break;
                    case 2: item.setStr(variable);
					break;
                    case 3: item.setDex(variable);
					break;
                    case 4: item.setInt(variable);
					break;
                    case 5: item.setLuk(variable); 
					break;
                    case 8: item.setOwner(cm.getText());
					break;
                    case 10:item.setQuantity(variable); 
					break;
					case 12: item.setUpgradeSlots(variable);
					break;
                    default: cm.dispose(); return; 
                } 
                cm.sendOk(hah[lulz]+" set to "+cm.getText()+"."); 
                st-=2; 
            } 
        }
    } else if (st == 16) {
        var number=parseInt(cm.getText());
        equip = MapleItemInformationProvider.getInstance().isEquip(number);
        citemid = number;
        if (isNaN(number)) {
            cm.sendOk("Not a number.");
            cm.dispose();
            return;
        }
        if (!equip) {
            cm.sendGetText("How many?");
        } else {
            item2= MapleItemInformationProvider.getInstance().getEquipById(citemid);
            if (item2 == null) {
                cm.sendOk("Bad item id.");
                cm.dispose();
                return;
            }
            cm.sendSimple("I don't wanna have to do this, #t"+citemid+"# #v"+citemid+"#\r\n"+
            "#L0#Wep Attack: "+item2.getWatk()+
            "\r\n#L1#Magic Attack: "+item2.getMatk()+
            "\r\n#L2#Str: "+item2.getStr()+
            "\r\n#L3#Dex: "+item2.getDex()+
            "\r\n#L4#Int: "+item2.getInt()+
            "\r\n#L5#Luk: "+item2.getLuk()+
            "\r\n\r\n#L6##rSend Item#l\r\n ");
        }
    } else if (st == 17) {
        if (equip) {
            lulz = s;
            if (s != 6) {
            cm.sendGetText("What would you like to change "+hah[s]+" to?");
        } else {
          MapleInventoryManipulator.addById(nigger.getClient(), citemid, parseInt(cm.getText()));
          c.getSession().write(MaplePacketCreator.getShowItemGain(citemid, parseInt(cm.getText()), true));
          p.dropMessage(parseInt(cm.getText())+" "+citemid+"s have been sent to "+nigger.getName()+" successfully!");
          nigger.dropMessage("You have gained an item from GM "+p.getName());
          cm.dispose();
        }
	}
    } else if (st==18) {
        var variable = parseInt(cm.getText());
            if (isNaN(variable) || variable < 0 || variable > 32767) {
                cm.sendOk("That is not a legal number.");
            } else {
                switch(lulz) {
                    case 0: item2.setWatk(variable); break;
                    case 1: item2.setMatk(variable); break;
                    case 2: item2.setStr(variable); break;
                    case 3: item2.setDex(variable); break;
                    case 4: item2.setInt(variable); break;
                    case 5: item2.setLuk(variable); break;
                    default:
					cm.dispose(); 
					return;
                }
                cm.sendOk(hah[lulz]+" set to "+cm.getText()+".");
                st-=3;
        }
    }
}