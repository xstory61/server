var status = 0;


function start() {
    action(1,0,0);
}
function action(m,t,s){
	if(m < 1)
		cm.dispose();
	else{
		if(status == 0){
			cm.sendNext("Evil cygnus *cough* *cough* careful she'll turn into evil cygnus and kill you. \r\n#e -Click #rNext#k for credits");
			status++;
		}
		else if(status == 1){
			cm.sendOk("Credits to #eEcho, Puta and Crow (and Iced)");
			cm.dispose();
		}
	}
       	
}