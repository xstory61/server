

var status = 0;
var rewardtype = 0;
omoks = [4080000,4080001,4080002,4080003,4080004,4080005,4080006,4080007,4080008,4080009,4080010,4080011];
function start() { 
    action(1, 0, 0);
}

function action(mode, type, selection) {
      if(mode < 1){
		  cm.dispose();
	  } else if(status == 0){
		  cm.sendSimple("\t\t\t\t\t#e#bMapleInfinity#k Rebirth Points Exchanger#n\r\n\r\n #e#b#L1##i4021010#Under maintenance#l");
	      status++;
	}		  
}
