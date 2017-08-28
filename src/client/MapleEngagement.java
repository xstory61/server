package client;

public class MapleEngagement {
	private int prtId;
	private String prtName;
	private int itemId;
	private int id;
	public MapleEngagement(int id, int pid,String pName, int itemId) {
		this.prtId = pid;
		this.prtName = pName;
		this.itemId = itemId;
		this.id = id;
	}
	
	public int getPartnerId() {
		return prtId;
	}
	
	public String getPartnerName() {
		return prtName;
	}
	
	public int getItemId() {
		return itemId;
	}
	
	public int getId() {
		return id;
	}
}
