package client;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import scripting.event.EventInstanceManager;
import scripting.npc.NPCScriptManager;
import server.TimerManager;
import server.maps.MapleMapFactory;
import tools.WeddingPackets;

/*
 * Author Matt - Interstellar
 */

public class MapleWedding {
        private MapleClient cl;
	private MapleCharacter groom;
	private MapleCharacter bride;
	private List<Integer> guests; 
	private int marriageid;
	private EventInstanceManager in;
	private WeddingStatus status;
	private Map<Integer, Integer> npc_stage;
	

	public MapleWedding(MapleCharacter groom, MapleCharacter bride, int id) {
		this.guests = new ArrayList<Integer>();
		this.npc_stage = new HashMap<Integer,Integer>();
		this.bride = bride;
		this.groom = groom;
		this.marriageid = id; // future tracking of invitations. NEEDED
		this.status = WeddingStatus.RESERVED;
		npc_stage.put(bride.getId(), 0);
		npc_stage.put(groom.getId(), 0);
		System.out.println("new MapleWedding " + bride.getName());
	}
	
    public enum WeddingStatus {
        RESERVED(0x0),
        STARTED(0x1),
        CLOSED(0x2),
        FINISHED(0x3);

        private int val;
        private WeddingStatus(int val) {
            this.val = val;
        }
        
        public int getValue() {
            return val;
        }
    }
	
	public boolean isWeddingCouple(MapleCharacter c) {
		return this.bride.getId() == c.getId() || this.groom.getId() == c.getId();
	}
	
	public void addGuest(int guest) {
		if(!guests.contains(guest)) {
			guests.add(guest);
			this.npc_stage.put(guest, 0);
		}
			
	}
	
	public void incrementStage(int cid) { // High Priest John. Since the packet has problems, i created a custom way of doing it. 
		this.npc_stage.put(cid, this.npc_stage.get(cid)+1);
	}
	
	public int getStage(int cid) {
		return this.npc_stage.get(cid);
	}
	
	public MapleCharacter getGroom() {
		return groom;
	}
	
	public MapleCharacter getBride() {
		return bride;
	}
	
	public void setGroom(MapleCharacter c) { // in case char dcd.
		this.groom = c;
	}
	
	public void setBride(MapleCharacter c) {
		this.bride = c;
	}
	
	public int getMarriageId() {
		return marriageid;
	}
	
	public MapleCharacter getPartner(MapleCharacter c) {
		return c.getId() == this.groom.getId() ? this.groom : this.bride;
	}
	
	public boolean isGuest(int cid) {
		return this.guests.contains(cid);
	}
	
	public boolean start() { // okay, im gonna wait 1 second.
		final boolean mapcheck = groom.getMapId() == 680000210 && bride.getMapId() == 680000210;
		TimerManager.getInstance().schedule(new Runnable() {
			public void run() {
				if(mapcheck) {
					updateStatus();
			    	for(MapleCharacter chr : groom.getMap().getCharacters()) {
			    		System.out.println("Started");
			    		System.out.println(chr.getName() +" Stage: " + npc_stage.get(chr.getId()));
				    	
				    	if(chr.getClient().getCM() == null) {
				    		NPCScriptManager.getInstance().start(chr.getClient(), 9201002, chr.getClient().getPlayer());
				    	}
			    	}
				}
			}
		}, 1000);
    	return mapcheck;
	}
	
	public int getStatus() {
		return this.status.getValue();
	}
	
	
	public void setEventInstance(EventInstanceManager i) {
		this.in = i;
	}
	
	public EventInstanceManager getInstance() {
		return this.in;
	}
	
	public void updateStatus() {
		this.status = this.status.equals(WeddingStatus.RESERVED) ? WeddingStatus.STARTED : this.status.equals(WeddingStatus.STARTED) ? WeddingStatus.CLOSED : WeddingStatus.FINISHED;
	}

	public void setStage(int id, int i) {
		this.npc_stage.put(id, i);
		
	}
	
}

