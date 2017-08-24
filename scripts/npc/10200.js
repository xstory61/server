/*
	XStory 2017
*/
/*  Author:			Art
	NPC Name: 		Athena Pierce
	Description: 	Jump Quest NPC
*/
 
var status;
var id;
patienceMap = [["The Forest Of Patience <Step 1>", 101000100], ["The Forest Of Patience <Step 2>", 101000101], ["The Forest Of Patience <Step 3>", 101000102], ["The Forest Of Patience <Step 4>", 101000103], ["The Forest Of Patience <Step 5>", 101000104]]; //The Forest of Patience
deepMap = [["The Deep Forest Of Patience <Step 1>", 105040310], ["The Deep Forest Of Patience <Step 2>", 105040311], ["The Deep Forest Of Patience <Step 3>", 105040312], ["The Deep Forest Of Patience <Step 4>", 105040313] ,["The Deep Forest Of Patience <Step 5>", 105040314], ["The Deep Forest Of Patience <Step 6>", 105040315], ["The Deep Forest Of Patience <Step 7>", 105040316]]; //The Deep Forest Of Patience
fitnessMap = [["MapleStory Physical Fitness Challenge <Level 1>", 109040001], ["MapleStory Physical Fitness Challenge <Level 2>", 109040002], ["MapleStory Physical Fitness Challenge <Level 3>", 109040003], ["MapleStory Physical Fitness Challenge <Level 4>", 109040004]]; //Physical Fitness Challenge
siteMap = [["Line 3 Construction Site B1 <Area 1>", 103000900], ["Line 3 Construction Site B2 <Area 1>", 103000903], ["Line 3 Construction Site B3 <Area 1>", 103000906]]; //Line 3 Construction Site B1/B2/B3 <Area 1>
lavaMap = [["Breath of Lava <Level 1>", 280020000], ["Breath of Lava <Level 2>", 280020001]]; //Breath of Lava
petMap = [["Pet-Walking Road", 100000202],["Ludibrium Pet Walkway", 220000006]]; // Henesys and Ludibrium Pet Walkaway
witchMap = [["Witch Tower 1st Floor <Part I>", 980041000], ["Witch Tower 1st Floor <Part II>", 980043000], ["Witch Tower 2nd Floor <Part I>", 980041100], ["Witch Tower 2nd Floor <Part II>", 980043100]]; //Witch Tower
otherMap = [["Ghost Chimney", 682000200], ["Utah's Pig Farm", 900000000], ["End of the Maze <Part I>", 990000611], ["End of the Maze <Part II>", 990000641], ["Waterway Maze", 990000620], ["Valley of Heroes 1", 610020000], ["Valley of Heroes 2", 610020001], ["The Forgotten Darkness", 922020000], ["Rider's Field", 921110000], ["Rescue Gaga!", 922240000], ["Forest's Empty Lot", 930000500]]; // Other maps
randomMap = [101000100, 101000101, 101000102, 101000103, 101000104,
			 105040310, 105040311, 105040312, 105040313, 105040314, 
			 105040315, 105040316, 109040001, 109040002, 109040003, 
			 109040004, 103000900, 103000903, 103000906, 280020000, 
			 280020001, 100000202, 220000006, 682000200, 900000000, 
			 980041000, 980043000, 980041100, 980043100, 990000611, 
			 990000620, 610020000, 610020001, 922020000, 921110000,
			 922240000, 930000500
			];

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
	
	if (status == 0) // Main status as you click on the NPC. Made it easier to edit for future updates.
	{
		str = "Please choose which map...";
		cm.sendSimple("Hey #bYOU#k big fat piece of shit, if you would like to get a bit skinnier I'd suggest you to jump a bit more." +
		              "\r\nWarps in #rparty#k automatically in case you want to go in together you #rFAT FUCKS#k. " +
					  "\r\n#L0#Random Map#l " +
					  "\r\n#L1#The Forest of Patience#l " +
					  "\r\n#L2#The Deep Forest of Patience#l " +
					  "\r\n#L3#Fitness Test#l " +
					  "\r\n#L4#Line 3 Construction Site#l " +
					  "\r\n#L5#Breath of Lava#l " +
					  "\r\n#L6#Pet Walkway#l " +
					  "\r\n#L7#Witch Tower#l " +
					  "\r\n#L8#Other#l");
	}
	else if (status == 1)
	{
		if (sel == 0) //Warps a player to a random jq map. Automatically warps party if in one.
		{
			rand = Math.floor(Math.random() * 38);
			if(cm.getParty() == null)
				cm.warp(randomMap[rand], 0);
			else
				cm.warpParty(randomMap[rand], 0);
			cm.dispose();
		}
		else if (sel == 1) //The Forest of Patience
		{

			for (i = 0; i < patienceMap.length; i++)
			{
				str += "\r\n#L" + i + "#" + patienceMap[i][0] + "#l";
			}
			cm.sendSimple(str);
		}
		else if (sel == 2) //The Deep Forest Of Patience
		{
			for (i = 0; i < deepMap.length; i++)
			{
				str += "\r\n#L" + i + "#" + deepMap[i][0] + "#l";
			}
			cm.sendSimple(str);
		}
		else if (sel == 3) //Physical Fitness Challenge
		{
			for (i = 0; i < fitnessMap.length; i++)
			{
				str += "\r\n#L" + i + "#" + fitnessMap[i][0] + "#l";
			}
			cm.sendSimple(str);			
		}
		else if (sel == 4) //Line 3 Construction Site B1/B2/B3 <Area 1>
		{
			for (i = 0; i < siteMap.length; i++)
			{
				str += "\r\n#L" + i + "#" + siteMap[i][0] + "#l";
			}
			cm.sendSimple(str);			
		}
		else if (sel == 5) //Breath of Lava
		{
			for (i = 0; i < lavaMap.length; i++)
			{
				str += "\r\n#L" + i + "#" + lavaMap[i][0] + "#l";
			}
			cm.sendSimple(str);			
		}
		else if (sel == 6) //Henesys and Ludibrium Pet Walkaway
		{
			for (i = 0; i < petMap.length; i++)
			{
				str += "\r\n#L" + i + "#" + petMap[i][0] + "#l";
			}
			cm.sendSimple(str);			
		}
		else if (sel == 7) //Witch Tower
		{
			for (i = 0; i < witchMap.length; i++)
			{
				str += "\r\n#L" + i + "#" + witchMap[i][0] + "#l";
			}
			cm.sendSimple(str);	
		}
		else if (sel == 8) //Other maps
		{
			for (i = 0; i < otherMap.length; i++)
			{
				str += "\r\n#L" + i + "#" + otherMap[i][0] + "#l";
			}
			cm.sendSimple(str);	
		}
		id = sel;
	}
	else if (status == 2) 
	{
		cm.dispose();
		if (sel >= 0)
		{
			switch (id) //Works exactly as random above. Warps party if in one automatically. id states for counter Multi-Dimentional Arrays on top of the script. 1 = patienceMap, 2 = deepMap and so carry on.
			{
				case 1:
					if (cm.getParty() == null) cm.warp(patienceMap[sel][1], 0);
					else cm.warpParty(patienceMap[sel][1], 0);
					cm.dispose();
					break;
				case 2:
					if (cm.getParty() == null) cm.warp(deepMap[sel][1], 0);
					else cm.warpParty(deepMap[sel][1], 0);
					cm.dispose();
					break;
				case 3:
					if (cm.getParty() == null) cm.warp(fitnessMap[sel][1], 0);
					else cm.warpParty(fitnessMap[sel][1], 0);
					cm.dispose();
					break;
				case 4:
					if (cm.getParty() == null) cm.warp(siteMap[sel][1], 0);
					else cm.warpParty(siteMap[sel][1], 0);
					cm.dispose();
					break;
				case 5:
					if (cm.getParty() == null) cm.warp(lavaMap[sel][1], 0);
					else cm.warpParty(lavaMap[sel][1], 0);
					cm.dispose();
					break;
				case 6:
					if (cm.getParty() == null) cm.warp(petMap[sel][1], 0);
					else cm.warpParty(petMap[sel][1], 0);
					cm.dispose();
					break;
				case 7:
					if (cm.getParty() == null) cm.warp(witchMap[sel][1], 0);
					else cm.warpParty(witchMap[sel][1], 0);
					cm.dispose();
					break;
				case 8:
					if (cm.getParty() == null) cm.warp(otherMap[sel][1], 0);
					else cm.warpParty(otherMap[sel][1], 0);
					cm.dispose();
					break;
			}
				
		}
	}
}