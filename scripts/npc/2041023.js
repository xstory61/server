/*
	XStory 2017
*/
/*  Author:			Art
	NPC Name: 		Flo
	Description: 	New player welcomer
*/
var status;

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
		cm.sendSimple("\t\t\t\t\t\t\t#b#eInterstellar Occupation#n#k\r\n" +
//					  "#r#L0#Little about the server#k\r\n" +
				      "#r#L0#Learn about the Occupations#l#k\r\n" +
					  "#r#L1#Choose the occupation#l#k"
		);
	}
	if (status == 1)
	{
		cm.dispose();
//		if (sel == 0)
//		{
//			cm.sendOk("#e#bInterstellar#k#n is a mid rate social server which means it's up to you how you want to play it!\r\n" +
//					  "Both grinders and event lovers will enjoy the server!\r\n\r\n" +
//			          "We have some amazing features such as:\r\n" +
//					  "- #b#rMarriage#k\r\n" +
//					  "- #rParty Quests#k\r\n" +
//					  "- #rCustom Training Maps#k\r\n" +
//					  "- #rDaily Events#k\r\n" +
//					  "- #rUnique Items#k\r\n\r\n" +
//					  "  And much more!"
//					  );
//			cm.dispose();
//		}
		if (sel == 0)
		{
			cm.sendOk("\t\t\t\t\t\t\t\t\t\t\t\t#e#bSocializer#k#n\r\n" +
			          "- #rFisherman#k: (Connects with fishing)\r\n" +
					  "- #rCelebrity#k: (Extra fame and discounts in shops)\r\n" +
					  "- #rShopaholic#k: (costs less to buy ep items)\r\n" +
					  "- #rSoon:#k \r\n" +
					  "\t\t\t\t\t\t\t\t\t\t\t\t\t#e#bGrinder#k#n\r\n" +
					  "- #rMadman#k: (Get's extra WA)\r\n" +
					  "- #rLucky#k: (Higher drop rate)\r\n" +
					  "- #rDouble Vision#k: (Like kanna doubles the amount of mobs in the map)\r\n" +
					  "- #rSpirit#k: (Like holy symbol, stacks with holy symbol but not with other players)"
			);
			cm.dispose();
		}
		if (sel == 1)
		{
			cm.sendOk("Soon!");
			cm.dispose();
		}
	}
}
	