/*
  */

var status = 1;
var ids = [682000200,922240000,280020000,280020001,103000900,
103000903,103000906,100000202,220000006,
610020000,610020001,990000611,990000641,
101000100,101000101,101000102,101000103,101000104,
105040310,105040311,105040312,105040313,105040314,105040315,105040316,
109040001,109040002,109040003,109040004,992041000,992042000,922000000,
922020000,921110000,992022000,992017000,992048000];
var chosen=0,starter = 0, limit = 0;
var jqnames = ["Ghost Chimney","Space Gaga","Breath of Lava <Level 1>","Breath of Lava <Level 2>",
"Line 3 Construction Site - B1","Line 3 Construction Site - B2","Line 3 Construction Site - B3",
"Pet-Walking Road","Ludibrium Pet Walkway",
"Valley of Heroes 1","Valley of Heroes 2", "End of Maze (1)","End of Maze (2)",
"The Forest of Patience <Step 1>","The Forest of Patience <Step 2>",
"The Forest of Patience <Step 3>","The Forest of Patience <Step 4>","The Forest of Patience <Step 5>",
"The Deep Forest of Patience <Step 1>","The Deep Forest of Patience <Step 2>",
"The Deep Forest of Patience <Step 3>","The Deep Forest of Patience <Step 4>",
"The Deep Forest of Patience <Step 5>","The Deep Forest of Patience <Step 6>",
"The Deep Forest of Patience <Step 7>","Physical Fitness Challenge <Level 1>",
"Physical Fitness Challenge <Level 2>","Physical Fitness Challenge <Level 3>",
"Physical Fitness Challenge <Level 4>", "Fairy's Path <Stage 1>",
"Fairy's Path <Stage 2>", "Toy Factory <Sector 4>",
"The Forgotten Darkness","Rider's Field","In the clouds","Swamp Forest","Forest of Invisibility"];
var infinity = "\t\t\t\t\t\t#r#eMapleInfinity#k Jump Quests#n\r\n";
var msg = "";
function start() { 
    action(1, 0, 0);
}

function action(mode, type, selection) {   		
        if (status == 0) {
               cm.sendNext("Hey there! I'm the JQ npc. Please click #r'Next'#k to choose a JQ from the list!");
			   status++;
		} else {
			if(mode < 1){
				cm.dispose();
			}
			else {
				if(status == 1){
				cm.sendSimple(infinity + "\tGo ahead and choose a jumpquest! " + 
				"\r\n#L0##bRandom#k#l \r\n\r\n" +
				"#L1#Ghost Chimney#l" +
				"\t\t\t" +
				"#L2#  Space Gaga#l \r\n" +
				"#L3#Breath of Lava#l" +
				"\t\t\t\t" +
				"#L5#Construction Sites#l \r\n" +
				"#L8#Pet-Walkways#l" +
				"\t\t\t\t" +
				"#L10#Valley of Heroes#l \r\n" +
				"#L12#End of Maze#l" +
				"\t\t\t\t\t" +
				"#L14#Forest of Patience#l \r\n" +
				"#L26#Fitness#l" +
				"\t\t\t\t\t\t\t" +
				"#L19#Deep Forest of Patience#l \r\n" +
				"#L30#Fairy's Path#l" +
				"\t\t\t\t\t" +
				"#L33##rOther#k#l \r\n");
				status++;
			}
			else if(status == 2){
				if(selection == 0){
					chosen = ids[Math.floor((Math.random()*(ids.length-1)))];
                    cm.getPlayer().startJQ(chosen);
                    cm.dispose();					
			    
				}
				else if(selection > 0 && selection < 3){ // Solo jqs
					chosen = ids[selection-1];
					msg+= infinity + cm.JQrank(chosen) + "\r\n" + cm.JQpersrank(chosen) + "#b\r\n#L100# Start JQ#l";
			    cm.sendSimple(msg);
			    status = 4;
				}
				else{ // Grouped jqs
					starter = selection-1;
					if(starter == 2 || starter == 7 || starter == 9 || starter == 11  || starter == 29)
						limit = starter+2;
					else if(starter == 4)
						limit = starter+3;
					else if(starter == 25)
						limit = starter+4;
					else if(starter == 13 || starter == 32)
						limit = starter+5; 
					else if(starter == 18)
						limit = starter+7;
					msg = infinity + "Please choose out a jq from the group!\r\n";
					for(var i = starter; i < limit; i++)
						msg+= "#L"+i+"#"+jqnames[i]+"#l\r\n";
					cm.sendSimple(msg);
					msg="";
					status++;
				}
				
		    }
			else if(status == 3){
				chosen = ids[selection];
	        msg+= infinity + cm.JQrank(chosen) + cm.JQpersrank(chosen) + "#b\r\n#L100# Start JQ#l";
			cm.sendSimple(msg);
			status++;
			}
			else if(status == 4){
				if(selection == 100)
			cm.getPlayer().startJQ(chosen)			
				
				cm.dispose();
			}
		}
    }
}  