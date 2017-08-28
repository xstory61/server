/*
 * Author Matt
 * Interstellar
 */
importPackage(java.lang);

importPackage(Packages.world);
importPackage(Packages.client);
importPackage(Packages.server.maps);
importPackage(Packages.tools);

var exitMap;
var altarMap;
var cakeMap;
var instanceId;
var minPlayers = 1;
var weddingTime = 0; // 20mins.
var mw;
function init() {
    exitMap = em.getChannelServer().getMapFactory().getMap(680000500); //Teh exit map :) <---------t
    altarMap = em.getChannelServer().getMapFactory().getMap(680000210); //Teh altar map
    cakeMap = em.getChannelServer().getMapFactory().getMap(680000300); //Teh cake // 5 mins
    instanceId = 1;
}

function setup() {
	System.out.println("Got here - Cathedral Wedding");
    var instanceName = "CathedralWedding" + instanceId;
    var eim = em.newInstance(instanceName);
	em.schedule("timeOut",eim, 20*1000*60); // if the player doesnt start the wedding within 20mins(meaning, going into the altar) -> abort wedding.
	mw = MapleWeddingManager.getCurrentWedding();
	mw.setEventInstance(eim);
    return eim;
}

function playerEntry(eim, player) {
	if (mw.isWeddingCouple(player)){
		player.changeMap(altarMap, altarMap.getPortal(2));
	} else {
		var map = eim.getMapInstance(680000200);
		player.changeMap(map, map.getPortal(0));
	}
	player.getClient().getSession().write(MaplePacketCreator.getClock((weddingTime-(System.currentTimeMillis()/1000))));
}

//lets forget this bullshit...
function playerDead(eim, player) {
	playerExit(eim,player)
}

function playerRevive(eim, player) {
	if(player.getMap().getId() == altarMap.getId() || player.getMap().getId() == cakeMap.getId())
		player.getMap.getId == altarMap ? player.changeMap(altarMap) : player.changeMap(cakeMap);
}

function playerDisconnected(eim, player) { // what if bride disconnected? need to check this.
    playerExit(eim, player);//kick him/her
}

function leftParty(eim, player) {	//??	
}

function disbandParty(eim) {
}

function startWed() {
	em.cancelSchedule();
	if(mw.start()) {
		System.out.println("start wed");
		em.schedule("playerCake", mw.getInstance(), (5 * 60 * 1000)); // warp to cake.
		var eim = mw.getInstance();
		System.out.println(eim.getPlayerCount());
		if (eim.getPlayerCount() > 0) {
			System.out.println("Player count > 0");
			var pIter = eim.getPlayers().iterator();
			while (pIter.hasNext()) {
				player = pIter.next();
				player.getClient().getSession().write(MaplePacketCreator.getClock(300));
				System.out.println("startWed " + player.getName());
			}
		}
	} else
		timeOut();
}

function playerExit(eim, player) {
	player.changeMap(exitMap, exitMap.getPortal(0));
    eim.unregisterPlayer(player);
}

function playerWarpAltar(eim, player) {
	mw.isWeddingCouple(player) ? player.changeMap(altarMap, altarMap.getPortal(2)) : player.changeMap(altarMap, altarMap.getPortal(0));
	player.getClient().getSession().write(MaplePacketCreator.getClock(weddingTime - (System.currentTimeMillis()/1000)));
}

function playerWarpCake(eim, player) {
    player.changeMap(cakeMap, cakeMap.getPortal(0));
    player.getClient().getSession().write(MaplePacketCreator.getClock(60));
}

function playerCake() {
    var eim = mw.getInstance();
	em.cancelSchedule();
    if (eim.getPlayerCount() > 0) {
        var pIter = eim.getPlayers().iterator();
		while (pIter.hasNext()) {
			var player = pIter.next();
			playerWarpCake(eim, player);
		}
    }
    em.schedule("timeOut",mw.getInstance(), 60000); // 60 secs
}

//Those offline cuntts
function removePlayer(eim, player) {
    eim.unregisterPlayer(player);
    player.getMap().removePlayer(player);
    player.setMap(exitMap);
}


function cancelSchedule() {
}

function timeOut() {
	System.out.println("Got here");
	var eim = mw.getInstance();
	var player;
	if (eim.getPlayerCount() > 0) {
        var pIter = eim.getPlayers().iterator();
		while (pIter.hasNext()) {
			player = pIter.next();
			playerExit(eim, player);
			player.setEventInstance(null);
		System.out.println("timeOut " + player.getName());
		}
    }
	MapleWeddingManager.end();
}

function openWedding() {
	em.cancelSchedule();
	weddingTime = (System.currentTimeMillis() + 20*1000*60)/1000;
	em.schedule("startWed",mw.getInstance(), 10*1000*60);
}


function dispose() {

}