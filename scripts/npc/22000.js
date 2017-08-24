/*
	XStory 2017
*/
/*  Author:         Art
	NPC Name: 		Shanks
	Description: 	AIO
*/
var status;
var section;
function start()
{ 
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, sel)
{
    if (mode == -1) cm.dispose();
    else if (mode == 0 && status == 0) cm.dispose();
	if (mode == 1) status++;
	else status--;
	if (status == 0)
	{
		cm.sendSimple("I'm All In One Pimp.\r\n" +
					"Just tell me what you need and I'l hook you up!\r\n" +
					"#L0#Traders#l\r\n" +
					"#L1#idk how to name it so just for test#l\r\n"
					);
	}
	else if (status == 1)
	{
		if (sel == 0)
		{
			section = 0;
			cm.sendSimple("Sure thing dawg\r\n" +
						"#L0#Event Points Trader#l\r\n" +
						"#L1#Vote Points Trader#l\r\n" +
						"#L2#Rebirth Points Trader#l\r\n" +
						"#L3#Jump Quest Points Trader#l\r\n"
						);
		}
		else if (sel == 1)
		{
			section = 1;
			cm.sendSimple("My hoes\r\n" +
						  "#L0#Jump Quest#l"
						 );
		}
			
	} 
	else if (status == 2)
	{
		if (section == 1 && sel == 0)
		{
			cm.openNpc(10200);
		}
		else if (sel >= 0)
		{
			cm.sendOk("Coming as soon as we get these points LOL" + sel);
			cm.dispel();
		}
	}		
}
