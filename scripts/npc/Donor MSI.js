var status;
var MSI_serverName = "MapleFlare";
////// Requirements: //////

var MSI_statRequired = 32767;
var MSI_individualStatRequirements = true; //overrides above variable.
var MSI_statsRequired = Array(4, 4, 4, 4); //STR DEX INT LUK
var MSI_itemAmounts1 = 10;
var MSI_itemAmounts2 = 10;
var MSI_itemAmounts3 = 10;
var EMS;
var MSI_itemAmounts4 = 10;
var MSI_itemAmounts5 = 10;
var MSI_itemAmounts6 = 10;
var etc_1 = Array(4020000,4020003,4020005);
var etc_2 = Array(4000004,4000000,4000001,4000002,4000003,4000004,4000005,4000006,4000007,4000008,4000009,4000010,4000011,4000012,4000013,4000014,4000015,4000017,4000021,4000029,4000073,4000114,4000117,4000143);
var MSI_itemIds = Array();
var MSI_forbiddenItems = Array(1902007,1902039,1912032,1902018,1902017,1912005,1812003,1812002,1812001,1812000,1802004,1802005,1802006,1802007,1802008,1802009,1802010);
var MSI_statRandomization = false;
var MSI_individualRandomization = false;
var MSI_statMin = 10000;
var MSI_statMax = MSI_statRequired;
var MSI_useWatk = true;
var MSI_useVotePoints = true;
var MSI_forceZeroSlots = false;
var MSI_selectiveForceZeroSlots = true;
var MSI_weaponsForceZero = true;
var MSI_armorForceZero = true;
var MSI_accessoryForceZero = false;
var MSI_signItem = true;
var MSI_addHands = false;
var MSI_hands = 0; //becomes useless if MSI_randomizeHands is set.
var MSI_randomizeHands = false;
var MSI_handsMax = 0; 
var MSI_handsMin = 0; //LOL IDK on numbers for this.
var MSI_addAvoid = false; //Bragging rights since the max avoid is 999.
var MSI_avoid = 32767;
var MSI_randomizeAvoid = false;
var MSI_avoidMax = 32000;
var MSI_avoidMin = 10000;
var MSI_addWepDef = true; //wDef wepDef
var MSI_wepDef = 80;
var MSI_randomizeWepDef = true;
var MSI_wepDefMax = 90;
var MSI_wepDefMin = 80;
var MSI_addMagDef = true; //mDef
var MSI_magDef = 80;
var MSI_randomizeMagDef = truo;
var MSI_magDefMax = 90;
var MSI_magDefMin = 80;
//Do NOT edit
var player_slotsavaiable = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
EMS = cm.getPlayer().getMsiCreated();
var MSI_watkMin = 1200;
var MSI_watkMax = 1200;
var MSI_votePoints = 1000;
    var MSI_itemAmounts = Array(12*EMS,6*EMS,60*(4*EMS+1),60*(4*EMS+1),60*(4*EMS+1),60*(4*EMS+1),60*(4*EMS+1),60*(4*EMS+1),60*(4*EMS+1),60*(4*EMS+1),60*(4*EMS+1),60*(4*EMS+1),60*(4*EMS+1));
    if (mode == 1) {
        status++;
    } else {
        status = -1;
        cm.dispose();
    }

    if (status == 0) {
        var playerMeetsRequirements = true;
        var buffer = "#bAre you here to stare at my pretty face?#k No? I guess you want an Donor MSI then. I'm #r"+MSI_serverName+"'s#b #k Donor Max-Stat-Item NPC!\r\n\r\n#r#eWeapon Attack:#k " + MSI_watkMin + "\r\n\r\nTo get an MSI please meet the following requirements:\r\n\r\n"
        var requirement = 1;
        if (!MSI_individualStatRequirements) {
            buffer += "#b"+requirement+". "+ MSI_statRequired +" AP in all stats ";
            if (cm.getPlayer().getStr() >= MSI_statRequired && cm.getPlayer().getDex() >= MSI_statRequired && cm.getPlayer().getInt() >= MSI_statRequired && cm.getPlayer().getLuk() >= MSI_statRequired) {
                buffer += "#g(Met)\r\n";
            } else {
                buffer += "#r(Not Met)\r\n";
                playerMeetsRequirements = false;
            }
            requirement++
        } else {
            var tmpstat = Array(0,0,0,0);
            //buffer += "#b"+requirement+". "+ MSI_str + "STR "
            tmpstat[0] = cm.getPlayer().getStr();
            tmpstat[1] = cm.getPlayer().getDex();
            tmpstat[2] = cm.getPlayer().getInt();
            tmpstat[3] = cm.getPlayer().getLuk();
            for (i = 0; i < 4 ; i++) {
                if (i == 0) {
                    buffer += "#b"+requirement+". "+MSI_statsRequired[i]+" STR "
                } else if (i == 1) {
                    buffer += "#b"+requirement+". "+MSI_statsRequired[i]+" DEX "
                } else if (i == 2) {
                    buffer += "#b"+requirement+". "+MSI_statsRequired[i]+" INT "
                } else if (i == 3) {
                    buffer += "#b"+requirement+". "+MSI_statsRequired[i]+" LUK "
                } else {
                    buffer += "messup\r\n";
                }
                if (tmpstat[i] >= MSI_statsRequired[i]) {
                    buffer += "#g(You Have:"+tmpstat[i]+")";
                } else {
                    buffer += "#r(You Have:"+tmpstat[i]+")";
                    playerMeetsRequirements = false;
                }
                buffer += "\r\n";
                requirement++
            }
        }
        if (MSI_useVotePoints == 1) {
            var tmpplayerVP = cm.getClient().getPatronCredits();
            buffer += "#b"+requirement+". "+ MSI_votePoints +" Patron Credit";
            if (MSI_votePoints != 1)
                buffer += "s";
            if (tmpplayerVP >= MSI_votePoints ) {
                buffer += " #g(You Have: "+tmpplayerVP+")";
            } else {
                buffer += " #r(You Have: "+tmpplayerVP+")";
                playerMeetsRequirements = false;
            }
            buffer += "\r\n";
            requirement++;
        }
        for (var i = 0; i < MSI_itemIds.length; i++) {
            var tmpitemcheck = cm.getPlayer().getItemQuantity(MSI_itemIds[i], false);
            buffer += "#b"+requirement+". "+MSI_itemAmounts[i]+" #t"+MSI_itemIds[i]+"#";
            if (MSI_itemAmounts[i] > 1)
                buffer += "s ";
            if (tmpitemcheck >= MSI_itemAmounts[i]) {
                buffer += "#g";
            } else {
                buffer += "#r";
                playerMeetsRequirements = false;
            }
            buffer += "#v"+MSI_itemIds[i]+"# (You Have: "+tmpitemcheck+")";
            buffer += "\r\n";
            requirement++;
        }
        if (playerMeetsRequirements) {
            cm.sendNext(buffer);
        } else {
            cm.sendOk(buffer);
            cm.dispose();
        }
    } else if (status == 1) {
        var slotmax = cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getSlotLimit();
        var buffer = "Which Item would you like to turn into an MSI?\r\n";
        for (var i = 0; i < slotmax; i++) {
            var tmpitem = cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getItem(i);
            if (tmpitem != null) {
                var tmpitemstr;
                var tmpitemcnt = 0;
                tmpitemstr = tmpitem.getStr();
                tmpitem = tmpitem.getItemId();
                if (tmpitem != 0) {
                    var isForbidden = false;
                    for (var x = 0; x < MSI_forbiddenItems.length; x++) {
                        if (tmpitem == MSI_forbiddenItems[x])
                            isForbidden = true;
                    }
                    if (MSI_statRandomization) {
                        if (!isForbidden && tmpitemstr < MSI_statMin)
                            buffer += "#L"+i+"##v"+tmpitem+"##l";
                        tmpitemcnt++;
                    } else {
                        if (!isForbidden && tmpitemstr != MSI_statRequired)
                            buffer += "#L"+i+"##v"+tmpitem+"##l";
                        tmpitemcnt++;
                    }
                }
            } else {
                player_slotsavaiable++;
            }
        }
        if (tmpitemcnt > 0) {
            buffer += "\r\n\r\n ";
            cm.sendSimple(buffer);
        } else {
            cm.sendOk("I'm sorry but you have no equipment that meets the requirements. Please try again with a clean piece of equipment that does not have max stats.");
            cm.dispose();
        }
    } else if (status == 2) {
        if (player_slotsavaiable == 0) {
            cm.sendOk("You have 0 item spots available please clear up some inventory space before trying again.");
            cm.dispose();
        } else {
            var itemid = cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getItem(selection).getItemId();
            var buffer = "Click on the item again to turn it into a MSI:\r\n\r\n";
            buffer += "#L" + selection + "##t" + itemid + "# - #v" + itemid + "#";
            cm.sendSimple(buffer);
        }
    } else if (status == 3) {
        var item = cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getItem(selection);
        if (!MSI_statRandomization) {
            var tmpstat = Array(MSI_statRequired,MSI_statRequired,MSI_statRequired,MSI_statRequired);
        } else if (MSI_individualRandomization) {
            var tmpstat = Array(MSI_statMin + Math.floor(Math.random()*(MSI_statMax - MSI_statMin + 1)),MSI_statMin + Math.floor(Math.random()*(MSI_statMax - MSI_statMin + 1)),MSI_statMin + Math.floor(Math.random()*(MSI_statMax - MSI_statMin + 1)),MSI_statMin + Math.floor(Math.random()*(MSI_statMax - MSI_statMin + 1)));
        } else {
            var randomstat = MSI_statMin + Math.floor(Math.random()*(MSI_statMax - MSI_statMin + 1));
            var tmpstat = Array(randomstat,randomstat,randomstat,randomstat);
        }
        cm.getPlayer().setLuk(4);
        cm.getPlayer().setDex(4);
        cm.getPlayer().setStr(4);
        cm.getPlayer().setInt(4);
        item.setStr(tmpstat[0]);
        item.setDex(tmpstat[1]);
        item.setLuk(tmpstat[2]);
        item.setInt(tmpstat[3]);
        if (MSI_useWatk) {
            var tmpwatk = item.getWatk() + MSI_watkMin + Math.floor(Math.random()*(MSI_watkMax - MSI_watkMin + 1));
            item.setWatk(tmpwatk);
        }
        if (MSI_useVotePoints)
            cm.getClient().gainPatronCredits(cm.getClient().getPatronCredits() - MSI_votePoints);
        if (item.getUpgradeSlots()) {
            if (MSI_forceZeroSlots) {
                item.setUpgradeSlots(0);
            }
            if (MSI_selectiveForceZeroSlots) {
                var itemid = item.getItemId();
                if (MSI_weaponsForceZero) {
                    setZeroSlotByItemType(item,itemid,1302000,1702251);
                }
                if (MSI_accessoryForceZero) {
                    setZeroSlotByItemType(item,itemid,1010000,1032075);
                    setZeroSlotByItemType(item,itemid,1122000,1142165);
                    setZeroSlotByItemType(item,itemid,0020000,0021826);
                }
                if (MSI_armorForceZero) {
                    setZeroSlotByItemType(item,itemid,1070000,1072437); // shoes
                    setZeroSlotByItemType(item,itemid,1000000,1003073); // caps
                    setZeroSlotByItemType(item,itemid,1102000,1102236); // capes
                    setZeroSlotByItemType(item,itemid,1040000,1049000); // coats
                    setZeroSlotByItemType(item,itemid,1080000,1082262); // gloves
                    setZeroSlotByItemType(item,itemid,1050000,1052234); // longcoat (?)
                    setZeroSlotByItemType(item,itemid,1060000,1062119); // pants
                    setZeroSlotByItemType(item,itemid,1092000,1092067); // shields
                }
            }
        }
        if (MSI_signItem)
            item.setOwner(cm.getPlayer().getName());
        if (MSI_addHands) {
            if (MSI_randomizeHands) {
                MSI_hands = item.getHands() + MSI_handsMin + Math.floor(Math.random()*(MSI_handsMax - MSI_handsMin + 1))
            }
            item.setHands(MSI_hands);
        }
        if (MSI_addAvoid) {
            if (MSI_randomizeAvoid) {
                MSI_avoid = item.getAvoid() + MSI_avoidMin + Math.floor(Math.random()*(MSI_avoidMax - MSI_avoidMin + 1))
            }
            item.setAvoid(MSI_avoid);
        }
        if (MSI_addWepDef) {
            if (MSI_randomizeWepDef) {
                MSI_wepDef = item.getWdef() + MSI_wepDefMin + Math.floor(Math.random()*(MSI_wepDefMax - MSI_wepDefMin + 1))
            }
            item.setWdef(MSI_wepDef);
        }
        if (MSI_addMagDef) {
            if (MSI_randomizeMagDef) {
                MSI_magDef = item.getMdef() + MSI_magDefMin + Math.floor(Math.random()*(MSI_magDefMax - MSI_magDefMin + 1))
            }
            item.setMdef(MSI_magDef);
        }
        for (i = 0; i < MSI_itemIds.length;i++) {
            cm.gainItem(MSI_itemIds[i],(MSI_itemAmounts[i] * -1));
        }
        cm.sendNext("Congrats on recieving your MSI!");
		cm.getPlayer().addMsiCreated();
		cm.reloadChar();
        cm.dispose();
    } else if (status == 4) {
        cm.reloadChar();
        cm.dispose();
    }
}

function setZeroSlotByItemType(item, id, idmin, idmax) {
    if (idmin <= id && id <= idmax) {
        item.setUpgradeSlots(0);
    }
    return;
}