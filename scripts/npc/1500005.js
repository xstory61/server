
var infinity = "\t\t\t\t\t\t\t#d#eMapleInfinity#k Minigames#n\r\n";
function start() { 
    cm.sendOk(infinity + "Hello. I'm the Master of Minigames! I will now warp you to our minigames map."); 
	
} 

function action(mode, type, selection) { 
if(!(mode < 1)){
    cm.warp(325090000, 0);     
    cm.sendOk("Have fun!"); 
    cm.dispose(); 
	return;
}
} 