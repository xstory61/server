/*
               Interstellar
        Author:		Art
	NPC Name: 	Steward
	Description: 	Commands NPC
*/

var status;
var text;
function start()
{
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, sel)
{
    if (mode == -1) cm.dispose();
    else if (mode == 0 && status == 0) cm.dispose();
    if (mode == 1) status++;
    else status--;

    if (status == 0)
    {
        text = "\t\t\t\t\t\t\t\t\t\t#r#eCommands\r\n" +
                "#b#L0#Player Commands #l\r\n";
        if (cm.getPlayer().gmLevel() > 1){
            text += "#L1#Donor Commands#l\r\n";
        }
        if (cm.getPlayer().gmLevel() > 2){
            text += "#L2#Intern Commands#l\r\n";
        }
        if (cm.getPlayer().gmLevel() > 3){
            text += "#L3#GM Commands#l\r\n";
        }
        if (cm.getPlayer().gmLevel() >= 4){
            text += "#L4#Admin Commands#l\r\n";
        }
        text += "#n#k";
        cm.sendSimple(text);
    }
    else if (status == 1){
        if (sel == 0){
            cm.sendOk("#e#b@time#k#n - Shows server time\r\n" +
                      "#e#b@staff#k#n - Shows current staff\r\n" +
                      "#e#b@stats#k#n - Shows your stats\r\n" +
                      "#e#b@chalkboard <message>#k#n - Chalkboard\r\n" +
                      "#e#b@lastrestart#k#n - Shows last restart\r\n" +
                      "#e#b@emo#k#n - Kill yourself\r\n" +
                      "#e#b@dropeq#k#n - Drops all equips\r\n" +
                      "#e#b@randlook#k#n - Randomly equips equip items\r\n" +
                      "#e#b@s <message>#k#n - Broadcast message\r\n" +
                      "#e#b@job#k#n - Opens job NPC\r\n" +
                      "#e#b@shop#k#n - Opens AIO shop NPC\r\n" +
                      "#e#b@aio#k#n - Opens AIO npc\r\n" +
                      "#e#b@spinel#k#n - Opens spinel NPC\r\n" +
                      "#e#b@styler#k#n - Opens styler NPC\r\n" +
                      "#e#b@fm#k#n - Warps to FM\r\n" +
                      "#e#b@expfix#k#n - Fixes EXP\r\n" +
                      "#e#b@maxskills#k#n - Maximize skills\r\n" +
                      "#e#b@rebirth#k#n - Rebirth as beginner\r\n" +
                      "#e#b@rebirthc#k#n - Rebirth as cygnus knight\r\n" +
                      "#e#b@rebirtha#k#n - Rebirth as aran\r\n" +
                      "#e#b@rebirth#k#n - Rebirth\r\n" +
                      "#e#b@home#k#n - Warps to home map\r\n" +
                      "#e#b@str <#>#k#n - Add AP to STR\r\n" +
                      "#e#b@dex <#>#k#n - Add AP to DEX\r\n" +
                      "#e#b@int <#>#k#n - Add AP to INT\r\n" +
                      "#e#b@luk <#>#k#n - Add AP to Luk\r\n" +
                      "#e#b@social#k#n - Shows all social commands\r\n" +
                      "#e#b@save#k#n - saves account\r\n" +
                      "#e#b@whodrops <item name>#k#n - Shows what mobs drop the item\r\n" +
                      "#e#b@dispose#k#n - Dispose the character\r\n" +
                      "#e#b@rates#k#n - Check basic and modified rates\r\n" +
                      "#e#b@online#k#n - Check how many players are online\r\n" +
                      "#e#b@online2#k#n - Check how many players are online in each channel\r\n" +
                      "#e#b@vote#k#n - Check when you can vote again\r\n" +
                      "#e#b@bosshp#k#n - Shows how much hp boss has left\r\n" +
                      "#e#b@ranks#k#n - Opens rank NPC\r\n");
            cm.dispose();
        }
    }
}
