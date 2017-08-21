/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package client.command;

import client.MapleCharacter;
import client.MapleClient;
import client.MapleStat;
import client.Skill;
import client.SkillFactory;
import client.inventory.MapleInventoryType;
import constants.GameConstants;
import constants.ServerConstants;
import java.io.File;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.TimeZone;
import java.util.Timer;
import java.util.TimerTask;

import net.server.Server;
import net.server.channel.Channel;
import provider.MapleData;
import provider.MapleDataProviderFactory;
import scripting.npc.NPCScriptManager;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.events.gm.MapleEvent;
import server.gachapon.MapleGachapon;
import server.life.MapleMonster;
import server.life.MapleMonsterInformationProvider;
import server.life.MonsterDropEntry;
import server.maps.FieldLimit;
import tools.DatabaseConnection;
import tools.FilePrinter;
import tools.MaplePacketCreator;
import tools.Pair;
import tools.Randomizer;
import tools.StringUtil;

/**
 *
 * @author Hasharoni
 */
public class PlayerCommands {
     private static HashMap<String, Integer> gotomaps = new HashMap<String, Integer>();

	private static String[] tips = {
		"Please only use @gm in emergencies or to report somebody.",
		"To report a bug or make a suggestion, use the forum.",
		"Please do not use @gm to ask if a GM is online.",
		"Do not ask if you can receive help, just state your issue.",
		"Do not say 'I have a bug to report', just state it.",
	};

	private static String[] songs = {
		"Jukebox/Congratulation", 
		"Bgm00/SleepyWood", 
		"Bgm00/FloralLife", 
		"Bgm00/GoPicnic", 
		"Bgm00/Nightmare", 
		"Bgm00/RestNPeace",
		"Bgm01/AncientMove", 
		"Bgm01/MoonlightShadow", 
		"Bgm01/WhereTheBarlogFrom", 
		"Bgm01/CavaBien", 
		"Bgm01/HighlandStar", 
		"Bgm01/BadGuys",
		"Bgm02/MissingYou", 
		"Bgm02/WhenTheMorningComes", 
		"Bgm02/EvilEyes", 
		"Bgm02/JungleBook", 
		"Bgm02/AboveTheTreetops",
		"Bgm03/Subway", 
		"Bgm03/Elfwood", 
		"Bgm03/BlueSky", 
		"Bgm03/Beachway",
		"Bgm03/SnowyVillage",
		"Bgm04/PlayWithMe", 
		"Bgm04/WhiteChristmas", 
		"Bgm04/UponTheSky",
		"Bgm04/ArabPirate", 
		"Bgm04/Shinin'Harbor",
		"Bgm04/WarmRegard",
		"Bgm05/WolfWood", 
		"Bgm05/DownToTheCave", 
		"Bgm05/AbandonedMine", 
		"Bgm05/MineQuest",
		"Bgm05/HellGate",
		"Bgm06/FinalFight", 
		"Bgm06/WelcomeToTheHell",
		"Bgm06/ComeWithMe", 
		"Bgm06/FlyingInABlueDream", 
		"Bgm06/FantasticThinking",
		"Bgm07/WaltzForWork", 
		"Bgm07/WhereverYouAre", 
		"Bgm07/FunnyTimeMaker", 
		"Bgm07/HighEnough", 
		"Bgm07/Fantasia",
		"Bgm08/LetsMarch", 
		"Bgm08/ForTheGlory", 
		"Bgm08/FindingForest", 
		"Bgm08/LetsHuntAliens", 
		"Bgm08/PlotOfPixie",
		"Bgm09/DarkShadow", 
		"Bgm09/TheyMenacingYou", 
		"Bgm09/FairyTale", 
		"Bgm09/FairyTalediffvers",
		"Bgm09/TimeAttack",
		"Bgm10/Timeless", 
		"Bgm10/TimelessB", 
		"Bgm10/BizarreTales",
		"Bgm10/TheWayGrotesque",
		"Bgm10/Eregos",
		"Bgm11/BlueWorld", 
		"Bgm11/Aquarium",
		"Bgm11/ShiningSea",
		"Bgm11/DownTown", 
		"Bgm11/DarkMountain",
		"Bgm12/AquaCave", 
		"Bgm12/DeepSee", 
		"Bgm12/WaterWay", 
		"Bgm12/AcientRemain",
		"Bgm12/RuinCastle",
		"Bgm12/Dispute",
		"Bgm13/CokeTown", 
		"Bgm13/Leafre", 
		"Bgm13/Minar'sDream", 
		"Bgm13/AcientForest", 
		"Bgm13/TowerOfGoddess",
		"Bgm14/DragonLoad", 
		"Bgm14/HonTale", 
		"Bgm14/CaveOfHontale", 
		"Bgm14/DragonNest", 
		"Bgm14/Ariant", 
		"Bgm14/HotDesert",
		"Bgm15/MureungHill", 
		"Bgm15/MureungForest", 
		"Bgm15/WhiteHerb",
		"Bgm15/Pirate",
		"Bgm15/SunsetDesert", 
		"Bgm16/Duskofgod", 
		"Bgm16/FightingPinkBeen", 
		"Bgm16/Forgetfulness", 
		"Bgm16/Remembrance", 
		"Bgm16/Repentance", 
		"Bgm16/TimeTemple", 
		"Bgm17/MureungSchool1",
		"Bgm17/MureungSchool2", 
		"Bgm17/MureungSchool3",
		"Bgm17/MureungSchool4", 
		"Bgm18/BlackWing", 
		"Bgm18/DrillHall", 
		"Bgm18/QueensGarden",
		"Bgm18/RaindropFlower", 
		"Bgm18/WolfAndSheep",
		"Bgm19/BambooGym",
		"Bgm19/CrystalCave", 
		"Bgm19/MushCatle", 
		"Bgm19/RienVillage",
		"Bgm19/SnowDrop", 
		"Bgm20/GhostShip", 
		"Bgm20/NetsPiramid",
		"Bgm20/UnderSubway", 
		"Bgm21/2021year",
		"Bgm21/2099year", 
		"Bgm21/2215year", 
		"Bgm21/2230year",
		"Bgm21/2503year",
		"Bgm21/KerningSquare",
		"Bgm21/KerningSquareField", 
		"Bgm21/KerningSquareSubway", 
		"Bgm21/TeraForest",
		"BgmEvent/FunnyRabbit",
		"BgmEvent/FunnyRabbitFaster", 
		"BgmEvent/wedding", 
		"BgmEvent/weddingDance",
		"BgmEvent/wichTower",
		"BgmGL/amoria", 
		"BgmGL/Amorianchallenge", 
		"BgmGL/chapel", 
		"BgmGL/cathedral", 
		"BgmGL/Courtyard", 
		"BgmGL/CrimsonwoodKeep",
		"BgmGL/CrimsonwoodKeepInterior", 
		"BgmGL/GrandmastersGauntlet",
		"BgmGL/HauntedHouse", 
		"BgmGL/NLChunt",
		"BgmGL/NLCtown",
		"BgmGL/NLCupbeat", 
		"BgmGL/PartyQuestGL", 
		"BgmGL/PhantomForest", 
		"BgmJp/Feeling", 
		"BgmJp/BizarreForest", 
		"BgmJp/Hana",
		"BgmJp/Yume", 
		"BgmJp/Bathroom", 
		"BgmJp/BattleField", 
		"BgmJp/FirstStepMaster",
		"BgmMY/Highland",
		"BgmMY/KualaLumpur",
		"BgmSG/BoatQuay_field", 
		"BgmSG/BoatQuay_town", 
		"BgmSG/CBD_field",
		"BgmSG/CBD_town", 
		"BgmSG/Ghostship", 
		"BgmUI/ShopBgm", 
		"BgmUI/Title"
	};

	static {
		gotomaps.put("gmmap", 180000000);
		gotomaps.put("southperry", 60000);
		gotomaps.put("amherst", 1010000);
		gotomaps.put("henesys", 100000000);
		gotomaps.put("ellinia", 101000000);
		gotomaps.put("perion", 102000000);
		gotomaps.put("kerning", 103000000);
		gotomaps.put("lith", 104000000);
		gotomaps.put("sleepywood", 105040300);
		gotomaps.put("florina", 110000000);
		gotomaps.put("orbis", 200000000);
		gotomaps.put("happy", 209000000);
		gotomaps.put("elnath", 211000000);
		gotomaps.put("ludi", 220000000);
		gotomaps.put("aqua", 230000000);
		gotomaps.put("leafre", 240000000);
		gotomaps.put("mulung", 250000000);
		gotomaps.put("herb", 251000000);
		gotomaps.put("omega", 221000000);
		gotomaps.put("korean", 222000000);
		gotomaps.put("nlc", 600000000);
		gotomaps.put("excavation", 990000000);
		gotomaps.put("pianus", 230040420);
		gotomaps.put("horntail", 240060200);
		gotomaps.put("mushmom", 100000005);
		gotomaps.put("griffey", 240020101);
		gotomaps.put("manon", 240020401);
		gotomaps.put("horseman", 682000001);
		gotomaps.put("balrog", 105090900);
		gotomaps.put("zakum", 211042300);
		gotomaps.put("papu", 220080001);
		gotomaps.put("showa", 801000000);
		gotomaps.put("guild", 200000301);
		gotomaps.put("shrine", 800000000);
		gotomaps.put("skelegon", 240040511);
		gotomaps.put("hpq", 100000200);
		gotomaps.put("ht", 240050400);
		gotomaps.put("fm", 910000000);
	}
  public static boolean executePlayerCommand(Channel cserv, Server srv, MapleClient c, String[] sub){
      MapleCharacter player = c.getPlayer();
       String choice = sub[0].substring(1);     
                switch(choice) {
                case "help":
		case "commands":
                case "playercommands":
                        c.getAbstractPlayerInteraction().openNpc(9201143, "commands");
                        break;
                    
		case "time":
			DateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
			dateFormat.setTimeZone(TimeZone.getTimeZone("GMT+3:00"));
			player.yellowMessage("XStory Server Time: " + dateFormat.format(new Date()));
			break;
                    
		case "staff":
			player.yellowMessage("MapleSolaxia Staff");
			player.yellowMessage("Aria - Administrator");
			player.yellowMessage("Twdtwd - Administrator");
			player.yellowMessage("Exorcist - Developer");
			player.yellowMessage("SharpAceX - Developer");
			player.yellowMessage("Zygon - Freelance Developer");
			player.yellowMessage("SourMjolk - Game Master");
			player.yellowMessage("Kanade - Game Master");
			player.yellowMessage("Kitsune - Game Master");
                        player.yellowMessage("MapleSolaxiaV2 Staff");
                        player.yellowMessage("Ronan - Freelance Developer");
                        player.yellowMessage("Vcoc - Freelance Developer");
			break;
                    
		case "lastrestart":
		case "uptime":
			long milliseconds = System.currentTimeMillis() - Server.uptime;
			int seconds = (int) (milliseconds / 1000) % 60 ;
			int minutes = (int) ((milliseconds / (1000*60)) % 60);
			int hours   = (int) ((milliseconds / (1000*60*60)) % 24);
			int days    = (int) ((milliseconds / (1000*60*60*24)));
 			player.yellowMessage("Server has been online for " + days + " days " + hours + " hours " + minutes + " minutes and " + seconds + " seconds.");
			break;
                  case "emo":
                player.setHp(0);
                player.updateSingleStat(MapleStat.HP, 0);
                break;
            case "dropinv":
                for (int i = 0; i < player.getInventory(MapleInventoryType.EQUIP).getSlotLimit() + 1; i++) {
                    MapleInventoryManipulator.drop(c, MapleInventoryType.EQUIP, (short) i, (short) 1);
                }
                break;
            case "randlook":
                for (int i = -24; i < 0; i++) {
                    if (i != -11) {
                        if (player.getInventory(MapleInventoryType.EQUIPPED).getItem((short) i) != null) {
                            MapleInventoryManipulator.unequip(c, (short) i, player.getInventory(MapleInventoryType.EQUIP).getNextFreeSlot());
                        }
                    }
                }
                short[] slots = {-9, -7, -2, -1, -49, -13, -5, -6, -8};
                int[] types = {110, 107, 101, 100, 114, 111, 104, 106, 108};
                short chosenrand = 666;

                for (int i = 0; i < slots.length; i++) {
                    chosenrand = player.getRandomslottype(types[i], player);
                    if (chosenrand != 666) {
                        MapleInventoryManipulator.equip(c, chosenrand, slots[i]);
                    }
                }
                break; 
                case "s":
            case "smega":
            /*    if (sub.length > 1) {
                    if (!c.isJailed(c) && !player.isMuted() && !player.isPermmute()) {
                        if ((player.getSmegacd() > player.getSmegadelay() * 1000) || (c.getWorldServer().isPlayerTrivia() && player.getTcounter() != 3) || (ServerConstants.isautotriv && player.getTcounter() != 3)) {
                            String text = StringUtil.joinStringFrom(sub, 1);
                            if (player.getInventory(MapleInventoryType.CASH).findById(5072000) != null || c.getWorldServer().isPlayerTrivia() || player.infiniteSmega()) {
                                if (!player.getSmegaPrefix().equals("0")) {
                                    Server.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(3, c.getChannel(), player.getMedalText() + player.getName() + " : " + text, true));
                                } else {
                                    Server.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(3, c.getChannel(), player.getMedalText() + player.getName() + " : " + text, true));
                                }
                                String gender = "";
                                if(c.getWorldServer().isPlayerTrivia() || ServerConstants.isautotriv){
                                    if(player.getGender() == 0)
                                        gender = "He";
                                    else if(player.getGender() == 1)
                                        gender = "She";
                                    else
                                        gender = "It";
                                }
                                if (c.getWorldServer().isPlayerTrivia()) {
                                    if (text.toLowerCase().equals(ServerConstants.playertriviaAnswer) && !player.getName().equals(ServerConstants.playertriviaGuy)) {
                                        Server.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(6, "[Answer] " + player.getName() + " has written down the correct answer which was '" + ServerConstants.playertriviaAnswer + "'. " + gender + " has won 1 Participation Point."));
                                        player.gainParticipationPoints(1);
                                        ServerConstants.playertriviaAnswer = "";
                                        ServerConstants.playertriviaGuy = "";
                                        c.getWorldServer().setPlayerTrivia(false);
                                    }
                                    if (player.getTcounter() == 3) {
                                        player.setTcounter(0);
                                    }
                                    player.setTcounter(player.getTcounter() + 1);
                                }
                                
                                if(ServerConstants.isautotriv){
                                    if(text.toLowerCase().equals(ServerConstants.autotrivans.toLowerCase())){
                                        Server.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(6, "[Answer] " + player.getName() + " has written down the correct answer which was '" + ServerConstants.autotrivans + "'. " + gender + " has won 1 Participation Point."));
                                        player.gainParticipationPoints(1);
                                        ServerConstants.isautotriv = false;
                                    }
                                     if (player.getTcounter() == 3) {
                                        player.setTcounter(0);
                                    }
                                    player.setTcounter(player.getTcounter() + 1);
                                }
                                
                                if (!player.infiniteSmega()) {
                                    MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, 5072000, (short) 1, false, true);
                                }

                                player.setSmegacd(System.currentTimeMillis());
                            } else {
                                player.dropMessage(5, "You don't have any smega. ");
                            }
                        } else {
                            player.dropMessage(6, "Please wait " + player.getSmegadelay() + " seconds between each message.");
                        }
                    } else {
                        player.dropMessage(5, "You're not allowed to smega.");
                    }
                } else {
                    player.dropMessage(5, "Error. Please type out a message.");
                } */
                if(player.getInventory(MapleInventoryType.CASH).findById(5072000) != null){
                    String text = StringUtil.joinStringFrom(sub, 1);
                      Server.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(3, c.getChannel(), player.getMedalText() + player.getName() + " : " + text, true));
                     MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, 5072000, (short) 1, false, true);  
                }
                else
                    player.dropMessage(5,"You have no smega!");
                break;  
		case "gacha":
			MapleGachapon.Gachapon gacha = null;
			String search = StringUtil.joinStringFrom(sub, 1);
			String gachaName = "";
			String [] names = {"Henesys", "Ellinia", "Perion", "Kerning City", "Sleepywood", "Mushroom Shrine", "Showa Spa Male", "Showa Spa Female", "New Leaf City", "Nautilus Harbor"};
			int [] ids = {9100100, 9100101, 9100102, 9100103, 9100104, 9100105, 9100106, 9100107, 9100109, 9100117};
			for (int i = 0; i < names.length; i++){
				if (search.equalsIgnoreCase(names[i])){
					gachaName = names[i];
					gacha = MapleGachapon.Gachapon.getByNpcId(ids[i]);
				}
			}
			if (gacha == null){
				player.yellowMessage("Please use @gacha <name> where name corresponds to one of the below:");
				for (String name : names){
					player.yellowMessage(name);
				}
                        break;
			}
			String output = "The #b" + gachaName + "#k Gachapon contains the following items.\r\n\r\n";
			for (int i = 0; i < 2; i++){
				for (int id : gacha.getItems(i)){
					output += "-" + MapleItemInformationProvider.getInstance().getName(id) + "\r\n";
				}
			}
			output += "\r\nPlease keep in mind that there are items that are in all gachapons and are not listed here.";
			c.announce(MaplePacketCreator.getNPCTalk(9010000, (byte) 0, output, "00 00", (byte) 0));
			break;
                 case "job":
                NPCScriptManager.getInstance().start(c, 2012022, null, null);
                break;
            case "shop":
            case "a":
                NPCScriptManager.getInstance().start(c, 1092019, null, null);
                break;
            case "sprefix":
                NPCScriptManager.getInstance().start(c, 9201052, null, null);
                break;
            case "infinity":
            case "aio":
            case "all":
                NPCScriptManager.getInstance().start(c, 2141013, null, null);
                break;
            case "ioc":
            case "bigbad":
                NPCScriptManager.getInstance().start(c, 9000053, null, null);
                break;
            case "spinel":
                NPCScriptManager.getInstance().start(c, 9000020, null, null);
                break;
            case "minigames":
                NPCScriptManager.getInstance().start(c, 1012008, null, null);
                break;
            case "styler":
            case "kin":
            case "nimakin":
            case "style":
                /* 
                      if(player.isMale()) {
            NPCScriptManager.getInstance().start(c, 9900000, null, null);
                      }
                    else  {
            NPCScriptManager.getInstance().start(c, 9900001, null, null);
                      } */
                NPCScriptManager.getInstance().start(c, 1530041, null, null);
                break;
            case "vp":
                 NPCScriptManager.getInstance().start(c, 2084001, null, null);
                break;
            case "fp":
               NPCScriptManager.getInstance().start(c, 2141009, null, null);
                break; 
            case "jq":
                NPCScriptManager.getInstance().start(c, 1095000, null, null);
                break;

            case "fm":
                if (sub.length > 1) {
                    if (Integer.parseInt(sub[1]) >= 1 && Integer.parseInt(sub[1]) <= 22) {
                        player.changeMap(910000000 + Integer.parseInt(sub[1]));
                    } else {
                        player.dropMessage("Invalid FM Room");
                    }
                } else {
                    player.changeMap(910000000);
                }
                break;

            case "expfix":
                player.setExp(0);
                player.updateSingleStat(MapleStat.EXP, 0);
                ;
                break; 
                case "maxskills":  
                     for (MapleData skill_ : MapleDataProviderFactory.getDataProvider(new File(System.getProperty("wzpath") + "/" + "String.wz")).getData("Skill.img").getChildren()) {
                    try {
                        Skill skill = SkillFactory.getSkill(Integer.parseInt(skill_.getName()));
                        if (GameConstants.isInJobTree(skill.getId(), player.getJob().getId())) {
                            if (skill.getId() == 21001001) {
                                player.changeSkillLevel(skill, (byte) 0, 0, -1);
                            } else if (skill.getId() == 2311002) {
                                player.changeSkillLevel(skill, (byte) 0, 0, -1);
                            } else if (skill.getId() == 5001005) {
                                player.changeSkillLevel(skill, (byte) 0, 0, -1);
                            } else if (skill.getId() == 2111003) {
                                player.changeSkillLevel(skill, (byte) 0, 0, -1);
                            } else if (skill.getId() == 4121006) {
                                player.changeSkillLevel(skill, (byte) 0, 0, -1);
                            } else if (skill.getId() == 5101007) {
                                player.changeSkillLevel(skill, (byte) 0, 0, -1);
                            } else if (skill.getId() == 5221006) {
                                player.changeSkillLevel(skill, (byte) 0, 0, -1);
                            } else if (skill.getId() == 1221011) {
                                player.changeSkillLevel(skill, (byte) 0, 0, -1);
                            } else if (skill.getId() == 13111005) {
                                player.changeSkillLevel(skill, (byte) 0, 0, -1);
                            } else {
                                player.changeSkillLevel(skill, (byte) skill.getMaxLevel(), skill.getMaxLevel(), -1);
                            }
                        }
                    } catch (NumberFormatException nfe) {
                        break;
                    } catch (NullPointerException npe) {
                        continue;
                    }
                }
                    break;
                
            case "str": 
            case "dex":
            case "int":
            case "luk":
                int amount = Integer.parseInt(sub[1]);
                boolean str = sub[0].equalsIgnoreCase("str");
                boolean Int = sub[0].equalsIgnoreCase("int");
                boolean luk = sub[0].equalsIgnoreCase("luk");
                boolean dex = sub[0].equalsIgnoreCase("dex");

                int stat = (str ? player.getStr() : (Int ? player.getInt() : (luk ? player.getLuk() : player.getDex())));
                MapleStat maplestat = (str ? MapleStat.STR : (Int ? MapleStat.INT : (luk ? MapleStat.LUK : MapleStat.DEX)));

                if (sub.length == 0 || amount == 0) {
                    if (stat < 32767) {
                        int reduction = Math.min(32767 - stat, player.getRemainingAp());
                        if (str) {
                            player.setStr(stat + reduction);
                        } else if (Int) {
                            player.setInt(stat + reduction);
                        } else if (luk) {
                            player.setLuk(stat + reduction);
                        } else if (dex) {
                            player.setDex(stat + reduction);
                        }
                        player.updateSingleStat(MapleStat.STR, player.getStr());
                        player.updateSingleStat(MapleStat.DEX, player.getDex());
                        player.updateSingleStat(MapleStat.INT, player.getInt());
                        player.updateSingleStat(MapleStat.LUK, player.getLuk());
                        player.setRemainingAp(player.getRemainingAp() - reduction);
                        player.updateSingleStat(MapleStat.AVAILABLEAP, player.getRemainingAp());
                    }

                } else if ((stat + amount <= 32767) || (stat + amount < 4)) {
                    if (amount <= player.getRemainingAp()) {
                        if (str) {
                            player.setStr(stat + amount);
                        } else if (Int) {
                            player.setInt(stat + amount);
                        } else if (luk) {
                            player.setLuk(stat + amount);
                        } else if (dex) {
                            player.setDex(stat + amount);
                        }
                        player.updateSingleStat(MapleStat.STR, player.getStr());
                        player.updateSingleStat(MapleStat.DEX, player.getDex());
                        player.updateSingleStat(MapleStat.INT, player.getInt());
                        player.updateSingleStat(MapleStat.LUK, player.getLuk());
                        player.setRemainingAp(player.getRemainingAp() - amount);
                        player.updateSingleStat(MapleStat.AVAILABLEAP, player.getRemainingAp());
                    }
                }

                break;
                
                
		case "whatdropsfrom":
			if (sub.length < 2) {
				player.dropMessage(5, "Please do @whatdropsfrom <monster name>");
                        break;
			}
			String monsterName = StringUtil.joinStringFrom(sub, 1);
			output = "";
			int limit = 3;
			Iterator<Pair<Integer, String>> listIterator = MapleMonsterInformationProvider.getMobsIDsFromName(monsterName).iterator();
			for (int i = 0; i < limit; i++) {
				if(listIterator.hasNext()) {
					Pair<Integer, String> data = listIterator.next();
					int mobId = data.getLeft();
					String mobName = data.getRight();
					output += mobName + " drops the following items:\r\n\r\n";
					for (MonsterDropEntry drop : MapleMonsterInformationProvider.getInstance().retrieveDrop(mobId)){
						try {
							String name = MapleItemInformationProvider.getInstance().getName(drop.itemId);
							if (name.equals("null") || drop.chance == 0){
								continue;
							}
							float chance = 1000000 / drop.chance / player.getDropRate();
							output += "- " + name + " (1/" + (int) chance + ")\r\n";
						} catch (Exception ex){
                                                        ex.printStackTrace();
							continue;
						}
					}
					output += "\r\n";
				}
			}
			c.announce(MaplePacketCreator.getNPCTalk(9010000, (byte) 0, output, "00 00", (byte) 0));
			break;
                    
		case "whodrops":
			if (sub.length < 2) {
				player.dropMessage(5, "Please do @whodrops <item name>");
                        break;
			}
			String searchString = StringUtil.joinStringFrom(sub, 1);
			output = "";
			listIterator = MapleItemInformationProvider.getInstance().getItemDataByName(searchString).iterator();
			if(listIterator.hasNext()) {
				int count = 1;
				while(listIterator.hasNext() && count <= 3) {
					Pair<Integer, String> data = listIterator.next();
					output += "#b" + data.getRight() + "#k is dropped by:\r\n";
					try {
						PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM drop_data WHERE itemid = ? LIMIT 50");
						ps.setInt(1, data.getLeft());
						ResultSet rs = ps.executeQuery();
						while(rs.next()) {
							String resultName = MapleMonsterInformationProvider.getMobNameFromID(rs.getInt("dropperid"));
							if (resultName != null) {
								output += resultName + ", ";
							}
						}
						rs.close();
						ps.close();
					} catch (Exception e) {
						player.dropMessage("There was a problem retreiving the required data. Please try again.");
						e.printStackTrace();
						break;
					}
					output += "\r\n\r\n";
					count++;
				}
			} else {
				player.dropMessage(5, "The item you searched for doesn't exist.");
                        break;
			}
			c.announce(MaplePacketCreator.getNPCTalk(9010000, (byte) 0, output, "00 00", (byte) 0));
			break;
                    
		case "dispose":
			NPCScriptManager.getInstance().dispose(c);
			c.announce(MaplePacketCreator.enableActions());
			c.removeClickedNPC();
			player.message("You've been disposed.");
			break;
                    
                case "equiplv":
                        player.showAllEquipFeatures();
                        break;
                case "go":
                    if(sub.length > 1)
                        if(gotomaps.containsKey(sub[1]))
                            player.changeMap(gotomaps.get(sub[1]));
                    break;                    
		case "rates":
			//c.resetVoteTime();
			player.yellowMessage("BOSSDROP RATE");
			player.message(">>Total BOSSDROP Rate: " + c.getWorldServer().getBossDropRate() + "x");
                        player.message(">>------------------------------------------------");
                        
			player.yellowMessage("DROP RATE");
                        player.message(">>Base DROP Rate: " + c.getWorldServer().getDropRate() + "x");
                        player.message(">>Your DROP Rate: " + player.getRawDropRate() + "x");
                        if(player.getCouponDropRate() != 1) player.message(">>Your Coupon DROP Rate: " + player.getCouponDropRate() + "x");
                        player.message(">>------------------------------------------------");
			player.message(">>Total DROP Rate: " + player.getDropRate() + "x");

			player.yellowMessage("MESO RATE");
			player.message(">>Base MESO Rate: " + c.getWorldServer().getMesoRate() + "x");
                        player.message(">>Your MESO Rate: " + player.getRawMesoRate() + "x");
                        if(player.getCouponMesoRate() != 1) player.message(">>Your Coupon MESO Rate: " + player.getCouponMesoRate() + "x");
                        player.message(">>------------------------------------------------");
			player.message(">>Total MESO Rate: " + player.getMesoRate() + "x");

			player.yellowMessage("EXP RATE");
			player.message(">>Base EXP Rate: " + c.getWorldServer().getExpRate() + "x");
                        player.message(">>Your EXP Rate: " + player.getRawExpRate() + "x");
                        if(player.getCouponExpRate() != 1) player.message(">>Your Coupon EXP Rate: " + player.getCouponExpRate() + "x");
                        player.message(">>------------------------------------------------");
                        player.message(">>Total EXP Rate: " + player.getExpRate() + "x");
			
			break;
                    
                case "online2":
                String text = "Online Players : ";
                String cc1 = "Players in Channel 1: ",
                 cc2 = "Players in Channel 2: ",
                 cc3 = "Players in Channel 3: ";
                for (MapleCharacter chrs : c.getWorldServer().getPlayerStorage().getAllCharacters()) {
                    if (!chrs.isGM()) {
                        switch (chrs.getClient().getChannel()) {
                            case 1:
                                cc1 += chrs.getName() + ", ";

                                break;
                            case 2:
                                cc2 += chrs.getName() + ", ";

                                break;
                            case 3:
                                cc3 += chrs.getName() + ", ";

                                break;
                        }
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

                player.dropMessage(6, text);
                player.dropMessage(6, cc1);
                player.dropMessage(6, cc2);
                player.dropMessage(6, cc3);
                break;
                    
            case "online":
                int allplayers = 0;
                for (MapleCharacter chrs : c.getWorldServer().getPlayerStorage().getAllCharacters()) {

                    switch (chrs.getClient().getChannel()) {
                        case 1:
                            allplayers++;
                            break;
                        case 2:
                            allplayers++;
                            break;
                        case 3:
                            allplayers++;
                            break;
                    }
                }
                if (allplayers == 1) {
                    player.dropMessage(6, "There is " + allplayers + " player online.");
                } else {
                    player.dropMessage(6, "There are " + allplayers + " players online.");
                }
                break;
                    
		case "gm":
			if(!player.getAutobanManager().canCallGM()) {
				System.out.println("Test");
				player.dropMessage("You can't send a message to the GMs yet.");
				return false;
			}
			if (sub.length < 3) { // #goodbye 'hi'
				player.dropMessage(5, "Your message was too short. Please provide as much detail as possible.");
				break;
			}
			String message = StringUtil.joinStringFrom(sub, 1);
			Server.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6,"[GM MESSAGE]:" + MapleCharacter.makeMapleReadable(player.getName()) + ": " + message)); // blue text;
			FilePrinter.printError("gm.txt", MapleCharacter.makeMapleReadable(player.getName()) + ": " + message + "\r\n");
			player.dropMessage(5, "Your message '" + message + "' was sent to GMs.");
			player.getAutobanManager().spam(8);
			System.out.println(player.getAutobanManager().canCallGM());
                    
		case "bug":
                    
			if (sub.length < 2) {
				player.dropMessage(5, "Message too short and not sent. Please do @bug <bug>");
				break;
			}
			message = StringUtil.joinStringFrom(sub, 1);
			Server.getInstance().broadcastGMMessage(MaplePacketCreator.sendYellowTip("[BUG]:" + MapleCharacter.makeMapleReadable(player.getName()) + ": " + message));
			Server.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(1, message));
			FilePrinter.printError("bug.txt", MapleCharacter.makeMapleReadable(player.getName()) + ": " + message + "\r\n");
			player.dropMessage(5, "Your bug '" + message + "' was submitted successfully to our developers. Thank you!");
			break;
		/*
                case "points":
			player.dropMessage(5, "You have " + c.getVotePoints() + " vote point(s).");
			if (c.hasVotedAlready()) {
				Date currentDate = new Date();
				int time = (int) ((int) 86400 - ((currentDate.getTime() / 1000) - c.getVoteTime())); //ugly as fuck
				hours = time / 3600;
				minutes = time % 3600 / 60;
				seconds = time % 3600 % 60;
				player.yellowMessage("You have already voted. You can vote again in " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds.");
			} else {
				player.yellowMessage("You are free to vote! Make sure to vote to gain a vote point!");
			}
			break;
                */
		case "joinevent":
			if(!FieldLimit.CANNOTMIGRATE.check(player.getMap().getFieldLimit())) {
				MapleEvent event = c.getChannelServer().getEvent();
				if(event != null) {
					if(event.getMapId() != player.getMapId()) {
						if(event.getLimit() > 0) {
							player.saveLocation("EVENT");

							if(event.getMapId() == 109080000 || event.getMapId() == 109060001)
								player.setTeam(event.getLimit() % 2);

							event.minusLimit();

							player.changeMap(event.getMapId());
						} else {
							player.dropMessage("The limit of players for the event has already been reached.");
						}
					} else {
						player.dropMessage(5, "You are already in the event.");
					}
				} else {
					player.dropMessage(5, "There is currently no event in progress.");
				}
			} else {
				player.dropMessage(5, "You are currently in a map where you can't join an event.");
			}
			break;
                    
		case "leaveevent":
			int returnMap = player.getSavedLocation("EVENT");
			if(returnMap != -1) {
				if(player.getOla() != null) {
					player.getOla().resetTimes();
					player.setOla(null);
				}
				if(player.getFitness() != null) {
					player.getFitness().resetTimes();
					player.setFitness(null);
				}
				
				player.changeMap(returnMap);
				if(c.getChannelServer().getEvent() != null) {
					c.getChannelServer().getEvent().addLimit();
				}
			} else {
				player.dropMessage(5, "You are not currently in an event.");
			}
			break;
                    
		case "bosshp":
			for(MapleMonster monster : player.getMap().getMonsters()) {
				if(monster != null && monster.isBoss() && monster.getHp() > 0) {
					long percent = monster.getHp() * 100L / monster.getMaxHp();
					String bar = "[";
					for (int i = 0; i < 100; i++){
						bar += i < percent ? "|" : ".";
					}
					bar += "]";
					player.yellowMessage(monster.getName() + " (" + monster.getId() + ") has " + percent + "% HP left.");
					player.yellowMessage("HP: " + bar);
				}
			} 
			break;
                    
		case "ranks":
			PreparedStatement ps = null;
			ResultSet rs = null;
			try {
				ps = DatabaseConnection.getConnection().prepareStatement("SELECT `characters`.`name`, `characters`.`level` FROM `characters` LEFT JOIN accounts ON accounts.id = characters.accountid WHERE `characters`.`gm` = '0' AND `accounts`.`banned` = '0' ORDER BY level DESC, exp DESC LIMIT 50");
				rs = ps.executeQuery();
				
				player.announce(MaplePacketCreator.showPlayerRanks(9010000, rs));
				ps.close();
				rs.close();
			} catch(SQLException ex) {
				ex.printStackTrace();
			} finally {
				try {
					if(ps != null && !ps.isClosed()) {
						ps.close();
					}
					if(rs != null && !rs.isClosed()) {
						rs.close();
					}
				} catch (SQLException e) {
                                        e.printStackTrace();
				}
			}
			break;
                            
                default:
                        return false;
                }
                
                return true;
        }
        
  }  

