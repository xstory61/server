/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package tools;

import client.MapleCharacter;
import client.MapleRing;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import tools.MaplePacketCreator;
import tools.StringUtil;
import tools.data.output.MaplePacketLittleEndianWriter;

/**
 * CField_Wedding, CField_WeddingPhoto, CWeddingMan, OnMarriageResult, and all Wedding/Marriage enum/structs.
 * 
 * @author Eric
 */
public class WeddingPackets extends MaplePacketCreator {
    private static final short MARRIAGE_REQUEST = 0x48;
    private static final short MARRIAGE_RESULT = 0x49;
    private static final short WEDDING_GIFT_RESULT = 0x4A;
    private static final short NOTIFY_MARRIED_PARTNER_MAP_TRANSFER = 0x4B;
    private static final short WEDDING_PHOTO = 0x2B;
    private static final short WEDDING_PROGRESS = 0x140;
    private static final short WEDDING_CEREMONY_END = 0x141;
    
    /*
        00000000 CWeddingMan     struc ; (sizeof=0x104)
        00000000 vfptr           dd ?                    ; offset
        00000004 ___u1           $01CBC6800BD386B8A8FD818EAD990BEC ?
        0000000C m_mCharIDToMarriageNo ZMap<unsigned long,unsigned long,unsigned long> ?
        00000024 m_mReservationPending ZMap<unsigned long,ZRef<GW_WeddingReservation>,unsigned long> ?
        0000003C m_mReservationPendingGroom ZMap<unsigned long,ZRef<CUser>,unsigned long> ?
        00000054 m_mReservationPendingBride ZMap<unsigned long,ZRef<CUser>,unsigned long> ?
        0000006C m_mReservationStartUser ZMap<unsigned long,unsigned long,unsigned long> ?
        00000084 m_mReservationCompleted ZMap<unsigned long,ZRef<GW_WeddingReservation>,unsigned long> ?
        0000009C m_mGroomWishList ZMap<unsigned long,ZRef<ZArray<ZXString<char> > >,unsigned long> ?
        000000B4 m_mBrideWishList ZMap<unsigned long,ZRef<ZArray<ZXString<char> > >,unsigned long> ?
        000000CC m_mEngagementPending ZMap<unsigned long,ZRef<GW_MarriageRecord>,unsigned long> ?
        000000E4 m_nCurrentWeddingState dd ?
        000000E8 m_dwCurrentWeddingNo dd ?
        000000EC m_dwCurrentWeddingMap dd ?
        000000F0 m_bIsReservationLoaded dd ?
        000000F4 m_dwNumGuestBless dd ?
        000000F8 m_bPhotoSuccess dd ?
        000000FC m_tLastUpdate   dd ?
        00000100 m_bStartWeddingCeremony dd ?
        00000104 CWeddingMan     ends
    */
    
    public class Field_Wedding {
        public int m_nNoticeCount;
        public int m_nCurrentStep;
        public int m_nBlessStartTime;
    }
    
    
    public static void Marry(MapleCharacter chr, MapleCharacter partner) {
        int itemid = chr.getEngagement().getItemId();
        int ringid = MapleRing.createRing(itemid, chr, partner);
        chr.addMarriageRing(MapleRing.loadFromDb(ringid));
        partner.addMarriageRing(MapleRing.loadFromDb(ringid+1));
        chr.getClient().getSession().write(OnMarriageResult(chr, true));
        partner.getClient().getSession().write(OnMarriageResult(partner, true));
        itemid = matchRingToBox(itemid);
        final int newItemId = itemid == 2240000 ? 4031357 : (itemid == 2240001 ? 4031359 : (itemid == 2240002 ? 4031361 : (itemid == 2240003 ? 4031363 : (1112300 + (itemid - 2240004)))));
        MapleInventoryManipulator.addById(chr.getClient(), (newItemId + 1), (short)-1);
        MapleInventoryManipulator.addById(partner.getClient(), (newItemId), (short)-1);
    }
    


	public class Field_WeddingPhoto {
        public boolean m_bPictureTook;
    }
    
    public class GW_WeddingReservation {
        public int dwReservationNo;
        public int dwGroom, dwBride;
        public String sGroomName, sBrideName;
        public int usWeddingType;
    }
    
    public class WeddingWishList {
        public MapleCharacter pUser;
        public int dwMarriageNo;
        public int nGender;
        public int nWLType;
        public int nSlotCount;
        public List<String> asWishList = new ArrayList<>();
//        public List<List<GW_ItemSlotBase>> aaItemSlot = new ArrayList<>(6);
        public int usModifiedFlag; // dword
        public boolean bLoaded;
    }
    
    public class GW_WeddingWishList {
        public final int WEDDINGWL_MAX = 0xA; // enum WEDDINGWL
        public int dwReservationNo;
        public byte nGender;
        public String sItemName;
    }
    
    public enum MarriageStatus {
        SINGLE(0x0),
        ENGAGED(0x1),
        RESERVED(0x2),
        MARRIED(0x3);
        private int ms;
        private MarriageStatus(int ms) {
            this.ms = ms;
        }
        
        public int getMarriageStatus() {
            return ms;
        }
    }
    
    public enum MarriageRequest {
        AddMarriageRecord(0x0),
        SetMarriageRecord(0x1),
        DeleteMarriageRecord(0x2),
        LoadReservation(0x3),
        AddReservation(0x4),
        DeleteReservation(0x5),
        GetReservation(0x6);
        private int req;
        private MarriageRequest(int req) {
            this.req = req;
        }
        
        public int getMarriageRequest() {
            return req;
        }
    }
    
    public enum WeddingType {
        CATHEDRAL(0x1),
        VEGAS(0x2),
        CATHEDRAL_PREMIUM(0xA),
        CATHEDRAL_NORMAL(0xB),
        VEGAS_PREMIUM(0x14),
        VEGAS_NORMAL(0x15);
        private int wt;
        private WeddingType(int wt) {
            this.wt = wt;
        }
        
        public int getType() {
            return wt;
        }
    }
    
    public enum WeddingMap {
        WEDDINGTOWN(680000000),
        CHAPEL_STARTMAP(680000110),
        CATHEDRAL_STARTMAP(680000210),
        PHOTOMAP(680000300),
        EXITMAP(680000500);
        private int wm;
        private WeddingMap(int wm) {
            this.wm = wm;
        }
        
        public int getMap() {
            return wm;
        }
    }
    
    public static int matchBoxToRing(int boxId) {
    	WeddingItem ret =  boxId == WeddingItem.ERB_MOONSTONE.getItem() ? WeddingItem.WR_MOONSTONE : boxId == WeddingItem.ERB_GOLDENHEART.getItem() ? WeddingItem.WR_GOLDENHEART : boxId == WeddingItem.ERB_SILVERSWAN.getItem() ? WeddingItem.WR_SILVERSWAN : WeddingItem.WR_STARGEM;
    	return ret.getItem();
    }
    
    public static int matchRingToBox(int ringId) {
    	WeddingItem ret =  ringId == WeddingItem.WR_MOONSTONE.getItem() ? WeddingItem.ERB_MOONSTONE: ringId == WeddingItem.WR_GOLDENHEART.getItem() ?WeddingItem.ERB_GOLDENHEART : ringId == WeddingItem.WR_SILVERSWAN.getItem() ? WeddingItem.ERB_SILVERSWAN : WeddingItem.ERB_STARGEM;
    	return ret.getItem();
    }
    
    public enum WeddingItem {
        WR_MOONSTONE(1112803), // Wedding Ring
        WR_STARGEM(1112806),
        WR_GOLDENHEART(1112807),
        WR_SILVERSWAN(1112809),
        ERB_MOONSTONE(2240000), // Engagement Ring Box
        ERB_STARGEM(2240001),
        ERB_GOLDENHEART(2240002),
        ERB_SILVERSWAN(2240003),
        ERBE_MOONSTONE(4031357), // Engagement Ring Box (Empty)
        ER_MOONSTONE(4031358), // Engagement Ring
        ERBE_STARGEM(4031359),
        ER_STARGEM(4031360),
        ERBE_GOLDENHEART(4031361),
        ER_GOLDENHEART(4031362),
        ERBE_SILVERSWAN(4031363),
        ER_SILVERSWAN(4031364),
        PARENTS_BLESSING(4031373), // Parents Blessing
        OFFICIATORS_PERMISSION(4031374), // Officiator's Permission
        WR_CATHEDRAL_PREMIUM(4031375), // Wedding Ring?
        WR_VEGAS_PREMIUM(4031376),
        IB_VEGAS(4031377), // Invitation B????
        IB_CATHEDRAL(4031395),
        IG_VEGAS(4031406), // Invitation G????
        IG_CATHEDRAL(4031407),
        OB_FORCOUPLE(4031424), // Onyx Box? For Couple
        WR_CATHEDRAL_NORMAL(4031480), // Wedding Ring?
        WR_VEGAS_NORMAL(4031481),
        WT_CATHEDRAL_NORMAL(5251000), // Wedding Ticket
        WT_VEGAS_NORMAL(5251001),
        WT_VEGAS_PREMIUM(5251002),
        WT_CATHEDRAL_PREMIUM(5251003);
        private int wi;
        private WeddingItem(int wi) {
            this.wi = wi;
        }
        
        public int getItem() {
            return wi;
        }
    }
    
    public static boolean isMarriageRing(int id) {
        return id == 1112803 || id == 1112806 || id == 1112807 || id == 1112809;
    } 
    
    /**
     * <name> has requested engagement. Will you accept this proposal?
     * 
     *    [MENTION=2000183830]para[/MENTION]m name
     *    [MENTION=2000183830]para[/MENTION]m playerid
     *    [MENTION=850422]return[/MENTION]
     */
    public static byte[] OnMarriageRequest(String name, int playerid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(MARRIAGE_REQUEST);
        mplew.write(0); //mode, 0 = engage, 1 = cancel, 2 = answer.. etc
        mplew.writeMapleAsciiString(name); // name
        mplew.writeInt(playerid); // playerid
        return mplew.getPacket();
    }
    
    /**
     * A quick rundown of how (I think based off of enough BMS searching) WeddingPhoto_OnTakePhoto works:
     * - We send this packet with (first) the Groom / Bride IGNs
     * - We then send a fieldId (unsure about this part at the moment, 90% sure it's the id of the map)
     * - After this, we write an integer of the amount of characters within the current map (which is the Cake Map -- exclude users within Exit Map)
     * - Once we've retrieved the size of the characters, we begin to write information about them (Encode their name, guild, etc info)
     * - Now that we've Encoded our character data, we begin to Encode the ScreenShotPacket which requires a TemplateID, IGN, and their positioning
     * - Finally, after encoding all of our data, we send this packet out to a MapGen application server
     * - The MapGen server will then retrieve the packet byte array and convert the bytes into a ImageIO 2D JPG output
     * - The result after converting into a JPG will then be remotely uploaded to /weddings/ with ReservedGroomName_ReservedBrideName to be displayed on the web server.
     * 
     * - Will no longer continue Wedding Photos, needs a WvsMapGen :(
     * 
     *    [MENTION=2000183830]para[/MENTION]m ReservedGroomName The groom IGN of the wedding
     *    [MENTION=2000183830]para[/MENTION]m ReservedBrideName The bride IGN of the wedding
     *    [MENTION=2000183830]para[/MENTION]m m_dwField The current field id (the id of the cake map, ex. 680000300)
     *    [MENTION=2000183830]para[/MENTION]m m_uCount The current user count (equal to m_dwUsers.size)
     *    [MENTION=2000183830]para[/MENTION]m m_dwUsers The List of all MapleCharacter guests within the current cake map to be encoded
     *    [MENTION=850422]return[/MENTION] (MaplePacket) Byte array to be converted and read for byte[]->ImageIO
     */
    public static byte[] OnTakePhoto(String ReservedGroomName, String ReservedBrideName, int m_dwField, int m_uCount, List<MapleCharacter> m_dwUsers) { // OnIFailedAtWeddingPhotos
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(WEDDING_PHOTO); // v53 header, convert -> v83
        mplew.writeMapleAsciiString(ReservedGroomName);
        mplew.writeMapleAsciiString(ReservedBrideName);
        mplew.writeInt(m_dwField); // field id?
        mplew.writeInt(m_uCount);
        if (m_uCount > 0) {
            for (MapleCharacter guest : m_dwUsers) {
                // Begin Avatar Encoding
              //  guest.getAvatarLook().Encode(mplew, false); // CUser::EncodeAvatar
            	if(guest.getMap().getId() == 680000300) {
	            //	MaplePacketCreator.addCharLook(mplew, guest, false);
	                mplew.writeInt(30000); // v20 = *(_DWORD *)(v13 + 2192) -- new groom marriage ID??
	                mplew.writeInt(30000); // v20 = *(_DWORD *)(v13 + 2192) -- new bride marriage ID??
	                mplew.writeMapleAsciiString(guest.getName());
	                mplew.writeMapleAsciiString(guest.getGuildId() > 0 && guest.getGuild() != null ? guest.getGuild().getName() : "");
	                mplew.writeShort(guest.getGuildId() > 0 && guest.getGuild() != null ? guest.getGuild().getLogoBG() : 0);
	                mplew.write(guest.getGuildId() > 0 && guest.getGuild() != null ? guest.getGuild().getLogoBGColor() : 0);
	                mplew.writeShort(guest.getGuildId() > 0 && guest.getGuild() != null ? guest.getGuild().getLogo() : 0);
	                mplew.write(guest.getGuildId() > 0 && guest.getGuild() != null ? guest.getGuild().getLogoColor() : 0);
	                mplew.writeShort(guest.getPosition().x); // v18 = *(_DWORD *)(v13 + 3204);
	                mplew.writeShort(guest.getPosition().y); // v20 = *(_DWORD *)(v13 + 3208);
	                // Begin Screenshot Encoding
	                mplew.write(1); // // if ( *(_DWORD *)(v13 + 288) ) { COutPacket::Encode1(&thisa, v20);
	                // CPet::EncodeScreenShotPacket(*(CPet **)(v13 + 288), &thisa);
	                mplew.writeInt(1); // dwTemplateID
	                mplew.writeMapleAsciiString(guest.getName()); // m_sName
	                mplew.writeShort(guest.getPosition().x); // m_ptCurPos.x
	                mplew.writeShort(guest.getPosition().y); // m_ptCurPos.y
	              //  mplew.write(guest.m_bMoveAction);
            	}
            }
        }
        return mplew.getPacket();
    }
    
    /**
     * Enable spouse chat and their engagement ring without @relog
     * 
     *    [MENTION=2000183830]para[/MENTION]m chr
     *    [MENTION=2000183830]para[/MENTION]m wedding
     *    [MENTION=850422]return[/MENTION]
     */
    public static byte[] OnMarriageResult(MapleCharacter chr, boolean wedding) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(MARRIAGE_RESULT);
        mplew.write(wedding ? 12 : 11); // maybe this? will change to 12 soon.
        int marriageId = 30000;
        mplew.writeInt(marriageId);
        mplew.writeInt(chr.getGender() == 0 ? chr.getId() : chr.getEngagement().getPartnerId());
        mplew.writeInt(chr.getGender() == 0 ? chr.getEngagement().getPartnerId() : chr.getId());
        mplew.writeShort(wedding ? 3 : 1); // impossible, always 1
        if (wedding) {
            mplew.writeInt(chr.getMarriageRing().getItemId());
            mplew.writeInt(chr.getMarriageRing().getItemId());
        } else {
            mplew.writeInt(1112803); // Engagement Ring's Outcome (doesn't matter for engagement)
            mplew.writeInt(1112803); // Engagement Ring's Outcome (doesn't matter for engagement)
        }
        mplew.writeAsciiString(StringUtil.getRightPaddedStr(chr.getGender() == 0 ? chr.getName() : chr.getEngagement().getPartnerName(), '\0', 13));
        mplew.writeAsciiString(StringUtil.getRightPaddedStr(chr.getGender() == 0 ? chr.getEngagement().getPartnerName() : chr.getName(), '\0', 13));
        marriageId++;
        return mplew.getPacket();
    }
    
    /**
     * To exit the Engagement Window (Waiting for her response...), we send a GMS-like pop-up.
     * 
     *    [MENTION=2000183830]para[/MENTION]m msg
     *    [MENTION=850422]return[/MENTION]
     */
    public static byte[] OnMarriageResult(final byte msg) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(MARRIAGE_RESULT);
        mplew.write(msg);
        if (msg == 36) {
            mplew.write(1);
            mplew.writeMapleAsciiString("You are now engaged.");
        }
        return mplew.getPacket();
    }
    
    /**
     * The World Map includes 'loverPos' in which this packet controls
     * 
     *    [MENTION=2000183830]para[/MENTION]m partner
     *    [MENTION=2000183830]para[/MENTION]m mapid
     *    [MENTION=850422]return[/MENTION]
     */
    public static byte[] OnNotifyWeddingPartnerTransfer(int partner, int mapid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(NOTIFY_MARRIED_PARTNER_MAP_TRANSFER);
        mplew.writeInt(mapid);
        mplew.writeInt(partner);
        return mplew.getPacket();
    }
    
    /**
     * The wedding packet to display Pelvis Bebop and enable the Wedding Ceremony Effect between two characters
     * CField_Wedding::OnWeddingProgress - Stages
     * CField_Wedding::OnWeddingCeremonyEnd - Wedding Ceremony Effect
     * 
     *    [MENTION=2000183830]para[/MENTION]m SetBlessEffect
     *    [MENTION=2000183830]para[/MENTION]m groom
     *    [MENTION=2000183830]para[/MENTION]m bride
     *    [MENTION=2000183830]para[/MENTION]m step
     *    [MENTION=850422]return[/MENTION]
     */
    public static byte[] OnWeddingProgress(boolean SetBlessEffect, int groom, int bride, byte step) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SetBlessEffect ? WEDDING_CEREMONY_END : WEDDING_PROGRESS);
        if (!SetBlessEffect) { // in order for ceremony packet to send, byte step = 2 must be sent first
            mplew.write(step); // this is an int o_O?
        }
        mplew.writeInt(groom);
        mplew.writeInt(bride);
        return mplew.getPacket();
    }
    
    /**
     * When we open a Wedding Invitation, we display the Bride & Groom
     * 
     *    [MENTION=2000183830]para[/MENTION]m groom
     *    [MENTION=2000183830]para[/MENTION]m bride
     *    [MENTION=850422]return[/MENTION]
     */
    public static byte[] sendWeddingInvitation(String groom, String bride) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(MARRIAGE_RESULT);
        mplew.write(15);
        mplew.writeMapleAsciiString(groom);
        mplew.writeMapleAsciiString(bride);
        mplew.writeShort(1); // 0 = Cathedral Normal?, 1 = Cathedral Premium?, 2 = Chapel Normal?
        return mplew.getPacket();
    }
    
    public static byte[] sendWishList() { // fuck my life
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(MARRIAGE_REQUEST);
        mplew.write(9);
        return mplew.getPacket();
    }

    /**
     * Handles all of WeddingWishlist packets
     * 
     *    [MENTION=2000183830]para[/MENTION]m mode
     *    [MENTION=2000183830]para[/MENTION]m itemnames
     *    [MENTION=2000183830]para[/MENTION]m items
     *    [MENTION=850422]return[/MENTION]
     */
    /*
    public static byte[] OnWeddingGiftResult(byte mode, List<String> itemnames, List<Item> items) {
        // if (itemnames == null || itemnames.size() < 1) { // for now lol
        //     itemnames = new ArrayList<>();
        //     itemnames.add("mesos");
        //     itemnames.add("rare items");
        //     itemnames.add("more mesos");
        // }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(WEDDING_GIFT_RESULT);
        mplew.write(mode);
        switch(mode) {
            case 0x09: { // Load Wedding Registry
                mplew.write(itemnames.size());
                for (String names : itemnames) {
                    mplew.writeMapleAsciiString(names);
                }
                mplew.write(itemnames.size());
                for (String names : itemnames) {
                    mplew.writeMapleAsciiString(names);
                }
                // need to load items somehow
                break;
            }
            case 0xA: // Load Bride's Wishlist 
            case 0xF: // 10, 15, 16 = CWishListRecvDlg::OnPacket
            case 0xB: { // Add Item to Wedding Registry 
                // 11 : You have sent a gift | 12 : You cannot give more than one present for each wishlist | 13 : Failed to send the gift. | 14 : Failed to send the gift.
                if (mode == 0xB) {
                    mplew.write(itemnames.size());
                    for (String names : itemnames) {
                        mplew.writeMapleAsciiString(names);
                    }
                }
                switch (items.get((items.size() - 1)).getType()) {
                    case 0x01:
                        mplew.writeLong(4);
                        break;
                    case 0x02:
                        mplew.writeLong(8);
                        break;
                    case 0x03:
                        mplew.writeLong(16);
                        break;
                    case 0x04:
                        mplew.writeLong(32);
                        break;
                    default: { // impossible flag, cash item can't be sent
                        if (items.get((items.size() - 1)).getType() != 5) {
                            mplew.writeLong(0);
                        }
                    }
                }
                if (mode == 0xA) { // random unknown bytes involved within Bride's Wishlist
                    mplew.writeInt(0);
                }
                mplew.write(items.size());
                for (Item item : items) {
                    //MaplePacketCreator.addItemToWeddingRegistry(mplew, item, true);
                }
                break;
            }
            default: {
                System.out.println("Unknown Wishlist Mode: " + mode);
                break;
            }
        }
        return mplew.getPacket();
    }
    */
}  