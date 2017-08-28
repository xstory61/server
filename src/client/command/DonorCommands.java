/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package client.command;

import client.MapleCharacter;
import client.MapleClient;
import client.MapleStat;
import client.SkillFactory;
import net.server.Server;
import net.server.channel.Channel;
import server.life.MapleMonster;
import server.life.MapleNPC;
import server.maps.MapleMapObject;

/**
 *
 * @author artem
 */
public class DonorCommands {
    
    public static boolean executeDonorCommand(Channel cserv, Server srv, MapleClient c, String[] sub)
    {
        MapleCharacter player = c.getPlayer();
        if(player.gmLevel() < 1){
            return false;
        }
        String choice = sub[0].substring(1); 
        switch(choice.toLowerCase()) {  
            //<editor-fold defaultstate="collapsed" desc="buffme">
            case "buffme":
                //GM Skills : Haste(Super) - Holy Symbol - Bless - Hyper Body - Echo of Hero
                SkillFactory.getSkill(4101004).getEffect(SkillFactory.getSkill(4101004).getMaxLevel()).applyTo(player);
                SkillFactory.getSkill(2311003).getEffect(SkillFactory.getSkill(2311003).getMaxLevel()).applyTo(player);
                SkillFactory.getSkill(1301007).getEffect(SkillFactory.getSkill(1301007).getMaxLevel()).applyTo(player);
                SkillFactory.getSkill(2301004).getEffect(SkillFactory.getSkill(2301004).getMaxLevel()).applyTo(player);
                SkillFactory.getSkill(1005).getEffect(SkillFactory.getSkill(1005).getMaxLevel()).applyTo(player);
                player.setHp(player.getMaxHp());
                player.updateSingleStat(MapleStat.HP, player.getMaxHp());
                player.setMp(player.getMaxMp());
                player.updateSingleStat(MapleStat.MP, player.getMaxMp());
                break;
            //</editor-fold>                          
            //<editor-fold defaultstate="collapsed" desc="whereami">
            case "whereami":
                player.yellowMessage("Map ID: " + player.getMap().getId());
                player.yellowMessage("Players on this map:");
                for (MapleMapObject mmo : player.getMap().getPlayers()) {
                    MapleCharacter chr = (MapleCharacter) mmo;
                    player.dropMessage(5, ">> " + chr.getName());
                }
                //<editor-fold defaultstate="collapsed" desc="unused code">
                /*
                player.yellowMessage("NPCs on this map:");
                for (MapleMapObject npcs : player.getMap().getMapObjects()) {
                if (npcs instanceof MapleNPC) {
                MapleNPC npc = (MapleNPC) npcs;
                player.dropMessage(5, ">> " + npc.getName() + " - " + npc.getId() + " - Oid: " + npc.getObjectId());
                }
                }
                player.yellowMessage("Monsters on this map:");
                for (MapleMapObject mobs : player.getMap().getMapObjects()) {
                if (mobs instanceof MapleMonster) {
                MapleMonster mob = (MapleMonster) mobs;
                if(mob.isAlive()){
                player.dropMessage(5, ">> " + mob.getName() + " - " + mob.getId());
                }
                }
                }
                */
                //</editor-fold>
                break;
            //</editor-fold>     
            default:
                return false;
        }
        return false;
    }
}
