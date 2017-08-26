/*
-- JavaScript -----------------
Lord Jonathan - Nautilus' Port
-- Created By --
Cody/Cyndicate
-- Totally Recreated by Moogra--
-- Function --
No specific function, useless text.
-- GMS LIKE --
*/
var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) 
{
    if (mode == -1) cm.dispose();
    else if (mode == 0 && status == 0) cm.dispose();
	if (mode == 1) status++;
	else status--;
	
    if (status == 0) 
	{
        cm.sendSimple("\t\t\t\t\t\t#b#eInterstellar All In One Shop#k\r\n\r\n" + 
		              "#L0##bMagician#l#k\r\n" +
		              "#L1##dThief#l#k\r\n" +
					  "#L2##rWarrior#l#k\r\n" +
					  "#L3##gArcher#l#k\r\n" +
					  "#L4##kPirate#l\r\n" +
					  "#L5#Common#l\r\n" +
					  "#L6#ETC#l"
					  );
    } 
	else if (status == 1) 
	{
        if (selection == 0) 
		{ // Magician Choices
            cm.sendSimple("\t\t\t\t\t\t\t\t\t\t#e#bMagician#n#k\r\n" +
						  "#L0#Hats#l\r\n" +
						  "#L1#Overalls#l\r\n" +
						  "#L2#Gloves#l\r\n" +
						  "#L3#Shields#l\r\n" +
						  "#L4#Shoes#l\r\n" +
						  "#L5#Wands#l\r\n" +
						  "#L6#Staffs#l#k"
						  );
        } 
		else if (selection == 1) 
		{ // Thief Choices
            cm.sendSimple("\t\t\t\t\t\t\t\t\t\t#d#eThief#k\r\n" +
						  "#L7#Hats#l\r\n" +
			              "#L8#Tops#l\r\n" +
						  "#L9#Bottoms#l\r\n" +
						  "#L10#Overalls#l\r\n" +
						  "#L11#Gloves#l\r\n" +
						  "#L12#Shields#l\r\n" +
						  "#L13#Shoes#l\r\n" +
						  "#L14#Daggers#l\r\n" +
						  "#L15#Claws#l\r\n" +
						  "#L16#Throwing Stars#l"
						  );
        } 
		else if (selection == 2) 
		{ // Warrior Choices
            cm.sendSimple("\t\t\t\t\t\t\t\t\t\t#r#eWarrior#k\r\n" +
					      "#L17#Hats#l\r\n" +
						  "#L18#Warrior Top#l\r\n" +
						  "#L19#Bottom#l\r\n" +
						  "#L20#Overalls#l\r\n" +
						  "#L21#Gloves#l\r\n" +
						  "#L22#Shields#l\r\n" +
						  "#L23#Shoes#l\r\n" +
						  "#L24#One-Handed Axes#l\r\n" +
						  "#L25#Two-Handed Axes#l\r\n" +
						  "#L26#One-Handed BWs#l\r\n" +
						  "#L27#Two-Handed BWs#l\r\n" +
						  "#L28#One-Handed Swords#l\r\n" +
						  "#L29#Two-Handed Swords#l\r\n" +
						  "#L30#Spears#l\r\n" +
						  "#L31#Pole Arms#l"
						  );
        } 
		else if (selection == 3) 
		{ // Archer Choices
            cm.sendSimple("\t\t\t\t\t\t\t\t\t\t#g#eArcher#k\r\n" +
						  "#L32#Hats#l\r\n" +
						  "#L33#Overalls#l\r\n" +
						  "#L34#Gloves#l\r\n" +
						  "#L35#Shoes#l\r\n" +
						  "#L36#Bows#l\r\n" +
						  "#L37#CrossBows#l\r\n" +
						  "#L38#Arrows#l"
						  );
        } 
		else if (selection == 4) 
		{ // Pirate Choices
            cm.sendSimple("\t\t\t\t\t\t\t\t\t\t#ePirate#k\r\n" +
						  "#L39#Hats#l\r\n" +
						  "#L40#Overalls#l\r\n" +
						  "#L41#Gloves#l\r\n" +
						  "#L42#Shoes#l\r\n" +
						  "#L43#Weapons#l\r\n" +
						  "#L44#Bullets and Capsules#l"
						  );
        } 
		else if (selection == 5) 
		{ // Common Choices
            cm.sendSimple("\t\t\t\t\t\t\t\t\t\t#eCommon#k\r\n" +
						  "#L45#Hats#l\r\n" +
						  "#L46#Earrings#l\r\n" +
						  "#L47#Necklaces and Face Accessories#l\r\n" +
						  "#L48#Capes#l\r\n" +
						  "#L49#Overalls#l\r\n" +
						  "#L50#Gloves#l\r\n" +
						  "#L51#Shields#l\r\n" +
						  "#L52#Shoes#l\r\n" +
						  "#L53#Maple Weapons#l\r\n" +
						  "#L54#Level 0 Weapons#l"
						  );
        } 
		else if (selection == 6) 
		{ // ETC Choices
            cm.sendSimple("\t\t\t\t\t\t\t\t\t\t#eETC#k\r\n" +
						  "#L75#Super Megaphones, Gachapon Tickets, Rocks, and Morphs#l\r\n" +
						  "#L76#Boss Pieces#l\r\n#L77#Buffs and Potions#l\r\n#L78#Scrolls#l"
						  );
        }
    } 
	else if (status == 2) 
	{
  //      cm.openShop(5000+selection);
		cm.sendOk("not working for now!");
        cm.dispose();
    }
}
