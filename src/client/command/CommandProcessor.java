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
package client.command;

import client.MapleCharacter;
import client.MapleClient;
import java.rmi.RemoteException;
import java.sql.SQLException;
import java.util.List;
import provider.MapleData;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;
import provider.MapleDataTool;
import tools.Pair;
import java.util.ArrayList;
import java.util.LinkedList;
import java.io.File;
import java.sql.Connection;
import java.sql.PreparedStatement;
import net.server.Server;
import net.server.channel.Channel;
import server.TimerManager;
import server.life.MapleLifeFactory;
import tools.DatabaseConnection;

public final class CommandProcessor {
    public static boolean isCommand(String s, MapleCharacter player){
        if(s.charAt(0) == '@')
            return true;
        else if(player.gmLevel() > 0 && s.charAt(0) == '!')
            return true;
        else
            return false;
    }
    public static void executeCommand(MapleClient c, String s){      
       String[] words = s.split("\\s+");
       Server srv = Server.getInstance();
       Channel cserv = c.getChannelServer();
       if(s.charAt(0) == '@')
           PlayerCommands.executePlayerCommand(cserv, srv, c, words);
       else if(c.getPlayer().gmLevel() > 0 && s.charAt(0) == '!'){
           GMCommands.executeAdminCommand(cserv, srv, c, words);
           GMCommands.executeGMCommand(cserv, srv, c, words);
           GMCommands.executeInternCommand(cserv, srv, c, words);        
           GMCommands.executeDonorCommand(cserv, srv, c, words);
           System.out.print(" " + c.getPlayer().getName() + " has used " + words[0] + ". ");
       }
    }
    
    
}