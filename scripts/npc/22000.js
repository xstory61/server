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
		cm.sendSimple("\t\t\t\t\t\t\t\t\t#b#eInterstellar AIO#k\r\n\r\n" +
					"#L0#Traders#l \t" +
					"#L1#Jump Quest#l \t" +
					"#L2#Styler#l\r\n" +
					"#L3#Ranking#l" +
					"#L4#All in one shop#l"
					);
	}
	else if (status == 1)
	{
		if (sel == 0)
		{
			section = 0;
			cm.sendSimple("\t\t\t\t\t\t\t\t\t\t\t#b#eTraders#k\r\n" +
						"#L0#Event Points Trader#l\r\n" +
						"#L1#Vote Points Trader#l\r\n" +
						"#L2#Rebirth Points Trader#l\r\n" +
						"#L3#Jump Quest Points Trader#l\r\n" +
						"#L4#Fishing Points Trader#l\r\n"
						);
		}
		else if (sel == 1)
		{
			cm.openNpc(10200);
		}
		else if (sel == 2)
		{
			cm.openNpc(1530041);
		}
		else if (sel == 3)
		{
			cm.sendOk("Coming soon!");
			cm.dispose();
		}
		else if (sel == 4)
		{
			cm.openNpc(1092019);
		}
			
	} 
	else if (status == 2)
	{
		cm.dispose();
		if (sel == 0)
		{
			cm.sendOk("Coming as soon as we get these points LOL");
			cm.dispel();
		}
		else if (sel == 1)
		{
			cm.openNpc(2084001);
		}
		else if (sel == 2)
		{
			cm.sendOk("Coming as soon as we get these points LOL");
			cm.dispel();
		}
		else if (sel == 3)
		{
			cm.sendOk("Coming as soon as we get these points LOL");
			cm.dispel();
		}
		else if (sel == 4)
		{
			cm.sendOk("NPC dcing for now.");
			cm.dispel();
		}
	}		
}
