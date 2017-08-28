/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package client.command;

//<editor-fold defaultstate="collapsed" desc="Imports">
import client.MapleBuffStat;
import client.MapleCharacter;
import client.MapleClient;
import client.MapleDisease;
import client.MapleJob;
import client.MapleStat;
import client.Skill;
import client.SkillFactory;
import client.inventory.Equip;
import client.inventory.Item;
import client.inventory.MapleInventory;
import client.inventory.MapleInventoryType;
import client.inventory.MaplePet;
import constants.GameConstants;
import constants.ItemConstants;
import java.awt.Point;
import java.awt.Rectangle;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.InetAddress;
import java.net.URL;
import java.net.UnknownHostException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Properties;
import java.util.Random;
import net.MaplePacketHandler;
import net.PacketProcessor;
import net.server.Server;
import net.server.channel.Channel;
import net.server.world.MapleParty;
import net.server.world.MaplePartyCharacter;
import net.server.world.World;
import provider.MapleData;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;
import provider.MapleDataTool;
import scripting.portal.PortalScriptManager;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.MaplePortal;
import server.MapleShopFactory;
import server.TimerManager;
import server.events.TriviaEvents;
import server.events.gm.MapleEvent;
import server.expeditions.MapleExpedition;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.life.MapleMonsterInformationProvider;
import server.life.MapleNPC;
import server.life.MobSkillFactory;
import server.life.SpawnPoint;
import server.maps.MapleMap;
import server.maps.MapleMapItem;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import server.maps.MapleReactor;
import server.quest.MapleQuest;
import tools.DatabaseConnection;
import tools.FilePrinter;
import tools.HexTool;
import tools.MapleLogger;
import tools.MaplePacketCreator;
import tools.Pair;
import tools.StringUtil;
import tools.data.input.ByteArrayByteStream;
import tools.data.input.GenericSeekableLittleEndianAccessor;
import tools.data.input.SeekableLittleEndianAccessor;
import tools.data.output.MaplePacketLittleEndianWriter;
//</editor-fold>
/**
 *
 * @author Hasharoni
 */
public class GMCommands {
    public static TriviaEvents te = new TriviaEvents();
    private static MapleMonster monster;
    public static boolean executeAdminCommand(Channel cserv, Server srv, MapleClient c, String[] sub){
        MapleCharacter player = c.getPlayer();
        MapleCharacter victim;
        MapleMonster monster;
        if(player.gmLevel() < 4){
            return false;
        }
        String choice = sub[0].substring(1);    
        switch(choice.toLowerCase()) {
            
            //<editor-fold defaultstate="collapsed" desc="servermessage">
            case "servermessage":
                c.getWorldServer().setServerMessage(StringUtil.joinStringFrom(sub, 1));
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="reloadevents">
            case "pnpc":    
                int npcId = Integer.parseInt(sub[1]);
                MapleNPC npc = MapleLifeFactory.getNPC(npcId);
                int xpos = player.getPosition().x;
                int ypos = player.getPosition().y;
                int fh = player.getMap().getFootholds().findBelow(player.getPosition()).getId();
                if (npc != null && !npc.getName().equalsIgnoreCase("MISSINGNO")) {
                    npc.setPosition(player.getPosition());
                    npc.setCy(ypos);
                    npc.setRx0(xpos + 50);
                    npc.setRx1(xpos - 50);
                    npc.setFh(fh);
                    try {
                        Connection con = DatabaseConnection.getConnection();
                        PreparedStatement ps = con.prepareStatement("INSERT INTO spawns ( idd, f, fh, cy, rx0, rx1, type, x, y, mid ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )");
                        ps.setInt(1, npcId);
                        ps.setInt(2, 0);
                        ps.setInt(3, fh);
                        ps.setInt(4, ypos);
                        ps.setInt(5, xpos + 50);
                        ps.setInt(6, xpos - 50);
                        ps.setString(7, "n");
                        ps.setInt(8, xpos);
                        ps.setInt(9, ypos);
                        ps.setInt(10, player.getMapId());
                        ps.executeUpdate();
                    } catch (SQLException e) {
                        player.dropMessage("Failed to save NPC to the database");
                    }
                    player.getMap().addMapObject(npc);
                    player.getMap().broadcastMessage(MaplePacketCreator.spawnNPC(npc));
                } else {
                    player.dropMessage("You have entered an invalid Npc-Id");
                }
                    break;
            case "reloadevents":
                for (Channel ch : Server.getInstance().getAllChannels()) {
                    ch.reloadEventScriptManager();
                }
                player.dropMessage(5, "Reloaded Events");
                break;
            //</editor-fold>                   
            //<editor-fold defaultstate="collapsed" desc="reloaddrops">
            case "reloaddrops":
                MapleMonsterInformationProvider.getInstance().clearDrops();
                player.dropMessage(5, "Reloaded Drops");
                break;
            //</editor-fold>                  
            //<editor-fold defaultstate="collapsed" desc="reloadportals">
            case "reloadportals":
                PortalScriptManager.getInstance().reloadPortalScripts();
                player.dropMessage(5, "Reloaded Portals");
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="strip">
            case "strip":
                victim = c.getWorldServer().getPlayerStorage().getCharacterByName(sub[1]);
                victim.unequipEverything();
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="strip2">
            case "strip2":
                victim = c.getWorldServer().getPlayerStorage().getCharacterByName(sub[1]);
                if (!victim.isGM()) victim.unequipAndDropEverything();
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="stripm">
            case "stripm":
            case "stripmap":
                for (MapleCharacter a1 : player.getMap().getCharacters()) {
                    if (!a1.isGM()) {
                        a1.unequipEverything();
                    }
                }
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="proitem">
            case "proitem":
                if (sub.length < 3) {
                    player.yellowMessage("Syntax: !proitem <itemid> <statvalue>");
                    break;
                }
                int itemid = 0;
                short multiply = 0;
                itemid = Integer.parseInt(sub[1]);
                multiply = Short.parseShort(sub[2]);
                MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                Item it = ii.getEquipById(itemid);
                it.setOwner(player.getName());
                MapleInventoryType type = ii.getInventoryType(itemid);
                if (type.equals(MapleInventoryType.EQUIP)) {
                    hardsetItemStats((Equip) it, multiply);
                    MapleInventoryManipulator.addFromDrop(c, it);
                } else {
                    player.dropMessage("Make sure it's an equippable item.");
                }
                break;
            //</editor-fold>               
            //<editor-fold defaultstate="collapsed" desc="pushed">
            case "pushed":
                player.dropMessage(5,"Sucessful.");
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="seteqstat">
            case "seteqstat":
                if (sub.length < 2) {
                    player.yellowMessage("Syntax: !seteqstat <statvalue>");
                    break;
                }
                int newStat = Integer.parseInt(sub[1]);
                MapleInventory equip = player.getInventory(MapleInventoryType.EQUIP);
                for (byte i = 1; i <= equip.getSlotLimit(); i++) {
                    try {
                        Equip eu = (Equip) equip.getItem(i);
                        if(eu == null) continue;
                        
                        short incval = (short)newStat;
                        eu.setWdef(incval);
                        eu.setAcc(incval);
                        eu.setAvoid(incval);
                        eu.setJump(incval);
                        eu.setMatk(incval);
                        eu.setMdef(incval);
                        eu.setHp(incval);
                        eu.setMp(incval);
                        eu.setSpeed(incval);
                        eu.setWatk(incval);
                        eu.setDex(incval);
                        eu.setInt(incval);
                        eu.setStr(incval);
                        eu.setLuk(incval);
                        
                        byte flag = eu.getFlag();
                        flag |= ItemConstants.UNTRADEABLE;
                        eu.setFlag(flag);
                        
                        player.forceUpdateItem(eu);
                    } catch(Exception e){
                        e.printStackTrace();
                    }
                }
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="exprate">
            case "exprate":
                if (sub.length < 2){
                    player.yellowMessage("Syntax: !exprate <newrate>");
                    break;
                }
                c.getWorldServer().setExpRate(Integer.parseInt(sub[1]));
                c.getWorldServer().broadcastPacket(MaplePacketCreator.serverNotice(6, "[Rate] Exp Rate has been changed to " + sub[1] + "x."));
                break;
            //</editor-fold>               
            //<editor-fold defaultstate="collapsed" desc="mesorate">
            case "mesorate":
                if (sub.length < 2){
                    player.yellowMessage("Syntax: !mesorate <newrate>");
                    break;
                }
                c.getWorldServer().setMesoRate(Integer.parseInt(sub[1]));
                c.getWorldServer().broadcastPacket(MaplePacketCreator.serverNotice(6, "[Rate] Meso Rate has been changed to " + sub[1] + "x."));
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="droprate">
            case "droprate":
                if (sub.length < 2){
                    player.yellowMessage("Syntax: !droprate <newrate>");
                    break;
                }
                c.getWorldServer().setDropRate(Integer.parseInt(sub[1]));
                c.getWorldServer().broadcastPacket(MaplePacketCreator.serverNotice(6, "[Rate] Drop Rate has been changed to " + sub[1] + "x."));
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="bossdroprate">
            case "bossdroprate":
                if (sub.length < 2){
                    player.yellowMessage("Syntax: !bossdroprate <newrate>");
                    break;
                }
                c.getWorldServer().setBossDropRate(Integer.parseInt(sub[1]));
                c.getWorldServer().broadcastPacket(MaplePacketCreator.serverNotice(6, "[Rate] Boss Drop Rate has been changed to " + sub[1] + "x."));
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="forcevac">
            case "forcevac":
                List<MapleMapObject> items = player.getMap().getMapObjectsInRange(player.getPosition(), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.ITEM));
                for (MapleMapObject item : items) {
                    MapleMapItem mapItem = (MapleMapItem) item;
                    if (mapItem.getMeso() > 0) {
                        player.gainMeso(mapItem.getMeso(), true);
                    } else if(mapItem.getItemId() == 4031865 || mapItem.getItemId() == 4031866) {
                        // Add NX to account, show effect and make item disappear
                        player.getCashShop().gainCash(1, mapItem.getItemId() == 4031865 ? 100 : 250);
                    } else if (mapItem.getItem().getItemId() >= 5000000 && mapItem.getItem().getItemId() <= 5000100) {
                        int petId = MaplePet.createPet(mapItem.getItem().getItemId());
                        if (petId == -1) {
                            continue;
                        }
                        MapleInventoryManipulator.addById(c, mapItem.getItem().getItemId(), mapItem.getItem().getQuantity(), null, petId);
                    } else {
                        MapleInventoryManipulator.addFromDrop(c, mapItem.getItem(), true);
                    }
                    player.getMap().pickItemDrop(MaplePacketCreator.removeItemFromMap(mapItem.getObjectId(), 2, player.getId()), mapItem);
                }
                break;
                //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="zakum">
            case "zakum":
                player.getMap().spawnFakeMonsterOnGroundBelow(MapleLifeFactory.getMonster(8800000), player.getPosition());
                for (int x = 8800003; x < 8800011; x++) {
                    player.getMap().spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(x), player.getPosition());
                }
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="horntail">
            case "horntail":
                final Point targetPoint = player.getPosition();
                final MapleMap targetMap = player.getMap();
                targetMap.spawnHorntailOnGroundBelow(targetPoint);
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="pinkbean">
            case "pinkbean":
                player.getMap().spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(8820001), player.getPosition());
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="pap">
            case "pap":
                player.getMap().spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(8500001), player.getPosition());
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="pianus">
            case "pianus":
                player.getMap().spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(8510000), player.getPosition());
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="playernpc">
            case "playernpc":
                if (sub.length < 3){
                    player.yellowMessage("Syntax: !playernpc <playername> <npcid>");
                    break;
                }
                player.playerNPC(c.getChannelServer().getPlayerStorage().getCharacterByName(sub[1]), Integer.parseInt(sub[2]));
                break;
            //</editor-fold>               
            //<editor-fold defaultstate="collapsed" desc="debugmonster">
            case "debugmonster":
                
                List<MapleMapObject> monsters = player.getMap().getMapObjectsInRange(player.getPosition(), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.MONSTER));
                for (MapleMapObject monstermo : monsters) {
                    monster = (MapleMonster) monstermo;
                    player.message("Monster ID: " + monster.getId() + " Aggro target: " + ((monster.getController() != null) ? monster.getController().getName() : "<none>"));
                }
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="debugpacket">
            case "debugpacket":
                player.getMap().broadcastMessage(MaplePacketCreator.customPacket(StringUtil.joinStringFrom(sub, 1)));
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="debugnearestportal">
            case "debugnearestportal":
                MaplePortal portal = player.getMap().findClosestPortal(player.getPosition());
                if(portal != null) player.dropMessage(6, "Closest portal: " + portal.getId() + " '" + portal.getName() + "' Type: " + portal.getType() + " --> toMap: " + portal.getTargetMapId() + " scriptname: '" + portal.getScriptName() + "' state: " + portal.getPortalState() + ".");
                else player.dropMessage(6, "There is no portal on this map.");
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="debugnearestspawnpoint">
            case "debugnearestspawnpoint":
                SpawnPoint sp = player.getMap().findClosestSpawnpoint(player.getPosition());
                if(sp != null) player.dropMessage(6, "Closest mob spawn point: " + " Position: x " + sp.getPosition().getX() + " y " + sp.getPosition().getY() + " Spawns mobid: '" + sp.getMonsterId() + "' --> canSpawn: " + !sp.getDenySpawn() + " canSpawnRightNow: " + sp.shouldSpawn() + ".");
                else player.dropMessage(6, "There is no mob spawn point on this map.");
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="debugpos">
            case "debugpos":
                player.dropMessage(6, "Current map position: (" + player.getPosition().getX() + ", " + player.getPosition().getY() + ").");
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="debugmap">
            case "debugmap":
                player.dropMessage(6, "Current map id " + player.getMap().getId() + ", event: '" + ((player.getMap().getEventInstance() != null) ? player.getMap().getEventInstance().getName() : "null") + "'; Players: " + player.getMap().getAllPlayers().size() + ", Mobs: " + player.getMap().countMonsters() + ", Reactors: " + player.getMap().countReactors() + ", Items: " + player.getMap().countItems() + ", Objects: " + player.getMap().getMapObjects().size() + ".");
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="debugmobsp">
            case "debugmobsp":
                player.getMap().reportMonsterSpawnPoints(player);
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="debugevent">
            case "debugevent":
                if(player.getEventInstance() == null) player.dropMessage(6, "Player currently not in an event.");
                else player.dropMessage(6, "Current event name: " + player.getEventInstance().getName() + ".");
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="debugareas">
            case "debugareas":
                player.dropMessage(6, "Configured areas on map " + player.getMapId() + ":");
                byte index = 0;
                for(Rectangle rect: player.getMap().getAreas()) {
                    player.dropMessage(6, "Id: " + index + " -> posX: " + rect.getX() + " posY: '" + rect.getY() + "' dX: " + rect.getWidth() + " dY: " + rect.getHeight() + ".");
                    index++;
                }
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="debugreactors">
            case "debugreactors":
                player.dropMessage(6, "Current reactor states on map " + player.getMapId() + ":");
                for(MapleMapObject mmo: player.getMap().getReactors()) {
                    MapleReactor mr = (MapleReactor) mmo;
                    player.dropMessage(6, "Id: " + mr.getId() + " Oid: " + mr.getObjectId() + " name: '" + mr.getName() + "' -> Type: " + mr.getReactorType() + " State: " + mr.getState() + " Event State: " + mr.getEventState() + " Position: x " + mr.getPosition().getX() + " y " + mr.getPosition().getY() + ".");
                }
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="debugservercoupons">
            case "debugservercoupons":
            case "debugcoupons":
                String s = "Currently active SERVER coupons: ";
                for(Integer i : Server.getInstance().getActiveCoupons()) {
                    s += (i + " ");
                }
                player.dropMessage(6, s);
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="debugplayercoupons">
            case "debugplayercoupons":
                String st = "Currently active PLAYER coupons: ";
                for(Integer i : player.getActiveCoupons()) {
                    st += (i + " ");
                }
                player.dropMessage(6, st);
                break;
//</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="debugtimer">
            case "debugtimer":
                TimerManager tMan = TimerManager.getInstance();
                player.dropMessage(6, "Total Task: " + tMan.getTaskCount() + " Current Task: " + tMan.getQueuedTasks() + " Active Task: " + tMan.getActiveCount() + " Completed Task: " + tMan.getCompletedTaskCount());
                break;
            //</editor-fold>        
            //<editor-fold defaultstate="collapsed" desc="dcall">
            case "dcall":
                for (World world : Server.getInstance().getWorlds()) {
                    for (MapleCharacter chr : world.getPlayerStorage().getAllCharacters()) {
                        if (!chr.isGM()) {
                            chr.getClient().disconnect(false, false);
                        }
                    }
                }
                player.message("All players successfully disconnected.");
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="mapplayers">
            case "mapplayers":
                String names = "";
                int map = player.getMapId();
                for (World world : Server.getInstance().getWorlds()) {
                    for (MapleCharacter chr : world.getPlayerStorage().getAllCharacters()) {
                        int curMap = chr.getMapId();
                        String hp = Integer.toString(chr.getHp());
                        String maxhp = Integer.toString(chr.getMaxHp());
                        String name = chr.getName() + ": " + hp + "/" + maxhp;
                        if (map == curMap) {
                            names = names.equals("") ? name : (names + ", " + name);
                        }
                    }
                }
                player.message("These b lurkin: " + names);
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="getacc">
            case "getacc":
                if (sub.length < 2){
                    player.yellowMessage("Syntax: !getacc <playername>");
                    break;
                }
                victim = c.getChannelServer().getPlayerStorage().getCharacterByName(sub[1]);
                player.message(victim.getName() + "'s account name is " + victim.getClient().getAccountName() + ".");
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="shutdown">
            case "shutdown":
            case "shutdownnow":
                int time = 60000;
                if (sub[0].equals("shutdownnow")) {
                    time = 1;
                } else if (sub.length > 1) {
                    time *= Integer.parseInt(sub[1]);
                }
                if(time > 1) {
                    int seconds = (int) (time / 1000) % 60 ;
                    int minutes = (int) ((time / (1000*60)) % 60);
                    int hours   = (int) ((time / (1000*60*60)) % 24);
                    int days    = (int) ((time / (1000*60*60*24)));
                    
                    String strTime = "";
                    if(days > 0) strTime += days + " days, ";
                    if(hours > 0) strTime += hours + " hours, ";
                    strTime += minutes + " minutes, ";
                    strTime += seconds + " seconds";
                    
                    for(World w : Server.getInstance().getWorlds()) {
                        for(MapleCharacter chr: w.getPlayerStorage().getAllCharacters()) {
                            chr.dropMessage("Server is undergoing maintenance process, and will be shutdown in " + strTime + ". Prepare yourself to quit safely in the mean time.");
                        }
                    }
                }
                TimerManager.getInstance().schedule(Server.getInstance().shutdown(false), time);
                break;
                //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="clearquestcache">
            case "clearquestcache":
                MapleQuest.clearCache();
                player.dropMessage(5, "Quest Cache Cleared.");
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="clearquest">
            case "clearquest":
                if(sub.length < 1) {
                    player.dropMessage(5, "Please include a quest ID.");
                    break;
                }
                MapleQuest.clearCache(Integer.parseInt(sub[1]));
                player.dropMessage(5, "Quest Cache for quest " + sub[1] + " cleared.");
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="warpworld">
            case "warpworld":
                if (sub.length < 2){
                    player.yellowMessage("Syntax: !warpworld <worldid>");
                    break;
                }
                Server server = Server.getInstance();
                byte worldb = Byte.parseByte(sub[1]);
                if (worldb <= (server.getWorlds().size() - 1)) {
                    try {
                        String[] socket = server.getIP(worldb, c.getChannel()).split(":");
                        c.getWorldServer().removePlayer(player);
                        player.getMap().removePlayer(player);//LOL FORGOT THIS ><
                        c.updateLoginState(MapleClient.LOGIN_SERVER_TRANSITION);
                        player.setWorld(worldb);
                        player.saveToDB();//To set the new world :O (true because else 2 player instances are created, one in both worlds)
                        c.announce(MaplePacketCreator.getChannelChange(InetAddress.getByName(socket[0]), Integer.parseInt(socket[1])));
                    } catch (UnknownHostException | NumberFormatException ex) {
                        ex.printStackTrace();
                        player.message("Error when trying to change worlds, are you sure the world you are trying to warp to has the same amount of channels?");
                    }
                } else {
                    player.message("Invalid world; highest number available: " + (server.getWorlds().size() - 1));
                }
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="pnotice">
            case "pnotice":
                if (sub.length < 2){
                    player.yellowMessage("Syntax: !pnotice <message> ");
                    break;
                }
                Server.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(1, StringUtil.joinStringFrom(sub, 1)));
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="deleteitem">
            case "deleteitem":
                int ditemid = Integer.parseInt(sub[1]);
                for (Item item : c.getPlayer().getInventory(MapleInventoryType.EQUIP)) {
                    if (item.getItemId() == ditemid) {
                        MapleInventoryManipulator.removeById(c, MapleInventoryType.EQUIP, ditemid, ditemid, false, false);
                    }
                }
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="dropinv">
            case "dropinv":
                if (sub.length > 2) {
                    victim = c.getWorldServer().getPlayerStorage().getCharacterByName(sub[1]);
                    if (victim != null) {
                        if (sub[2].equals("equip")) {
                            for (int i = 0; i < victim.getInventory(MapleInventoryType.EQUIP).getSlotLimit() + 1; i++) {
                                MapleInventoryManipulator.drop(victim.getClient(), MapleInventoryType.EQUIP, (short) i, (short) 1);
                            }
                        } else if (sub[2].equals("use")) {
                            for (int i = 0; i < victim.getInventory(MapleInventoryType.USE).getSlotLimit() + 1; i++) {
                                if (victim.getInventory(MapleInventoryType.USE).getItem((short) i) != null) {
                                    MapleInventoryManipulator.drop(victim.getClient(), MapleInventoryType.USE, (short) i, (short) victim.getInventory(MapleInventoryType.USE).getItem((short) i).getQuantity());
                                }
                            }
                            
                        } else if (sub[2].equals("setup")) {
                            for (int i = 0; i < victim.getInventory(MapleInventoryType.SETUP).getSlotLimit() + 1; i++) {
                                if (victim.getInventory(MapleInventoryType.SETUP).getItem((short) i) != null) {
                                    MapleInventoryManipulator.drop(victim.getClient(), MapleInventoryType.SETUP, (short) i, (short) victim.getInventory(MapleInventoryType.SETUP).getItem((short) i).getQuantity());
                                }
                            }
                        } else if (sub[2].equals("etc")) {
                            for (int i = 0; i < victim.getInventory(MapleInventoryType.ETC).getSlotLimit() + 1; i++) {
                                if (victim.getInventory(MapleInventoryType.ETC).getItem((short) i) != null) {
                                    MapleInventoryManipulator.drop(victim.getClient(), MapleInventoryType.ETC, (short) i, (short) victim.getInventory(MapleInventoryType.ETC).getItem((short) i).getQuantity());
                                }
                            }
                        } else if (sub[2].equals("cash")) {
                            for (int i = 0; i < victim.getInventory(MapleInventoryType.CASH).getSlotLimit() + 1; i++) {
                                if (victim.getInventory(MapleInventoryType.CASH).getItem((short) i) != null) {
                                    MapleInventoryManipulator.drop(victim.getClient(), MapleInventoryType.CASH, (short) i, (short) victim.getInventory(MapleInventoryType.CASH).getItem((short) i).getQuantity());
                                }
                            }
                        } else {
                            player.dropMessage(5, "There are 5 types: equip,use,setup,etc and cash.");
                        }
                        
                    } else {
                        player.dropMessage(5, "Error. No such player exists in this map!");
                    }
                } else {
                    player.dropMessage(5, "Error. Type the command as follows !dropinv <player> <type>.");
                }
                break;
                //</editor-fold>
        default:
            return false;
        }
        return true;     
    }
    public static boolean executeGMCommand(Channel cserv, Server srv, MapleClient c, String[] sub){
        MapleCharacter player = c.getPlayer();
        MapleCharacter victim;
        if(player.gmLevel() < 3){
            return false;
        }
        String choice = sub[0].substring(1);  
        switch(choice.toLowerCase()) {   
            //<editor-fold defaultstate="collapsed" desc="mob">
            case "mob":
            
                if (sub.length < 2) {
                    player.yellowMessage("Syntax: !spawn <mobid> <amount> / !spawn <mobid> <amount> hp <hp amount>");
                    break;
                }
                MapleMonster monster = MapleLifeFactory.getMonster(Integer.parseInt(sub[1]));
                if (monster == null) {
                    break;
                }
                if (sub.length > 3) {
                    if ("hp".equals(sub[3])) monster.setHp(Integer.parseInt(sub[4]));
                    for (int i = 0; i < Integer.parseInt(sub[2]); i++)
                        player.getMap().spawnMonsterOnGroundBelow(monster, player.getPosition());  
                } else {
                    player.getMap().spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(Integer.parseInt(sub[1])), player.getPosition());
                }
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="itemvac">
            case "itemvac":
                List<MapleMapObject> list = player.getMap().getMapObjectsInRange(player.getPosition(), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.ITEM));
                for (MapleMapObject item : list) {
                    player.pickupItem(item);
                }
                break;
            //</editor-fold>                   
            //<editor-fold defaultstate="collapsed" desc="checkdmg">
            case "checkdmg":
                victim = c.getWorldServer().getPlayerStorage().getCharacterByName(sub[1]);
                int maxBase = victim.calculateMaxBaseDamage(victim.getTotalWatk());
                Integer watkBuff = victim.getBuffedValue(MapleBuffStat.WATK);
                Integer matkBuff = victim.getBuffedValue(MapleBuffStat.MATK);
                Integer blessing = victim.getSkillLevel(10000000 * player.getJobType() + 12);
                if(watkBuff == null) watkBuff = 0;
                if(matkBuff == null) matkBuff = 0;
                
                player.dropMessage(5, "Cur Str: " + victim.getTotalStr() + " Cur Dex: " + victim.getTotalDex() + " Cur Int: " + victim.getTotalInt() + " Cur Luk: " + victim.getTotalLuk());
                player.dropMessage(5, "Cur WATK: " + victim.getTotalWatk() + " Cur MATK: " + victim.getTotalMagic());
                player.dropMessage(5, "Cur WATK Buff: " + watkBuff + " Cur MATK Buff: " + matkBuff + " Cur Blessing Level: " + blessing);
                player.dropMessage(5, victim.getName() + "'s maximum base damage (before skills) is " + maxBase);
                break;
            //</editor-fold>                   
            //<editor-fold defaultstate="collapsed" desc="inmap">
            case "inmap":
                String st = "";
                for (MapleCharacter chr : player.getMap().getCharacters()) {
                    st += chr.getName() + " ";
                }
                player.message(st);
                break;
            //</editor-fold>                        
            //<editor-fold defaultstate="collapsed" desc="hpmp">
            case "hpmp":
                victim = player;
                int statUpdate = 1;
                if (sub.length >= 3) {
                    victim = c.getWorldServer().getPlayerStorage().getCharacterByName(sub[1]);
                    statUpdate = Integer.valueOf(sub[2]);
                } else if(sub.length == 2) {
                    statUpdate = Integer.valueOf(sub[1]);
                } else {
                    player.yellowMessage("Syntax: !sethpmp [<playername>] <value>");
                }
                victim.setHp(statUpdate);
                victim.setMp(statUpdate);
                victim.updateSingleStat(MapleStat.HP, statUpdate);
                victim.updateSingleStat(MapleStat.MP, statUpdate);
                victim.checkBerserk(victim.isHidden());
                break;
            //</editor-fold>               
            //<editor-fold defaultstate="collapsed" desc="monitor">
            case "monitor":
                if (sub.length < 1){
                    player.yellowMessage("Syntax: !monitor <ign>");
                    break;
                }
                victim = c.getWorldServer().getPlayerStorage().getCharacterByName(sub[1]);
                if (victim == null){
                    player.yellowMessage("Player not found!");
                    break;
                }
                boolean monitored = MapleLogger.monitored.contains(victim.getName());
                if (monitored){
                    MapleLogger.monitored.remove(victim.getName());
                } else {
                    MapleLogger.monitored.add(victim.getName());
                }
                player.yellowMessage(victim.getName() + " is " + (!monitored ? "now being monitored." : "no longer being monitored."));
                String message = player.getName() + (!monitored ? " has started monitoring " : " has stopped monitoring ") + victim.getName() + ".";
                Server.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(5, message));
                break;
            //</editor-fold>                   
            //<editor-fold defaultstate="collapsed" desc="monitors">
            case "monitors":
                for (String ign : MapleLogger.monitored){
                    player.yellowMessage(ign + " is being monitored.");
                }
                break;
            //</editor-fold>                    
            //<editor-fold defaultstate="collapsed" desc="ignore">
            case "ignore":
                if (sub.length < 1){
                    player.yellowMessage("Syntax: !ignore <ign>");
                    break;
                }
                victim = c.getWorldServer().getPlayerStorage().getCharacterByName(sub[1]);
                if (victim == null){
                    player.yellowMessage("Player not found!");
                    break;
                }
                boolean monitored_ = MapleLogger.ignored.contains(victim.getName());
                if (monitored_){
                    MapleLogger.ignored.remove(victim.getName());
                } else {
                    MapleLogger.ignored.add(victim.getName());
                }
                player.yellowMessage(victim.getName() + " is " + (!monitored_ ? "now being ignored." : "no longer being ignored."));
                String message_ = player.getName() + (!monitored_ ? " has started ignoring " : " has stopped ignoring ") + victim.getName() + ".";
                Server.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(5, message_));
                break;
            //</editor-fold>                    
            //<editor-fold defaultstate="collapsed" desc="ignored">
            case "ignored":
                for (String ign : MapleLogger.ignored){
                    player.yellowMessage(ign + " is being ignored.");
                }
                break;
            //</editor-fold>                     
            //<editor-fold defaultstate="collapsed" desc="pos">
            case "pos":
                float xpos = player.getPosition().x;
                float ypos = player.getPosition().y;
                float fh = player.getMap().getFootholds().findBelow(player.getPosition()).getId();
                player.dropMessage("Position: (" + xpos + ", " + ypos + ")");
                player.dropMessage("Foothold ID: " + fh);
                break;
            //</editor-fold>               
            //<editor-fold defaultstate="collapsed" desc="dchalk">
            case "dchalk":
                for (MapleCharacter a1 : player.getMap().getCharacters()) {
                    if (!a1.isGM()) {
                        a1.getMap().setChalk(false);
                        a1.setChalkboard(null);
                        a1.getMap().broadcastMessage(MaplePacketCreator.useChalkboard(a1, true));
                    }
                }
                player.dropMessage(5, "You've disabled @chalk on this map.");
                break;
            //</editor-fold>                
            //<editor-fold defaultstate="collapsed" desc="echalk">
            case "echalk":
                player.getMap().setChalk(true);
                player.getMap().setClosable(true);
                player.dropMessage(5, "You've enabled @chalk on this map.");
                break;
            //</editor-fold>        
            //<editor-fold defaultstate="collapsed" desc="togglecoupon">
            case "togglecoupon":
                if (sub.length < 2){
                    player.yellowMessage("Syntax: !togglecoupon <itemid>");
                    break;
                }
                Server.getInstance().toggleCoupon(Integer.parseInt(sub[1]));
                break;
            //</editor-fold> 
            //<editor-fold defaultstate="collapsed" desc="chat">
            case "chat":
                player.toggleWhiteChat();
                player.message("Your chat is now " + (player.getWhiteChat() ? " white" : "normal") + ".");
                break;
            //</editor-fold>            
            //<editor-fold defaultstate="collapsed" desc="fame">
            case "fame":
                if (sub.length < 3){
                    player.yellowMessage("Syntax: !fame <playername> <gainfame>");
                    break;
                }
                victim = cserv.getPlayerStorage().getCharacterByName(sub[1]);
                victim.setFame(Integer.parseInt(sub[2]));
                victim.updateSingleStat(MapleStat.FAME, victim.getFame());
                break;
            //</editor-fold>               
            //<editor-fold defaultstate="collapsed" desc="give">
            case "give":
            {
                if (sub.length <4) {
                    player.yellowMessage("Syntax: !give <type> <playername> <amount>");
                    player.yellowMessage("Types: nx, ep, vp, ms, jp, fp, rp");
                    break;
                }
                switch (sub[1]){
                    case "nx":
                        cserv.getPlayerStorage().getCharacterByName(sub[2]).getCashShop().gainCash(1, Integer.parseInt(sub[3]));
                        player.message("Given " + Integer.parseInt(sub[3]) + " NX to " + sub[2]);
                        Server.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM]: " + player.getName() + " gave " + Integer.parseInt(sub[3]) + " NX to " + sub[2]));
                        break;
                    case "ep":
                        cserv.getPlayerStorage().getCharacterByName(sub[2]).getClient().getPlayer().addEPoints((byte) Integer.parseInt(sub[3]));
                        player.message("Given " + Integer.parseInt(sub[3]) + " EP to " + sub[2]);
                        Server.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM]: " + player.getName() + " gave " + Integer.parseInt(sub[3]) + " EP to " + sub[2]));
                        break;
                    case "vp":
                        cserv.getPlayerStorage().getCharacterByName(sub[2]).getClient().addVotePoints(Integer.parseInt(sub[3]));
                        player.message("Given " + Integer.parseInt(sub[3]) + " VP to " + sub[2]);
                        Server.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM]: " + player.getName() + " gave " + Integer.parseInt(sub[3]) + " VP to " + sub[2]));
                        break;
                    case "ms":
                        cserv.getPlayerStorage().getCharacterByName(sub[2]).gainMeso(Integer.parseInt(sub[3]), true);
                        player.message("Given " + Integer.parseInt(sub[3]) + " mesos to " + sub[2]);
                        Server.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM]: " + player.getName() + " gave " + Integer.parseInt(sub[3]) + " mesos to " + sub[2]));
                        break;
                    case "jp":
                        cserv.getPlayerStorage().getCharacterByName(sub[2]).addJQPoints((byte) Integer.parseInt(sub[3]));
                        player.message("Given " + Integer.parseInt(sub[3]) + " JP to " + sub[2]);
                        Server.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM]: " + player.getName() + " gave " + Integer.parseInt(sub[3]) + " JP to " + sub[2]));
                        break;
                    case "fp":
                        cserv.getPlayerStorage().getCharacterByName(sub[2]).addFPoints((byte) Integer.parseInt(sub[3]));
                        player.message("Given " + Integer.parseInt(sub[3]) + " FP to " + sub[2]);
                        Server.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM]: " + player.getName() + " gave " + Integer.parseInt(sub[3]) + " FP to " + sub[2]));
                    case "rp":
                        cserv.getPlayerStorage().getCharacterByName(sub[2]).addRbPoints((byte) Integer.parseInt(sub[3]));
                        player.message("Given " + Integer.parseInt(sub[3]) + " RP to " + sub[2]);
                        Server.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM]: " + player.getName() + " gave " + Integer.parseInt(sub[3]) + " RP to " + sub[2]));
                        break;
                }
            }
            //</editor-fold>                   
            //<editor-fold defaultstate="collapsed" desc="id">
            case "id":
                if (sub.length < 2){
                    player.yellowMessage("Syntax: !id <id>");
                    break;
                }
                try {
                    try (BufferedReader dis = new BufferedReader(new InputStreamReader(new URL("http://www.mapletip.com/search_java.php?search_value=" + sub[1] + "&check=true").openConnection().getInputStream()))) {
                        String s;
                        while ((s = dis.readLine()) != null) {
                            player.dropMessage(s);
                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
                break;
            //</editor-fold>                  
            //<editor-fold defaultstate="collapsed" desc="expeds">
            case "expeds":
                for (Channel ch : Server.getInstance().getChannelsFromWorld(0)) {
                    if (ch.getExpeditions().size() == 0) {
                        player.yellowMessage("No Expeditions in Channel " + ch.getId());
                        continue;
                    }
                    player.yellowMessage("Expeditions in Channel " + ch.getId());
                    int id = 0;
                    for (MapleExpedition exped : ch.getExpeditions()) {
                        id++;
                        player.yellowMessage("> Expedition " + id);
                        player.yellowMessage(">> Type: " + exped.getType().toString());
                        player.yellowMessage(">> Status: " + (exped.isRegistering() ? "REGISTERING" : "UNDERWAY"));
                        player.yellowMessage(">> Size: " + exped.getMembers().size());
                        player.yellowMessage(">> Leader: " + exped.getLeader().getName());
                        int memId = 2;
                        for (MapleCharacter member : exped.getMembers()) {
                            if (exped.isLeader(member)) {
                                continue;
                            }
                            player.yellowMessage(">>> Member " + memId + ": " + member.getName());
                            memId++;
                        }
                    }
                }
                break;
            //</editor-fold>        
            //<editor-fold defaultstate="collapsed" desc="seed">
            case "seed":
                if (player.getMapId() != 910010000) {
                    player.yellowMessage("This command can only be used in HPQ.");
                    break;
                }
                Point pos[] = {new Point(7, -207), new Point(179, -447), new Point(-3, -687), new Point(-357, -687), new Point(-538, -447), new Point(-359, -207)};
                int seed[] = {4001097, 4001096, 4001095, 4001100, 4001099, 4001098};
                for (int i = 0; i < pos.length; i++) {
                    Item item = new Item(seed[i], (byte) 0, (short) 1);
                    player.getMap().spawnItemDrop(player, player, item, pos[i], false, true);
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                break;
            //</editor-fold>      
            //<editor-fold defaultstate="collapsed" desc="openportal (not functional)">
            /*
            case "openportal":
                if (sub.length < 2){
                    player.yellowMessage("Syntax: !openportal <portalid>");
                    break;
                }
                player.getMap().getPortal(sub[1]).setPortalState(true);
                break;
            */
            //</editor-fold>            
            //<editor-fold defaultstate="collapsed" desc="closeportals (not functional)">
            /*
            case "closeportals":
                if (sub.length < 2){
                    player.yellowMessage("Syntax: !closeportal <portalid>");
                    break;
                }
                player.getMap().getPortal(sub[1]).setPortalState(false);
                break;
            */
            //</editor-fold>       
            //<editor-fold defaultstate="collapsed" desc="pe (not functional)">
            /*
            case "pe":
                String packet = "";
                try {
                    InputStreamReader is = new FileReader("pe.txt");
                    Properties packetProps = new Properties();
                    packetProps.load(is);
                    is.close();
                    packet = packetProps.getProperty("pe");
                } catch (IOException ex) {
                    ex.printStackTrace();
                    player.yellowMessage("Failed to load pe.txt");
                    break;
                }
                MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
                mplew.write(HexTool.getByteArrayFromHexString(packet));
                SeekableLittleEndianAccessor slea = new GenericSeekableLittleEndianAccessor(new ByteArrayByteStream(mplew.getPacket()));
                short packetId = slea.readShort();
                final MaplePacketHandler packetHandler = PacketProcessor.getProcessor(0, c.getChannel()).getHandler(packetId);
                if (packetHandler != null && packetHandler.validateState(c)) {
                    try {
                        player.yellowMessage("Receiving: " + packet);
                        packetHandler.handlePacket(slea, c);
                    } catch (final Throwable t) {
                        FilePrinter.printError(FilePrinter.PACKET_HANDLER + packetHandler.getClass().getName() + ".txt", t, "Error for " + (c.getPlayer() == null ? "" : "player ; " + c.getPlayer() + " on map ; " + c.getPlayer().getMapId() + " - ") + "account ; " + c.getAccountName() + "\r\n" + slea.toString());
                        break;
                    }
                }
                break;
            */
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="startevent (not functional)">
            /*
            case "startevent":
                int players = 50;
                if(sub.length > 1)
                    players = Integer.parseInt(sub[1]);
                c.getChannelServer().setEvent(new MapleEvent(player.getMapId(), players));
                player.dropMessage(5, "The event has been set on " + player.getMap().getMapName() + " and will allow " + players + " players to join.");
                break;
            */
            //</editor-fold>      
            //<editor-fold defaultstate="collapsed" desc="endevent (not functional)">
            /*
            case "endevent":
                c.getChannelServer().setEvent(null);
                player.dropMessage(5, "You have ended the event. No more players may join.");
                break;
            */
            //</editor-fold>      
            //<editor-fold defaultstate="collapsed" desc="online">
            case "online":
                String text = "Online Players ";
                int allplayers = 0;
                String cc1 = "Players in Channel 1: ", cc2 = "Players in Channel 2: ", cc3 = "Players in Channel 3: ";
                for (MapleCharacter chrs : c.getWorldServer().getPlayerStorage().getAllCharacters()) {
                    // text += chrs.getName() + ", ";
                    switch (chrs.getClient().getChannel()) {
                        case 1:
                            cc1 += chrs.getName() + ", ";
                            allplayers++;
                            break;
                        case 2:
                            cc2 += chrs.getName() + ", ";
                            allplayers++;
                            break;
                        case 3:
                            cc3 += chrs.getName() + ", ";
                            allplayers++;
                            break;
                    }
                }
                if (cc1.length() > 22) {
                    cc1 = cc1.substring(0, cc1.length() - 2);
                }
                if (cc2.length() > 22) {
                    cc2 = cc2.substring(0, cc2.length() - 2);
                }
                if (cc3.length() > 22) {
                    cc3 = cc3.substring(0, cc3.length() - 2);
                }
                player.dropMessage(6, text + "(" + allplayers + ") :");
                player.dropMessage(6, cc1);
                player.dropMessage(6, cc2);
                player.dropMessage(6, cc3);
                break;
                //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="snowball">
            case "snowball":
                List<MapleCharacter> chars = new ArrayList<>(player.getMap().getCharacters());
                for (MapleCharacter chr : chars) {
                    chr.changeMap(109060000, chr.getTeam());
                }
                break;
            //</editor-fold>               
            //<editor-fold defaultstate="collapsed" desc="ban">
            case "ban":
                if (sub.length < 3) {
                    player.yellowMessage("Syntax: !ban <IGN> <Reason> (Please be descriptive)");
                    break;
                }
                String ign = sub[1];
                String reason = StringUtil.joinStringFrom(sub, 2);
                MapleCharacter target = c.getChannelServer().getPlayerStorage().getCharacterByName(ign);
                if (target != null) {
                    String readableTargetName = MapleCharacter.makeMapleReadable(target.getName());
                    String ip = target.getClient().getSession().getRemoteAddress().toString().split(":")[0];
                    //Ban ip
                    PreparedStatement ps = null;
                    try {
                        Connection con = DatabaseConnection.getConnection();
                        if (ip.matches("/[0-9]{1,3}\\..*")) {
                            ps = con.prepareStatement("INSERT INTO ipbans VALUES (DEFAULT, ?, ?)");
                            ps.setString(1, ip);
                            ps.setString(2, String.valueOf(target.getClient().getAccID()));
                            
                            ps.executeUpdate();
                            ps.close();
                        }
                    } catch (SQLException ex) {
                        ex.printStackTrace();
                        c.getPlayer().message("Error occured while banning IP address");
                        c.getPlayer().message(target.getName() + "'s IP was not banned: " + ip);
                    }
                    target.getClient().banMacs();
                    reason = c.getPlayer().getName() + " banned " + readableTargetName + " for " + reason + " (IP: " + ip + ") " + "(MAC: " + c.getMacs() + ")";
                    target.ban(reason);
                    target.yellowMessage("You have been banned by #b" + c.getPlayer().getName() + " #k.");
                    target.yellowMessage("Reason: " + reason);
                    c.announce(MaplePacketCreator.getGMEffect(4, (byte) 0));
                    final MapleCharacter rip = target;
                    TimerManager.getInstance().schedule(new Runnable() {
                        @Override
                        public void run() {
                            rip.getClient().disconnect(false, false);
                        }
                    }, 5000); //5 Seconds
                    Server.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(6, "[Interstellar]: " + ign + " has been kicked in outer space."));
                } else if (MapleCharacter.ban(ign, reason, false)) {
                    c.announce(MaplePacketCreator.getGMEffect(4, (byte) 0));
                    Server.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(6, "[Interstellar]: " + ign + " has been kicked in outer space."));
                } else {
                    c.announce(MaplePacketCreator.getGMEffect(6, (byte) 1));
                }
                break;
                //</editor-fold>              
            //<editor-fold defaultstate="collapsed" desc="unban">
            case "unban":
                if (sub.length < 2){
                    player.yellowMessage("Syntax: !unban <playername>");
                    break;
                } try {
                    Connection con = DatabaseConnection.getConnection();
                    int aid = MapleCharacter.getAccountIdByName(sub[1]);
                    
                    PreparedStatement p = con.prepareStatement("UPDATE accounts SET banned = -1 WHERE id = " + aid);
                    p.executeUpdate();
                    
                    p = con.prepareStatement("DELETE FROM ipbans WHERE aid = " + aid);
                    p.executeUpdate();
                    
                    p = con.prepareStatement("DELETE FROM macbans WHERE aid = " + aid);
                    p.executeUpdate();
                } catch (Exception e) {
                    e.printStackTrace();
                    player.message("Failed to unban " + sub[1]);
                    return true;
                }
                player.message("Unbanned " + sub[1]);
                break;
            //</editor-fold>                      
            //<editor-fold defaultstate="collapsed" desc="hurt">
            case "hurt":
                victim = cserv.getPlayerStorage().getCharacterByName(sub[1]);
                victim.setHp(1);
                victim.updateSingleStat(MapleStat.HP, 1);
                break;
            //</editor-fold>                        
            //<editor-fold defaultstate="collapsed" desc="npc">
            case "npc":
                if (sub.length < 2){
                    player.yellowMessage("Syntax: !npc <npcid>");
                    break;
                }
                MapleNPC npc = MapleLifeFactory.getNPC(Integer.parseInt(sub[1]));
                if (npc != null) {
                    npc.setPosition(player.getPosition());
                    npc.setCy(player.getPosition().y);
                    npc.setRx0(player.getPosition().x + 50);
                    npc.setRx1(player.getPosition().x - 50);
                    npc.setFh(player.getMap().getFootholds().findBelow(c.getPlayer().getPosition()).getId());
                    player.getMap().addMapObject(npc);
                    player.getMap().broadcastMessage(MaplePacketCreator.spawnNPC(npc));
                }
                break;
            //</editor-fold>       
            //<editor-fold defaultstate="collapsed" desc="face">
            case "face":
                if (sub.length < 2){
                    player.yellowMessage("Syntax: !face [<playername>] <faceid>");
                    break;
                }
                try {
                    if (sub.length == 2) {
                        int itemId = Integer.parseInt(sub[1]);
                        if(!(itemId >= 20000 && itemId < 22000) || MapleItemInformationProvider.getInstance().getName(itemId) == null) {
                            player.yellowMessage("Face id '" + sub[1] + "' does not exist.");
                            break;
                        }
                        player.setFace(itemId);
                        player.updateSingleStat(MapleStat.FACE, itemId);
                        player.equipChanged();
                    } else {
                        int itemId = Integer.parseInt(sub[2]);
                        if(!(itemId >= 20000 && itemId < 22000) || MapleItemInformationProvider.getInstance().getName(itemId) == null) {
                            player.yellowMessage("Face id '" + sub[2] + "' does not exist.");
                            break;
                        }
                        victim = c.getChannelServer().getPlayerStorage().getCharacterByName(sub[1]);
                        if(victim == null) {
                            player.yellowMessage("Player '" + sub[1] + "' has not been found on this channel.");
                            break;
                        }
                        victim.setFace(itemId);
                        victim.updateSingleStat(MapleStat.FACE, itemId);
                        victim.equipChanged();
                    }
                } catch(Exception e) {}
                break;
            //</editor-fold>            
            //<editor-fold defaultstate="collapsed" desc="hair">
            case "hair":
                if (sub.length < 2){
                    player.yellowMessage("Syntax: !hair [<playername>] <hairid>");
                    break;
                }
                try {
                    if (sub.length == 2) {
                        int itemId = Integer.parseInt(sub[1]);
                        if(!(itemId >= 30000 && itemId < 32000) || MapleItemInformationProvider.getInstance().getName(itemId) == null) {
                            player.yellowMessage("Hair id '" + sub[1] + "' does not exist.");
                            break;
                        }
                        player.setHair(itemId);
                        player.updateSingleStat(MapleStat.HAIR, itemId);
                        player.equipChanged();
                    } else {
                        int itemId = Integer.parseInt(sub[2]);
                        if(!(itemId >= 30000 && itemId < 32000) || MapleItemInformationProvider.getInstance().getName(itemId) == null) {
                            player.yellowMessage("Hair id '" + sub[2] + "' does not exist.");
                            break;
                        }
                        victim = c.getChannelServer().getPlayerStorage().getCharacterByName(sub[1]);
                        if(victim == null) {
                            player.yellowMessage("Player '" + sub[1] + "' has not been found on this channel.");
                            break;
                        }
                        victim.setHair(itemId);
                        victim.updateSingleStat(MapleStat.HAIR, itemId);
                        victim.equipChanged();
                    }
                } catch(Exception e) {}
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="gmshop">
            case "gmshop":
                MapleShopFactory.getInstance().getShop(1337).sendShop(c);
                break;
            //</editor-fold>
            default:
                return false;
        }   
        return true;
    }
    public static boolean executeInternCommand(Channel cserv, Server srv, MapleClient c, String[] sub){
        MapleCharacter player = c.getPlayer();
        MapleCharacter victim;
        Skill skill;
        if(player.gmLevel() < 2){
            return false;
        }
        String choice = sub[0].substring(1);  
        switch(choice.toLowerCase()) {
            //<editor-fold defaultstate="collapsed" desc="hide">
            case "hide":
                SkillFactory.getSkill(9101004).getEffect(SkillFactory.getSkill(9101004).getMaxLevel()).applyTo(player);
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="unhide">
            case "unhide":
                SkillFactory.getSkill(9101004).getEffect(SkillFactory.getSkill(9101004).getMaxLevel()).applyTo(player);
                break;
            //</editor-fold>
            case "oxmap":
                player.changeMap(109020001);
                break;
            case "minigame":
                player.changeMap(109070000);
                break;
            case "bomberman":
                player.changeMap(109010200);
                break;
            case "rlglm":
                if (sub.length < 2){
                    player.yellowMessage("Syntax: !rlglm <number>");
                }
                if ("1".equals(sub[1])){
                    player.changeMap(109010203);
                } else {
                    player.changeMap(109010201);
                }
                break;

            case "dbobm":
                player.changeMap(109010104);
                break;
            //<editor-fold defaultstate="collapsed" desc="giveep">
            case "giveep":{
                if (sub.length < 3){
                    player.yellowMessage("Syntax: !giveep <name> <amount>");
                    break;
                }
                cserv.getPlayerStorage().getCharacterByName(sub[1]).getClient().getPlayer().addEPoints((byte) Integer.parseInt(sub[2]));
                player.message("Given " + Integer.parseInt(sub[2]) + " EP to " + sub[1]);
                Server.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM]: " + player.getName() + " gave " + Integer.parseInt(sub[2]) + " EP to " + sub[1]));
                break;
            }
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="mutemap">
            case "mutemap":
            case "mutem":
                if(player.getMap().isMuted()) {
                    player.getMap().setMuted(false);
                    player.dropMessage(5, "The map you are in has been un-muted.");
                } else {
                    player.getMap().setMuted(true);
                    player.dropMessage(5, "The map you are in has been muted.");
                }
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="mute">
            case "mute":
                if (sub.length < 2){
                    player.yellowMessage("Syntax: !mute <playername>");
                    break;
                }
                victim = cserv.getPlayerStorage().getCharacterByName(sub[1]);
                if (victim.getMap().isMuted()){
                    victim.getMap().setMuted(false);
                    victim.dropMessage(5, "You have been un-muted.");
                    break;
                } else {
                    victim.getMap().setMuted(true);
                    victim.dropMessage(5, "You have been muted.");
                    break;
                }
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="whereami">
        case "whereami":
            player.yellowMessage("Map ID: " + player.getMap().getId());
            player.yellowMessage("Players on this map:");
            for (MapleMapObject mmo : player.getMap().getPlayers()) {
                MapleCharacter chr = (MapleCharacter) mmo;
                player.dropMessage(5, ">> " + chr.getName());
            }
            player.yellowMessage("NPCs on this map:");
            for (MapleMapObject npcs : player.getMap().getMapObjects()) {
                if (npcs instanceof MapleNPC) {
                    MapleNPC npc = (MapleNPC) npcs;
                    player.dropMessage(5, ">> " + npc.getName() + " - " + npc.getId() + " - Oid: " + npc.getObjectId());
                }
            }
            break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="kill">
            case "kill":
                if (sub.length < 2){
                    player.yellowMessage("Syntax: !kill <playername>");
                    break;
                }
                victim = cserv.getPlayerStorage().getCharacterByName(sub[1]);
                victim.setHpMp(0);
                Server.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM]: " + player.getName() + " used !kill on " + victim.getName()));
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="killmap">
            case "killmap":
            case "killm":
                for (MapleCharacter mch : player.getMap().getCharacters()) {
                    if (mch.gmLevel() < 2)
                    {
                        mch.setHp(0);
                        mch.updateSingleStat(MapleStat.HP, 0);
                    }
                }
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="killall">
            case "killall":
                List<MapleMapObject> monsters = player.getMap().getMapObjectsInRange(player.getPosition(), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.MONSTER));
                MapleMap map = player.getMap();
                for (MapleMapObject monstermo : monsters) {
                    monster = (MapleMonster) monstermo;
                    if (!monster.getStats().isFriendly()) {
                        map.killMonster(monster, player, true);
                        //monster.giveExpToCharacter(player, monster.getExp() * c.getPlayer().getExpRate(), true, 1);
                    }
                }
                player.dropMessage("Killed " + monsters.size() + " monsters.");
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="reloadmap">
            case "reloadmap":
                MapleMap oldMap = c.getPlayer().getMap();
                MapleMap newMap = c.getChannelServer().getMapFactory().getMap(player.getMapId());
                for (MapleCharacter ch : oldMap.getCharacters()) {
                    ch.changeMap(newMap);
                }
                oldMap = null;
                newMap.respawn();
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="sp">
            case "sp":
                if (sub.length < 2){
                    player.yellowMessage("Syntax: !sp [<playername>] <newsp>");
                    break;
                }
                if (sub.length == 2) {
                    player.setRemainingSp(Integer.parseInt(sub[1]));
                    player.updateSingleStat(MapleStat.AVAILABLESP, player.getRemainingSp());
                } else {
                    victim = c.getChannelServer().getPlayerStorage().getCharacterByName(sub[1]);
                    victim.setRemainingSp(Integer.parseInt(sub[2]));
                    victim.updateSingleStat(MapleStat.AVAILABLESP, player.getRemainingSp());
                }
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="ap">
            case "ap":
                if (sub.length < 2){
                    player.yellowMessage("Syntax: !ap [<playername>] <newap>");
                    break;
                }
                if (sub.length < 3) {
                    player.setRemainingAp(Integer.parseInt(sub[1]));
                    player.updateSingleStat(MapleStat.AVAILABLEAP, player.getRemainingAp());
                } else {
                    victim = c.getChannelServer().getPlayerStorage().getCharacterByName(sub[1]);
                    victim.setRemainingAp(Integer.parseInt(sub[2]));
                    victim.updateSingleStat(MapleStat.AVAILABLEAP, victim.getRemainingAp());
                }
                break;
            //</editor-fold>        
            //<editor-fold defaultstate="collapsed" desc="empowerme">
            case "empowerme":
                final int[] array = {2311003, 2301004, 1301007, 4101004, 2001002, 1101007, 1005, 2301003, 5121009, 1111002, 4111001, 4111002, 4211003, 4211005, 1321000, 2321004, 3121002};
                for (int i : array) {
                    SkillFactory.getSkill(i).getEffect(SkillFactory.getSkill(i).getMaxLevel()).applyTo(player);
                }
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="buffmap">
            case "buffmap":
                SkillFactory.getSkill(9101001).getEffect(SkillFactory.getSkill(9101001).getMaxLevel()).applyTo(player, true);
                SkillFactory.getSkill(9101002).getEffect(SkillFactory.getSkill(9101002).getMaxLevel()).applyTo(player, true);
                SkillFactory.getSkill(9101003).getEffect(SkillFactory.getSkill(9101003).getMaxLevel()).applyTo(player, true);
                SkillFactory.getSkill(9101008).getEffect(SkillFactory.getSkill(9101008).getMaxLevel()).applyTo(player, true);
                SkillFactory.getSkill(1005).getEffect(SkillFactory.getSkill(1005).getMaxLevel()).applyTo(player, true);
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="buff">
            case "buff":
                if (sub.length < 2){
                    player.yellowMessage("Syntax: !buff <buffid>");
                    break;
                }
                int skillid=Integer.parseInt(sub[1]);
                
                skill = SkillFactory.getSkill(skillid);
                if(skill != null) skill.getEffect(skill.getMaxLevel()).applyTo(player);
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="bomb">
            case "bomb":
                if (sub.length > 1){
                    victim = c.getWorldServer().getPlayerStorage().getCharacterByName(sub[1]);
                    victim.getMap().spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(9300166), victim.getPosition());
                    Server.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(5, player.getName() + " used !bomb on " + victim.getName()));
                } else {
                    player.getMap().spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(9300166), player.getPosition());
                }
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="checkpt">
            case "checkpt":
                List<Integer> parties = new ArrayList<>();
                List<MapleCharacter> solo = new ArrayList<>();
                for (MapleCharacter chrs : player.getMap().getCharacters()) {
                    if (chrs.getParty() != null) {
                        if (chrs.getParty().getLeader().getId() == chrs.getId() && !parties.contains(chrs.getPartyId())) {
                            parties.add(chrs.getPartyId());
                        }
                    } else {
                        solo.add(chrs);
                    }
                }
                if (parties.size() > 0) {
                    player.dropMessage("Character IN party:");
                }
                for (Integer partyId : parties) {
                    StringBuilder sb = new StringBuilder();
                    MapleParty party = c.getWorldServer().getParty(partyId);
                    sb.append(MapleCharacter.makeMapleReadable(party.getLeader().getName())).append(" [");
                    for (MaplePartyCharacter mpc : party.getMembers()) {
                        if (mpc.getId() != party.getLeader().getId()) {
                            sb.append(MapleCharacter.makeMapleReadable(mpc.getName())).append(", ");
                        }
                    }
                    if (party.getMembers().size() > 1) {
                        sb.setLength(sb.length() - 2);
                    }
                    sb.append("]");
                    player.dropMessage(sb.toString());
                }
                player.dropMessage("Characters NOT in party:");
                player.dropMessage(solo.toString());
                solo.clear();
                parties.clear();
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="dispelm">
            case "dispelm":
            case "dispelmap":
                for (MapleCharacter a1 : player.getMap().getCharacters()) {
                    a1.dispelDebuffs();
                    a1.dropMessage(5, "Dispelled.");
                }
                break;
            //</editor-fold>        
            //<editor-fold defaultstate="collapsed" desc="dispel">
            case "dispel":
                if (sub.length > 1) {
                    victim = cserv.getPlayerStorage().getCharacterByName(sub[1]);
                    if (victim != null) {
                        victim.dispelDebuffs();
                    }
                    victim.dropMessage(5, "Dispelled.");
                } else {
                    player.dropMessage(5, "Error. Please type the command as follows !dispel <name>");
                }
                break;
            //</editor-fold>                
            //<editor-fold defaultstate="collapsed" desc="seduce">
            case "seduce":
                victim = cserv.getPlayerStorage().getCharacterByName(sub[1]);
                int level = Integer.parseInt(sub[2]);
                if (victim != null) {
                    victim.setChair(0);
                    victim.getClient().getSession().write(MaplePacketCreator.cancelChair(-1));
                    victim.getMap().broadcastMessage(victim, MaplePacketCreator.showChair(victim.getId(), 0), false);
                    victim.giveDebuff(MapleDisease.SEDUCE, MobSkillFactory.getMobSkill(128, level));
                } else {
                    player.dropMessage("Player is not on.");
                }
                break;
            //</editor-fold>              
            //<editor-fold defaultstate="collapsed" desc="seducem">
            case "seducem":
            case "seducemap":
                level = Integer.parseInt(sub[1]);
                for (MapleCharacter victime : player.getMap().getCharacters()) {
                    if (victime != null && !victime.isGM()) {
                        victime.setChair(0);
                        victime.getClient().getSession().write(MaplePacketCreator.cancelChair(-1));
                        victime.getMap().broadcastMessage(victime, MaplePacketCreator.showChair(victime.getId(), 0), false);
                        victime.giveDebuff(MapleDisease.SEDUCE, MobSkillFactory.getMobSkill(128, level));
                    }
                }
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="stun">
            case "stun":
                victim = cserv.getPlayerStorage().getCharacterByName(sub[1]); // leggo!uh did ubuild yaesxxxxxxxxxxxx
                if (victim != null) {
                    victim.setChair(0);
                    victim.getClient().getSession().write(MaplePacketCreator.cancelChair(-1));
                    victim.getMap().broadcastMessage(victim, MaplePacketCreator.showChair(victim.getId(), 0), false);
                    victim.givePermDebuff(MapleDisease.STUN, MobSkillFactory.getMobSkill(123, 1));
                } else {
                    player.dropMessage("Player is not on.");
                }
                break;
            //</editor-fold>           
            //<editor-fold defaultstate="collapsed" desc="stunm">
            case "stunm":
            case "stunmap":
                for (MapleCharacter victime : player.getMap().getCharacters()) {
                    if (victime != null && !victime.isGM()) {
                        victime.setChair(0);
                        victime.getClient().getSession().write(MaplePacketCreator.cancelChair(-1));
                        victime.getMap().broadcastMessage(victime, MaplePacketCreator.showChair(victime.getId(), 0), false);
                        victime.givePermDebuff(MapleDisease.STUN, MobSkillFactory.getMobSkill(123, 1));
                    }
                }
                break;
            //</editor-fold>                
            //<editor-fold defaultstate="collapsed" desc="confuse">
            case "confuse":
                victim = cserv.getPlayerStorage().getCharacterByName(sub[1]); // leggo!uh did ubuild yaesxxxxxxxxxxxx
                if (victim != null) {
                    victim.setChair(0);
                    victim.getClient().getSession().write(MaplePacketCreator.cancelChair(-1));
                    victim.getMap().broadcastMessage(victim, MaplePacketCreator.showChair(victim.getId(), 0), false);
                    victim.givePermDebuff(MapleDisease.CONFUSE, MobSkillFactory.getMobSkill(132, 1));
                } else {
                    player.dropMessage("Player is not on.");
                }
                break;
            //</editor-fold>               
            //<editor-fold defaultstate="collapsed" desc="confusem">
            case "confusem":
            case "confusemap":
                for (MapleCharacter victime : player.getMap().getCharacters()) {
                    if (victime != null && !victime.isGM()) {
                        victime.getClient().getSession().write(MaplePacketCreator.cancelChair(-1));
                        victime.getMap().broadcastMessage(victime, MaplePacketCreator.showChair(victime.getId(), 0), false);
                        victime.givePermDebuff(MapleDisease.CONFUSE, MobSkillFactory.getMobSkill(132, 1));
                    }
                }
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="seal">
            case "seal":
                victim = cserv.getPlayerStorage().getCharacterByName(sub[1]); // leggo!uh did ubuild yaesxxxxxxxxxxxx
                if (victim != null) {
                    victim.setChair(0);
                    victim.getClient().getSession().write(MaplePacketCreator.cancelChair(-1));
                    victim.getMap().broadcastMessage(victim, MaplePacketCreator.showChair(victim.getId(), 0), false);
                    victim.givePermDebuff(MapleDisease.SEAL, MobSkillFactory.getMobSkill(120, 1));
                } else {
                    player.dropMessage("Player is not on.");
                }
                break;
            //</editor-fold>               
            //<editor-fold defaultstate="collapsed" desc="sealm">
            case "sealm":
            case "sealmap":
                for (MapleCharacter victime : player.getMap().getCharacters()) {
                    if (victime != null && !victime.isGM()) {
                        victime.getClient().getSession().write(MaplePacketCreator.cancelChair(-1));
                        victime.getMap().broadcastMessage(victime, MaplePacketCreator.showChair(victime.getId(), 0), false);
                        victime.givePermDebuff(MapleDisease.STUN, MobSkillFactory.getMobSkill(120, 1));
                    }
                }
                break;
            //</editor-fold>               
            //<editor-fold defaultstate="collapsed" desc="dc">
            case "dc":
                if (sub.length < 2){
                    player.yellowMessage("Syntax: !dc <playername>");
                    break;
                }
                victim = c.getWorldServer().getPlayerStorage().getCharacterByName(sub[1]);
                if (victim == null) {
                    victim = c.getChannelServer().getPlayerStorage().getCharacterByName(sub[1]);
                    if (victim == null) {
                        victim = player.getMap().getCharacterByName(sub[1]);
                        if (victim != null) {
                            try {//sometimes bugged because the map = null
                                victim.getClient().disconnect(true, false);
                                player.getMap().removePlayer(victim);
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                        } else {
                            break;
                        }
                    }
                }
                if (player.gmLevel() < victim.gmLevel()) {
                    victim = player;
                }
                victim.getClient().disconnect(false, false);
                break;
            //</editor-fold>                            
            //<editor-fold defaultstate="collapsed" desc="randign">
            case "r":
            case "ign":
            case "randign":
                Random rand = new Random();
                Collection<MapleCharacter> chars = player.getMap().getCharacters();
                List<MapleCharacter> charlist = new ArrayList<>();
                
                if (sub.length > 1) {
                    if (sub[1].equals("d") || sub[1].equals("dead")) {
                        for (MapleCharacter a1 : chars) {
                            if (!a1.isGM() && !a1.isAlive()) {
                                charlist.add(a1);
                            }
                        }
                    } else if (sub[1].equals("a") || sub[1].equals("alive")) {
                        for (MapleCharacter a1 : chars) {
                            if (!a1.isGM() && a1.isAlive()) {
                                charlist.add(a1);
                            }
                        }
                    } else {
                        for (MapleCharacter a1 : chars) {
                            if (!a1.isGM()) {
                                charlist.add(a1);
                            }
                        }
                    }
                } else {
                    for (MapleCharacter a1 : chars) {
                        if (!a1.isGM()) {
                            charlist.add(a1);
                        }
                    }
                }
                
                int amountofigns = 1, randnum = 0;
                String igns = "";
                
                if (sub.length > 1) {
                    if (sub.length > 2) {
                        if (Integer.parseInt(sub[2]) >= charlist.size()) {
                            for (int i = 0; i < charlist.size(); i++) {
                                igns += charlist.get(i).getName() + ", ";
                            }
                        } else {
                            amountofigns = Integer.parseInt(sub[2]);
                            for (int i = 0; i < amountofigns; i++) {
                                randnum = rand.nextInt(charlist.size());
                                igns += charlist.get(randnum).getName() + ", ";
                                charlist.remove(randnum);
                            }
                        }
                        
                        igns = igns.substring(0, igns.length() - 2);
                        if (sub[1].equals("d") || sub[1].equals("dead")) {
                            player.getMap().broadcastMessage(MaplePacketCreator.sendYellowTip("The chosen dead players were: " + igns));
                        } else if (sub[1].equals("a") || sub[1].equals("alive")) {
                            player.getMap().broadcastMessage(MaplePacketCreator.sendYellowTip("The chosen alive players were: " + igns));
                        } else {
                            player.getMap().broadcastMessage(MaplePacketCreator.sendYellowTip("The chosen players were: " + igns));
                        }
                    } else if (Character.isDigit(sub[1].charAt(0))) {
                        if (Integer.parseInt(sub[1]) >= charlist.size()) {
                            for (int i = 0; i < charlist.size(); i++) {
                                igns += charlist.get(i).getName() + ", ";
                            }
                        } else {
                            amountofigns = Integer.parseInt(sub[1]);
                            for (int i = 0; i < amountofigns; i++) {
                                randnum = rand.nextInt(charlist.size());
                                igns += charlist.get(randnum).getName() + ", ";
                                charlist.remove(randnum);
                            }
                        }
                        
                        igns = igns.substring(0, igns.length() - 2);
                        player.getMap().broadcastMessage(MaplePacketCreator.sendYellowTip("The chosen players were: " + igns));
                    } else {
                        if (sub[1].equals("d") || sub[1].equals("dead")) {
                            igns = charlist.get(rand.nextInt(charlist.size())).getName();
                            player.getMap().broadcastMessage(MaplePacketCreator.sendYellowTip("Dead player selected was: " + igns));
                        } else if (sub[1].equals("a") || sub[1].equals("alive")) {
                            igns = charlist.get(rand.nextInt(charlist.size())).getName();
                            
                            player.getMap().broadcastMessage(MaplePacketCreator.sendYellowTip("Alive player selected was: " + igns));
                        } else {
                            igns = charlist.get(rand.nextInt(charlist.size())).getName();
                            player.getMap().broadcastMessage(MaplePacketCreator.sendYellowTip("Random player selected was: " + igns));
                        }
                    }
                    
                } else {
                    igns = charlist.get(rand.nextInt(charlist.size())).getName();
                    
                    player.getMap().broadcastMessage(MaplePacketCreator.sendYellowTip("Random player selected was: " + igns));
                }
                break;
                //</editor-fold>      
            //<editor-fold defaultstate="collapsed" desc="randnum">
            case "num":
            case "rnum":
            case "randnum":
            case "randn":
                int num1 = 3, num2 = 1;
                if (sub.length > 1) {
                    num1 = Integer.parseInt(sub[1]);
                }
                if (sub.length > 2) {
                    num2 = Integer.parseInt(sub[2]);
                }
                rand = new Random();
                randnum = 0;
                
                if (num1 > num2) {
                    randnum = rand.nextInt(num1 + 1 - num2) + num2;
                    player.getMap().broadcastMessage(MaplePacketCreator.sendYellowTip("Random number selected was: " + randnum));
                    
                } else {
                    randnum = rand.nextInt(num2 + 1 - num1) + num1;
                    player.getMap().broadcastMessage(MaplePacketCreator.sendYellowTip("Random number selected was: " + randnum));
                }
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="xmas">
            case "xmas":
                if (sub.length > 1) {
                    String text = (StringUtil.joinStringFrom(sub, 1)).toLowerCase(), revtext = "";
                    
                    int space = text.length() * 30, charrand = 0, dist = 0;
                    String code = "";
                    Point pos;
                    Item droppedletter;
                    
                    for (int i = text.length() - 1; i > -1; i--) {
                        revtext += text.charAt(i);
                    }
                    
                    for (int i = 0; i < revtext.length(); i++) {
                        if ((int) revtext.charAt(i) != 32) {
                            charrand = (int) revtext.charAt(i) - 97;
                            if (charrand < 10) {
                                code = "399100" + charrand;
                            } else {
                                code = "39910" + charrand;
                            }
                            
                            droppedletter = new Item(Integer.parseInt(code), (short) 0, (short) 0, 1);
                            pos = new Point(player.getPosition().x + space / 2 - dist, player.getPosition().y);
                            player.getMap().spawnItemDrop(player, player, droppedletter, pos, false, true);
                            dist += 30; // Space between letters, while "space" is the space cut out from the map given to spawn letters
                        } else {
                            dist += 30;
                        }
                    }
                } else {
                    player.dropMessage(5, "Error. Type out a message");
                }
                break;
            //</editor-fold>                
            //<editor-fold defaultstate="collapsed" desc="box">
            case "box":
                MapleMonster monster;
                if (sub.length > 1) {
                    monster = MapleLifeFactory.getMonster(9500365);
                    int hp = Integer.parseInt(sub[1]);
                    monster.setHp(hp);
                    player.getMap().spawnMonsterOnGroundBelow(monster, player.getPosition());
                    player.dropMessage(6, "Box has " + sub[1] + " hp");
                } else {
                    monster = MapleLifeFactory.getMonster(9500365);
                    rand = new Random();
                    int num = rand.nextInt(100) + 1;
                    monster.setHp(num);
                    player.getMap().spawnMonsterOnGroundBelow(monster, player.getPosition());
                    player.dropMessage(6, "Box has " + num + " hp");
                }
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="gepos">
            case "getpos":
                player.dropMessage(6, player.getPosition() + "");
                break;
            //</editor-fold>               
            //<editor-fold defaultstate="collapsed" desc="closestto">
            case "closestto":
                int min = 10000;
                MapleCharacter closest = null;
                if (sub.length > 1) {
                    victim = cserv.getPlayerStorage().getCharacterByName(sub[1]);
                }
                else victim = player;
                for(MapleCharacter a1 : victim.getMap().getCharacters()) {
                    if(Math.abs(victim.getPosition().x - a1.getPosition().x) < min && a1 != victim){
                        closest = a1;
                        min = Math.abs(victim.getPosition().x - a1.getPosition().x);
                    }
                }
                if(closest != null) victim.getMap().broadcastMessage(MaplePacketCreator.serverNotice(6, closest.getName() + " was closest to " + victim.getName() + " - " + min + " pixels away."));
                else player.dropMessage(5, "There are no players in the map besides you.");
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="cleardrops">
            case "cleardrops":
                player.getMap().clearDrops(player);
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="clearslot">
            case "clearslot":
                if (sub.length < 2) {
                    player.yellowMessage("Syntax: !clearslot <all, equip, use, setup, etc or cash.>");
                    break;
                }
                String type = sub[1];
                if (type.equals("all")) {
                    for (int i = 0; i < 101; i++) {
                        Item tempItem = c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem((byte) i);
                        if (tempItem == null)
                            continue;
                        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.EQUIP, (byte) i, tempItem.getQuantity(), false, true);
                    }
                    for (int i = 0; i < 101; i++) {
                        Item tempItem = c.getPlayer().getInventory(MapleInventoryType.USE).getItem((byte) i);
                        if (tempItem == null)
                            continue;
                        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, (byte) i, tempItem.getQuantity(), false, true);
                    }
                    for (int i = 0; i < 101; i++) {
                        Item tempItem = c.getPlayer().getInventory(MapleInventoryType.ETC).getItem((byte) i);
                        if (tempItem == null)
                            continue;
                        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.ETC, (byte) i, tempItem.getQuantity(), false, true);
                    }
                    for (int i = 0; i < 101; i++) {
                        Item tempItem = c.getPlayer().getInventory(MapleInventoryType.SETUP).getItem((byte) i);
                        if (tempItem == null)
                            continue;
                        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.SETUP, (byte) i, tempItem.getQuantity(), false, true);
                    }
                    for (int i = 0; i < 101; i++) {
                        Item tempItem = c.getPlayer().getInventory(MapleInventoryType.CASH).getItem((byte) i);
                        if (tempItem == null)
                            continue;
                        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.CASH, (byte) i, tempItem.getQuantity(), false, true);
                    }
                    player.yellowMessage("All Slots Cleared.");
                }
                else if (type.equals("equip")) {
                    for (int i = 0; i < 101; i++) {
                        Item tempItem = c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem((byte) i);
                        if (tempItem == null)
                            continue;
                        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.EQUIP, (byte) i, tempItem.getQuantity(), false, true);
                    }
                    player.yellowMessage("Equipment Slot Cleared.");
                }
                else if (type.equals("use")) {
                    for (int i = 0; i < 101; i++) {
                        Item tempItem = c.getPlayer().getInventory(MapleInventoryType.USE).getItem((byte) i);
                        if (tempItem == null)
                            continue;
                        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, (byte) i, tempItem.getQuantity(), false, true);
                    }
                    player.yellowMessage("Use Slot Cleared.");
                }
                else if (type.equals("setup")) {
                    for (int i = 0; i < 101; i++) {
                        Item tempItem = c.getPlayer().getInventory(MapleInventoryType.SETUP).getItem((byte) i);
                        if (tempItem == null)
                            continue;
                        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.SETUP, (byte) i, tempItem.getQuantity(), false, true);
                    }
                    player.yellowMessage("Set-Up Slot Cleared.");
                }
                else if (type.equals("etc")) {
                    for (int i = 0; i < 101; i++) {
                        Item tempItem = c.getPlayer().getInventory(MapleInventoryType.ETC).getItem((byte) i);
                        if (tempItem == null)
                            continue;
                        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.ETC, (byte) i, tempItem.getQuantity(), false, true);
                    }
                    player.yellowMessage("ETC Slot Cleared.");
                }
                else if (type.equals("cash")) {
                    for (int i = 0; i < 101; i++) {
                        Item tempItem = c.getPlayer().getInventory(MapleInventoryType.CASH).getItem((byte) i);
                        if (tempItem == null)
                            continue;
                        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.CASH, (byte) i, tempItem.getQuantity(), false, true);
                    }
                    player.yellowMessage("Cash Slot Cleared.");
                }
                else player.yellowMessage("Slot" + type + " does not exist!");
                break;
                //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="warp">
            case "warp":
                if (sub.length < 2) {
                    player.yellowMessage("Syntax: !warp <mapid> / !warp <playername>");
                    break;
                }
                try {
                    victim = cserv.getPlayerStorage().getCharacterByName(sub[1]);
                    if(victim == null) {
                        for (Channel ch : srv.getChannelsFromWorld(c.getWorld())) {
                            victim = ch.getPlayerStorage().getCharacterByName(sub[1]);
                            if(victim != null) break;
                        }
                    }
                    if(victim != null) {
                        if (player.getClient().getChannel() != victim.getClient().getChannel()) {//Change channel if needed.
                            player.dropMessage("Changing channel, please wait a moment.");
                            player.getClient().changeChannel(victim.getClient().getChannel());
                        }
                        player.changeMap(victim.getMap(), victim.getPosition());
                    } else {
                        MapleMap target = c.getChannelServer().getMapFactory().getMap(Integer.parseInt(sub[1]));
                        player.changeMap(target, target.getRandomPlayerSpawnpoint());
                    }
                    if (player.getEventInstance() != null) {
                        player.getEventInstance().unregisterPlayer(player);
                    }
                } catch (Exception ex) {
                    ex.printStackTrace();
                    player.dropMessage("A problem occured");
                    return false;
                }
                break;
                //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="warphere">
            case "warphere":
            case "summon":
            case "whx":
                if (sub.length < 2){
                    player.yellowMessage("Syntax: !warphere <playername>");
                    break;
                }
                victim = cserv.getPlayerStorage().getCharacterByName(sub[1]);
                if (victim == null) {//If victim isn't on current channel, loop all channels on current world.
                    for (Channel ch : srv.getChannelsFromWorld(c.getWorld())) {
                        victim = ch.getPlayerStorage().getCharacterByName(sub[1]);
                        if (victim != null) {
                            break;//We found the person, no need to continue the loop.
                        }
                    }
                }
                if (victim != null) {
                    boolean changingEvent = true;
                    if (victim.getEventInstance() != null) {
                        if(player.getEventInstance() != null && victim.getEventInstance().getLeaderId() == player.getEventInstance().getLeaderId()) {
                            changingEvent = false;
                        } else {
                            victim.getEventInstance().unregisterPlayer(victim);
                        }
                    }
                    //Attempt to join the warpers instance.
                    if (player.getEventInstance() != null && changingEvent) {
                        if (player.getClient().getChannel() == victim.getClient().getChannel()) {//just in case.. you never know...
                            player.getEventInstance().registerPlayer(victim);
                            victim.changeMap(player.getEventInstance().getMapInstance(player.getMapId()), player.getMap().findClosestPortal(player.getPosition()));
                        } else {
                            player.dropMessage("Target isn't on your channel, not able to warp into event instance.");
                        }
                    } else {//If victim isn't in an event instance or is in the same event instance as the one the caller is, just warp them.
                        victim.changeMap(player.getMapId(), player.getMap().findClosestPortal(player.getPosition()));
                    }
                    if (player.getClient().getChannel() != victim.getClient().getChannel()) {//And then change channel if needed.
                        victim.dropMessage("Changing channel, please wait a moment.");
                        victim.getClient().changeChannel(player.getClient().getChannel());
                    }
                } else {
                    player.dropMessage("Unknown player.");
                }
                break;
                //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="heal">    
            case "heal":
                if (sub.length == 2){
                    victim = cserv.getPlayerStorage().getCharacterByName(sub[1]);
                    victim.setHp(victim.getMaxHp());
                    victim.updateSingleStat(MapleStat.HP, victim.getMaxHp());
                    victim.setMp(victim.getMaxMp());
                    victim.updateSingleStat(MapleStat.MP, victim.getMaxMp());
                }
                else{
                    player.setHp(player.getMaxHp());
                    player.updateSingleStat(MapleStat.HP, player.getMaxHp());
                    player.setMp(player.getMaxMp());
                    player.updateSingleStat(MapleStat.MP, player.getMaxMp());
                }
                break;
            //</editor-fold>         
            //<editor-fold defaultstate="collapsed" desc="healm">
            case "healmap":
            case "healm":
                for (MapleCharacter mch : player.getMap().getCharacters()) {
                    if (mch != null) {
                        mch.setHp(mch.getMaxHp());
                        mch.updateSingleStat(MapleStat.HP, mch.getMaxHp());
                        mch.setMp(mch.getMaxMp());
                        mch.updateSingleStat(MapleStat.MP, mch.getMaxMp());
                    }
                }
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="night">
            case "night":
                player.getMap().broadcastNightEffect();
                player.yellowMessage("Done.");
                break;
            //</editor-fold>            
            //<editor-fold defaultstate="collapsed" desc="item">
            case "item":
            case "drop":
                if (sub.length < 2){
                    player.yellowMessage("Syntax: !item <itemid> <quantity>");
                    break;
                }
                int itemId = Integer.parseInt(sub[1]);
                short quantity = 1;
                if(sub.length >= 3) quantity = Short.parseShort(sub[2]);
                if (sub[0].equals("item")) {
                    int petid = -1;
                    if (ItemConstants.isPet(itemId)) {
                        petid = MaplePet.createPet(itemId);
                    }
                    byte flag = 0;
                    if(player.gmLevel() < 3) {
                        flag |= ItemConstants.ACCOUNT_SHARING;
                        flag |= ItemConstants.UNTRADEABLE;
                    }
                    MapleInventoryManipulator.addById(c, itemId, quantity, player.getName(), petid, flag, -1);
                } else {
                    Item toDrop;
                    if (MapleItemInformationProvider.getInstance().getInventoryType(itemId) == MapleInventoryType.EQUIP) {
                        toDrop = MapleItemInformationProvider.getInstance().getEquipById(itemId);
                    } else {
                        toDrop = new Item(itemId, (short) 0, quantity);
                    }
                    toDrop.setOwner(player.getName());
                    if(player.gmLevel() < 3) {
                        byte b = toDrop.getFlag();
                        b |= ItemConstants.ACCOUNT_SHARING;
                        b |= ItemConstants.UNTRADEABLE;
                        toDrop.setFlag(b);
                    }
                    c.getPlayer().getMap().spawnItemDrop(c.getPlayer(), c.getPlayer(), toDrop, c.getPlayer().getPosition(), true, true);
                }
                break;
                //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="level">
            case "level":
                if (sub.length < 2){
                    player.yellowMessage("Syntax: !level <newlevel>");
                    break;
                }
                player.loseExp(player.getExp(), false, false);
                player.revertPlayerRates();
                player.setLevel(Math.min(Integer.parseInt(sub[1]), player.getMaxLevel()) - 1);
                player.setPlayerRates();
                player.levelUp(false);
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="saveall">
            case "saveall":
                for (World world : Server.getInstance().getWorlds()) {
                    for (MapleCharacter chr : world.getPlayerStorage().getAllCharacters()) {
                        chr.saveToDB();
                    }
                }
                String message = player.getName() + " used !saveall.";
                Server.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(5, message));
                player.message("All players saved successfully.");
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="levelpro">
            case "levelpro":
                if (sub.length < 2){
                    player.yellowMessage("Syntax: !levelpro <newlevel>");
                    break;
                }
                while (player.getLevel() < Math.min(255, Integer.parseInt(sub[1]))) {
                    player.levelUp(false);
                }
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="setstat">
            case "setstat":
                final int x = Short.parseShort(sub[1]);
                player.setStr(x);
                player.setDex(x);
                player.setInt(x);
                player.setLuk(x);
                player.updateSingleStat(MapleStat.STR, x);
                player.updateSingleStat(MapleStat.DEX, x);
                player.updateSingleStat(MapleStat.INT, x);
                player.updateSingleStat(MapleStat.LUK, x);
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="maxstat">
            case "maxstat":
                final String[] s = {"setstat", String.valueOf(Short.MAX_VALUE)};
                player.loseExp(player.getExp(), false, false);
                player.revertPlayerRates();
                player.setLevel(255);
                player.setPlayerRates();
                player.setFame(13337);
                player.setMaxHp(30000);
                player.setMaxMp(30000);
                player.updateSingleStat(MapleStat.LEVEL, 255);
                player.updateSingleStat(MapleStat.FAME, 13337);
                player.updateSingleStat(MapleStat.MAXHP, 30000);
                player.updateSingleStat(MapleStat.MAXMP, 30000);
                player.yellowMessage("Stats maxed out.");
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="maxskill">
            case "maxskill":
                for (MapleData skill_ : MapleDataProviderFactory.getDataProvider(new File(System.getProperty("wzpath") + "/" + "String.wz")).getData("Skill.img").getChildren()) {
                    try {
                        skill = SkillFactory.getSkill(Integer.parseInt(skill_.getName()));
                        if (GameConstants.isInJobTree(skill.getId(), player.getJob().getId())) {
                            player.changeSkillLevel(skill, (byte) skill.getMaxLevel(), skill.getMaxLevel(), -1);
                        }
                    } catch (NumberFormatException nfe) {
                        nfe.printStackTrace();
                        break;
                    } catch (NullPointerException npe) {
                        continue;
                    }
                }
                player.yellowMessage("Skills maxed out.");
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="search">
            case "search":
                if (sub.length < 3){
                    player.yellowMessage("Syntax: !search <type> <name>");
                    break;
                }
                StringBuilder sb = new StringBuilder();
                String search = StringUtil.joinStringFrom(sub, 2);
                long start = System.currentTimeMillis();//for the lulz
                MapleData data = null;
                MapleDataProvider dataProvider = MapleDataProviderFactory.getDataProvider(new File("wz/String.wz"));
                if (!sub[1].equalsIgnoreCase("ITEM")) {
                    if (sub[1].equalsIgnoreCase("NPC")) {
                        data = dataProvider.getData("Npc.img");
                    } else if (sub[1].equalsIgnoreCase("MOB") || sub[1].equalsIgnoreCase("MONSTER")) {
                        data = dataProvider.getData("Mob.img");
                    } else if (sub[1].equalsIgnoreCase("SKILL")) {
                        data = dataProvider.getData("Skill.img");
                    } else if (sub[1].equalsIgnoreCase("MAP")) {
                        sb.append("#bUse the '!m' command to find a map. If it finds a map with the same name, it will warp you to it.");
                    } else {
                        sb.append("#bInvalid search.\r\nSyntax: '!search [type] [name]', where [type] is NPC, ITEM, MOB, or SKILL.");
                    }
                    if (data != null) {
                        String name;
                        for (MapleData searchData : data.getChildren()) {
                            name = MapleDataTool.getString(searchData.getChildByPath("name"), "NO-NAME");
                            if (name.toLowerCase().contains(search.toLowerCase())) {
                                sb.append("#b").append(Integer.parseInt(searchData.getName())).append("#k - #r").append(name).append("\r\n");
                            }
                        }
                    }
                } else {
                    for (Pair<Integer, String> itemPair : MapleItemInformationProvider.getInstance().getAllItems()) {
                        if (sb.length() < 32654) {//ohlol
                            if (itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
                                //#v").append(id).append("# #k-
                                sb.append("#b").append(itemPair.getLeft()).append("#k - #r").append(itemPair.getRight()).append("\r\n");
                            }
                        } else {
                            sb.append("#bCouldn't load all items, there are too many results.\r\n");
                            break;
                        }
                    }
                }
                if (sb.length() == 0) {
                    sb.append("#bNo ").append(sub[1].toLowerCase()).append("s found.\r\n");
                }
                sb.append("\r\n#kLoaded within ").append((double) (System.currentTimeMillis() - start) / 1000).append(" seconds.");//because I can, and it's free
                c.announce(MaplePacketCreator.getNPCTalk(9010000, (byte) 0, sb.toString(), "00 00", (byte) 0));
                break;
                //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="jail">
            case "jail":
                if (sub.length < 2) {
                    player.yellowMessage("Syntax: !jail <playername> [<minutes>]");
                    break;
                }
                int minutesJailed = 5;
                if(sub.length >= 3) {
                    minutesJailed = Integer.valueOf(sub[2]);
                    if(minutesJailed <= 0) {
                        player.yellowMessage("Syntax: !jail <playername> [<minutes>]");
                        break;
                    }
                }
                victim = cserv.getPlayerStorage().getCharacterByName(sub[1]);
                if (victim != null) {
                    victim.addJailExpirationTime(minutesJailed * 60 * 1000);
                    int mapid = 300000012;
                    if(victim.getMapId() != mapid) {    // those gone to jail won't be changing map anyway
                        MapleMap target = cserv.getMapFactory().getMap(mapid);
                        MaplePortal targetPortal = target.getPortal(0);
                        victim.changeMap(target, targetPortal);
                        player.dropMessage(victim.getName() + " was jailed for " + minutesJailed + " minutes.");
                    } else {
                        player.dropMessage(victim.getName() + "'s time in jail has been extended for " + minutesJailed + " minutes.");
                    }
                } else {
                    player.dropMessage(sub[1] + " not found on this channel! Make sure your target is logged on and on the same channel as yours.");
                }
                break;
                //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="unjail">
            case "unjail":
                if (sub.length < 2) {
                    player.yellowMessage("Syntax: !unjail <playername>");
                    break;
                }
                victim = cserv.getPlayerStorage().getCharacterByName(sub[1]);
                if (victim != null) {
                    if(victim.getJailExpirationTimeLeft() <= 0) {
                        player.dropMessage("This player is already free.");
                        break;
                    }
                    victim.removeJailExpirationTime();
                    victim.dropMessage("By lack of concrete proof you are now unjailed. Enjoy freedom!");
                    player.dropMessage(victim.getName() + " was unjailed.");
                } else {
                    player.dropMessage(sub[1] + " not found on this channel! Make sure your target is logged on and on the same channel as yours.");
                }
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="job">
            case "job":
                if (sub.length == 2) {
                    player.changeJob(MapleJob.getById(Integer.parseInt(sub[1])));
                    player.equipChanged();
                } else if (sub.length == 3) {
                    victim = c.getChannelServer().getPlayerStorage().getCharacterByName(sub[1]);
                    victim.changeJob(MapleJob.getById(Integer.parseInt(sub[2])));
                    player.equipChanged();
                } else {
                    player.message("Syntax: !job <job id> <opt: IGN of another person>");
                }
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="unbug">
            case "unbug":
                c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.enableActions());
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="notice">
            case "notice":
                if (sub.length < 2){
                    player.yellowMessage("Syntax: !notice <message> ");
                    break;
                }
                Server.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(6, "[Notice] " + StringUtil.joinStringFrom(sub, 1)));
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="blink">
            case "blink":
                String blink = "";
                String numericalvalue = ""; // for check
                Random randb = new Random();
                int numchar, randchars;
                String asciitochar;
                if (sub.length > 1) {
                    for (int i = 0; i < Integer.parseInt(sub[1]); i++) {
                        numchar = randb.nextInt(126) + 33;
                        if (numchar < 127) {
                            asciitochar = Character.toString((char) numchar);
                            blink += asciitochar;
                            numericalvalue += ", " + numchar;
                        } else {
                            numchar = randb.nextInt(60) + 33;
                            asciitochar = Character.toString((char) numchar);
                            blink += asciitochar;
                            numericalvalue += ", " + numchar;
                        }
                    }
                } else {
                    randchars = randb.nextInt(15) + 1;
                    for (int i = 0; i < randchars; i++) {
                        numchar = randb.nextInt(126) + 33;
                        if (numchar < 127) {
                            asciitochar = Character.toString((char) numchar);
                            blink += asciitochar;
                            numericalvalue += ", " + numchar;
                        } else {
                            numchar = randb.nextInt(60) + 33;
                            asciitochar = Character.toString((char) numchar);
                            blink += asciitochar;
                            numericalvalue += ", " + numchar;
                        }
                    }
                }
                if (blink.charAt(0) == '@') {
                    blink = '#' + blink;
                }
                player.getMap().setTriviaEvents(te);
                player.getMap().getTriviaEvents().setActive(true);
                player.getMap().getTriviaEvents().setResult(blink);
                player.getMap().getTriviaEvents().setEvent((byte) 2);
                player.getMap().broadcastMessage(MaplePacketCreator.sendYellowTip("[Blink] " + blink));
                break;
                //</editor-fold>  
            //<editor-fold defaultstate="collapsed" desc="hitman">
            case "hitman":
            case "hit":
                rand = new Random();
                int num = 0;
                if (sub.length > 1) {
                    num = Integer.parseInt(sub[1]);
                } else {
                    num = rand.nextInt(14) + 1;
                }
                if (num < 1000 && num > 0) {
                    ResultSet rs;
                    // String answer="";
                    String forshow = "";
                    List<MapleCharacter> players = new ArrayList<>();
                    for (MapleCharacter a1 : player.getMap().getCharacters()) {
                        players.add(a1);
                    }
                    try {
                        PreparedStatement ps;
                        Connection con = DatabaseConnection.getConnection();
                        ps = con.prepareStatement("SELECT name FROM characters ORDER BY RAND() LIMIT " + num);
                        rs = ps.executeQuery();
                        while (rs.next()) {
                            forshow += rs.getString("name") + ", ";
                        }
                    } catch (SQLException sqlexc) {
                        System.out.print("Error selecting wordlist: " + sqlexc);
                    }
                    forshow = forshow.substring(0, forshow.length() - 2);
                    player.getMap().broadcastMessage(MaplePacketCreator.sendYellowTip("[Hitman] Player(s) chosen:"));
                    player.getMap().broadcastMessage(MaplePacketCreator.sendYellowTip("[Hitman] " + forshow));
                    player.getMap().setTriviaEvents(te);
                    player.getMap().getTriviaEvents().setActive(true);
                    player.getMap().getTriviaEvents().setResult(forshow.replaceAll(",", ""));
                    player.getMap().getTriviaEvents().setEvent((byte) 1);
                } else {
                    player.dropMessage(5, "Error. Please insert a number between 0 and 1000");
                }
                break;
                //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="unscramble">
            case "unscramble":
                boolean finishedscramble = false;
                rand = new Random();
                int randnm;
                if (sub.length > 1) {
                    if (sub[1].length() > 2) {
                        String input = sub[1];
                        char[] charinput = input.toCharArray();
                        String output = "";
                        while (!finishedscramble) {
                            if (input.length() == output.length()) {
                                finishedscramble = true;
                            } else {
                                randnm = rand.nextInt(input.length());
                                if (charinput[randnm] != 0) {
                                    output += charinput[randnm];
                                    charinput[randnm] = 0;
                                }
                            }
                        }
                        player.setChalkboard(output);
                        player.getMap().broadcastMessage(MaplePacketCreator.useChalkboard(player, false));
                        player.getMap().setTriviaEvents(te);
                        player.getMap().getTriviaEvents().setActive(true);
                        player.getMap().getTriviaEvents().setResult(input);
                        player.getMap().getTriviaEvents().setEvent((byte) 3);
                    } else {
                        player.dropMessage(5, "Error. Please insert a word with 3 or more letters");
                    }
                }
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="reverse">
            case "reverse":
                if (sub.length > 1) {
                    String input = sub[1], output = "";
                    for (int i = input.length() - 1; i > -1; i--) {
                        output += input.charAt(i);
                    }
                    player.setChalkboard(output);
                    player.getMap().broadcastMessage(MaplePacketCreator.useChalkboard(player, false));
                    player.getMap().setTriviaEvents(te);
                    player.getMap().getTriviaEvents().setActive(true);
                    player.getMap().getTriviaEvents().setResult(input);
                    player.getMap().getTriviaEvents().setEvent((byte) 4);
                } else {
                    player.dropMessage(5, "Error. Type the command as follows !reverse <word>");
                }
                break;
            //</editor-fold>
            //<editor-fold defaultstate="collapsed" desc="nti">
            case "nti":
                if (sub.length > 2) {
                    Item toDrop;
                    if (MapleItemInformationProvider.getInstance().getInventoryType(Integer.parseInt(sub[1])) == MapleInventoryType.EQUIP) {
                        toDrop = MapleItemInformationProvider.getInstance().getEquipById(Integer.parseInt(sub[1]));
                    } else {
                        toDrop = new Item(Integer.parseInt(sub[1]), (short) 0, (short) 0, 1);
                    }
                    c.getPlayer().getMap().spawnItemDrop(c.getPlayer(), c.getPlayer(), toDrop, c.getPlayer().getPosition(), false, true);
                    player.getMap().broadcastMessage(MaplePacketCreator.sendYellowTip("[NTI] Name the item you see before you, don't forget too capitalize correctly!"));
                    player.getMap().setTriviaEvents(te);
                    player.getMap().getTriviaEvents().setActive(true);
                    player.getMap().getTriviaEvents().setResult(StringUtil.joinStringFrom(sub, 2));
                    player.getMap().getTriviaEvents().setEvent((byte) 7);
                } else {
                    player.dropMessage(5, "Error. type the command as follows : !nti <id> <answer>");
                }
                break;
            //</editor-fold>   
            //<editor-fold defaultstate="collapsed" desc="scat">
            case "scat":
                if (sub.length > 2) {
                    String category = sub[1];
                    String answer = StringUtil.joinStringFrom(sub, 2).toLowerCase();
                    // String answer = sub[2].toLowerCase();
                    player.setChalkboard((category + " - " + answer.charAt(0)));
                    player.getMap().broadcastMessage(MaplePacketCreator.useChalkboard(player, false));
                    player.getMap().setTriviaEvents(te);
                    player.getMap().getTriviaEvents().setActive(true);
                    player.getMap().getTriviaEvents().setResult(answer);
                    player.getMap().getTriviaEvents().setEvent((byte) 6);
                } else {
                    player.dropMessage(5, "Error. type the command as follows : !scat <category> <answer>");
                }
                break;
            //</editor-fold>  
            //<editor-fold defaultstate="collapsed" desc="speed">
            case "speed":
                String text = StringUtil.joinStringFrom(sub, 1);
                if (sub.length > 1) {
                    player.getMap().broadcastMessage(MaplePacketCreator.sendYellowTip("[SpeedType] " + text));
                    player.getMap().setTriviaEvents(te);
                    player.getMap().getTriviaEvents().setActive(true);
                    player.getMap().getTriviaEvents().setResult(text);
                    player.getMap().getTriviaEvents().setEvent((byte) 5);
                } else {
                    player.dropMessage(5, "Error. Please insert a sentence");
                }
                break;
            //</editor-fold>
            default:
                return false;
        }
        return true;
    }
    private static void hardsetItemStats(Equip equip, short stat) {
        equip.setStr(stat);
        equip.setDex(stat);
        equip.setInt(stat);
        equip.setLuk(stat);
        equip.setMatk(stat);
        equip.setWatk(stat);
        equip.setAcc(stat);
        equip.setAvoid(stat);
        equip.setJump(stat);
        equip.setSpeed(stat);
        equip.setWdef(stat);
        equip.setMdef(stat);
        equip.setHp(stat);
        equip.setMp(stat);

        byte flag = equip.getFlag();
        flag |= ItemConstants.UNTRADEABLE;
        equip.setFlag(flag);
    }  
}

