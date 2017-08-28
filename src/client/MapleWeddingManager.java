package client;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import client.*;
import tools.DatabaseConnection;

/*
 * Author Matt - Interstellar
 */
public class MapleWeddingManager {
	private static MapleWedding currentwedding = null;
	private static List<MapleWedding> reservedweddings = new ArrayList<MapleWedding>();
	private static Connection con = DatabaseConnection.getConnection();
	
	public static void loadWedding(MapleCharacter groom, int bride) { // GROOM OR BRIDE CANNOT BE NULL - CHECKED IN THE NPC
		PreparedStatement ps;
		ResultSet rs;
		int marriageId = 0;
		try {
			ps = con.prepareStatement("SELECT * FROM weddings WHERE husbandid=? AND brideid=?");
			ps.setInt(1, groom.getId());
			ps.setInt(2, bride);
			rs = ps.executeQuery();
			boolean created = true;
			if(!rs.next()) {
				created = false;
				System.out.println("Didnt find wedding for user " + groom.getName() + ", creating new");
				ps = con.prepareStatement("INSERT INTO weddings(husbandid, brideid) VALUES(?,?)", Statement.RETURN_GENERATED_KEYS);
				ps.setInt(1, groom.getGender() == 0 ? groom.getId() : bride);
				ps.setInt(2, groom.getGender() == 0 ? bride : groom.getId());
				ps.executeUpdate();
				rs = ps.getGeneratedKeys();
				if(!rs.next()) {
					System.out.println("Error getting generated marriageid.");
					return;
				}
				marriageId = rs.getInt(1);
			}
				MapleCharacter br = groom.getClient().getChannelServer().getPlayerStorage().getCharacterById(bride);
				MapleWedding mw = new MapleWedding(groom, br, created ? rs.getInt("marriageid") : marriageId);
				currentwedding = mw; // setting the currentwedding
		} catch(SQLException e) {
			e.printStackTrace();
			System.out.println("Error loading weddings");
		}
		System.out.println("Maplewedding success");
	}
	
	public static void setupEngagement(MapleCharacter chr, MapleCharacter chr2, int marriageBox) {
		PreparedStatement ps;
		ResultSet rs;
		int chrId;
		String chrName;
		MapleCharacter chrToExecute;
		try {
			for(int i = 0; i < 2; i++) {
				
				chrToExecute = i == 0 ? chr2 : chr;
				System.out.println("Setup engagement " + i + " " + chrToExecute.getName());
				chrId = i == 0 ? chr.getId() : chr2.getId();
				chrName = i == 0 ? chr.getName() : chr2.getName();
				ps = con.prepareStatement("INSERT INTO engagements(prtId ,prtName ,ringId) VALUES(?,?,?)", Statement.RETURN_GENERATED_KEYS);
				ps.setInt(1, chrId);
				ps.setString(2, chrName);
				ps.setInt(3, marriageBox);
				
				ps.executeUpdate();
				rs = ps.getGeneratedKeys();
				if(!rs.next()) {
					System.out.println("Problem getting engagement id");
				}
				System.out.println(rs.getInt(1));
				chrToExecute.setEngagement(new MapleEngagement(rs.getInt(1), chrId, chrName, marriageBox));
			}
		} catch(SQLException e) {
			System.out.println("An error occured while creating engagement: " + e);
		}
	}
	

	public static MapleWedding getCurrentWedding() {
		return currentwedding;
	}
	
	public static void setCurrentWedding(MapleWedding mw) {
		currentwedding = mw;
	}
	
	public static void end() {
		currentwedding.getInstance().dispose();
		currentwedding = null;
		System.out.println("Resetted Wedding.");
	}
	
	public static void addReservedWedding(MapleWedding mw) {
		reservedweddings.add(mw);
	}
	
	public static MapleWedding getReservedWedding(int cid) {
		for(MapleWedding mw : reservedweddings) {
			if(mw.getBride().getId() == cid || mw.getGroom().getId() == cid)
				return mw;
		}
		return null;
	}
	
}
