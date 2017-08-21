/*
This file is part of the OdinMS Maple Story Server
Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
Matthias Butz <matze@odinms.de>
Jan Christian Meyer <vimes@odinms.de>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation version 3 as published by
the Free Software Foundation. You may not use, modify or distribute
this program under any other version of the GNU Affero General Public
License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package net.server.channel.handlers;

import tools.FilePrinter;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;
import client.MapleCharacter;
import client.MapleClient;
import client.autoban.AutobanFactory;
import client.command.CommandProcessor;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import server.events.TriviaEvents;

public final class GeneralChatHandler extends net.AbstractMaplePacketHandler {
	@Override
        public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
                String s = slea.readMapleAsciiString();
                MapleCharacter chr = c.getPlayer(); 
                TriviaEvents te = chr.getMap().getTriviaEvents();
               
                if (CommandProcessor.isCommand(s, chr)) {                    
                     CommandProcessor.executeCommand(c, s);                    
                      return ;        
               
                } else {
                        int show = slea.readByte();
                        if(chr.getMap().isMuted() && !chr.isGM()) {
                                chr.dropMessage(5, "The map you are in is currently muted. Please try again later.");
                                return;
                        }
                        if (!chr.isHidden()) {
                                chr.getMap().broadcastMessage(MaplePacketCreator.getChatText(chr.getId(), s, chr.getWhiteChat(), show));	
                        } else {
                                chr.getMap().broadcastGMMessage(MaplePacketCreator.getChatText(chr.getId(), s, chr.getWhiteChat(), show));
                        }
                        if(te.isActive()) {
                         switch(te.getEvent()) {
                        default:
                            System.out.println("Invalid game type.");
                            break;
                        case 1:
                            if(s.equals(te.getResult())) {
                             te.setActive(false);  
                                chr.getMap().broadcastMessage(MaplePacketCreator.serverNotice(6, "[Hitman] " + chr.getName() + " has gotten the hitman correctly!"));
                            }
                            break;
                        case 2:
                            if(s.equals(te.getResult())) {
                               te.setActive(false);  
                                chr.getMap().broadcastMessage(MaplePacketCreator.serverNotice(6, "[Blink] " + chr.getName() + " has gotten the blink correctly!"));
                            }
                            break;
                        case 3:
                            if(s.equals(te.getResult())) {
                                te.setActive(false);  
                                chr.getMap().broadcastMessage(MaplePacketCreator.serverNotice(6, "[Unscramble] " + chr.getName() + " has gotten the unscramble correctly!"));
                            }
                            break;
                        case 4:
                            if(s.equals(te.getResult())) {
                                 te.setActive(false);  
                                chr.getMap().broadcastMessage(MaplePacketCreator.serverNotice(6, "[Reverse] " + chr.getName() + " has gotten the reverse text correctly!"));
                            }
                            break;
                        case 5:
                            if(s.equals(te.getResult())) {
                                  te.setActive(false);  
                                chr.getMap().broadcastMessage(MaplePacketCreator.serverNotice(6, "[SpeedType] " + chr.getName() + " has gotten the speedtype text correctly!"));
                            }
                            break;
                        case 6:
                            if(s.toLowerCase().equals(te.getResult())) {
                                 te.setActive(false);  
                                chr.getMap().broadcastMessage(MaplePacketCreator.serverNotice(6, "[Scategories] " + chr.getName() + " has gotten it correctly!"));
                            }
                            break;
                        case 7:
                            if(s.equals(te.getResult())) {
                                  te.setActive(false);  
                                chr.getMap().broadcastMessage(MaplePacketCreator.serverNotice(6, "[NTI] " + chr.getName() + " has gotten the item correctly!"));
                               chr.getMap().clearDrops();
                            }
                            break;
                            
                    }

                     
                }
        }
     }
}

