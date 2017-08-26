
var status = 0, chosen = 0, iterator = 0;
var place = 0, invtype = 0, specialchosen = 0;
points = [100,90,80,70,60,50,40,30,20,10];
rates = [0,2,4,6,8,10,15,20,25,40];
drates = [0,4,6,8,10,15,20,25,35,50];
baits = [4000166,4000669,4000670,4000665,4000761,4030028,4030027,4001189,4001187,4001188];
chairs = [3010018,3010142,3010062,3010288,3010965,3010966,3010432,3010151,3010184,3011000];
rods = [1302562,1302563,1302564,1302565,1302566,1302567,1302568,1302569,1302570,1302571];
prices = [0,100,300,500,700,1000,1500,2000,3000,4000];
specials = [4000762,3994093];

function start() { 
    action(1, 0, 0);
}

function action(mode, type, selection) {
      if(mode < 1){
		  cm.dispose();
	  } else if(status == 0){
		 cm.sendSimple("\t\t\t\t\t\t\t\t#e#dMapleInfinity#k Fish Npc#n\r\n#b#e#L1##i4000166#Bait Exchanger#l\t#L2##i3994595#Point Exchanger#l\r\n#L3##i4000762# Special#l"); 
         status++;		 
	  } else if(status == 1){
		  if(selection == 2){
		   cm.sendSimple("\t\t\t\t\t#e#bMapleInfinity#k Fish Points Exchanger#n\r\n\r\n #e#b#L1##i3010151#Chairs#l\t#L2##i1302569#Rods#l\t#L3##i2432322#Rewards#l\r\n\r\n\r\n#k#n#b*Make sure you have enough #espace#n in your inventory before you proceed!");
		   status++;
		  } else if(selection == 1){
			  var msg = "\t\t\t\t\t\t#e#rMapleInfinity#k Bait Exchanger#n\r\n\r\n \tPlease select a #e#rbait#k#n to trade:\r\n";
			  var on3 = 0;
			  for(var i =0; i < baits.length; i++){
				  msg+= "#L"+i+"##i" + baits[i] + "##l\t";
				  if(on3 == 4){
					  on3 = 1;
					  msg+= "\r\n";
				  }
                  on3++;				  
			  }
			  cm.sendSimple(msg);
			  status = 3;
		  } else if(selection == 3){
			   var msg = "\t\t\t\t\t\t\t\t#e#gMapleInfinity#k Special#n\r\n #e\t#L0##g1#k #i4000762# for a #rSPECIAL#k reward#l\r\n";
			   msg+= "\t#L1##r100#k Fishing Points for #g1#k #i3994093##l\r\n";
			   
		       cm.sendSimple(msg)
			   status = 7;
		 }
			   
	  } else if(status == 2){
		  switch(selection){
			  case 1:
			  place = 1;
			  var chairmsg = "\t\t\t\t\t\t#e#bMapleInfinity#k Fishing Chairs#n\r\n\r\n#e\tGo ahead and pick a chair!\r\n #L0##i"+chairs[0]+"# for #g1#k VP#l \r\n";
              for(var i = 1; i < chairs.length;i++)
                 chairmsg+= "#L"+i+"##i"+chairs[i]+"# for #r" + prices[i] + "#k Fishing Points#l\r\n";
              cm.sendSimple(chairmsg);				  
 			  status = 4;
			  break;
			  case 2:
			  place = 2;
			  var rodmsg = "\t\t\t\t\t\t#e#bMapleInfinity#k Fishing Rods#n\r\n\r\n#e\tGo ahead and pick a rod!\r\n #L0##i"+rods[0]+"# for #g1#k VP#l \r\n";
              for(var i = 1; i < rods.length;i++)
                 rodmsg+= "#L"+i+"##i"+rods[i]+"# for #r" + prices[i] + "#k Fishing Points#l\r\n";
              cm.sendSimple(rodmsg);			  
			  status = 4;
			  break;
		  }
	}	else if(status == 4){
		//cm.sendOk("reached status = 4");
         if(place == 1){
			if(selection == 0){
				cm.sendOk("\t\t\t\t\t\t#e#bMapleInfinity#k Fishing Chairs#n\r\nYou can buy yourself the full starter fisherman package for just #g1#k Vote Point through the VP Exchanger NPC!");
			    cm.dispose();
			}else{
			  cm.sendYesNo("\t\t\t\t\t\t#e#bMapleInfinity#k Fishing Chairs#n\r\nBuying #i" + chairs[selection] + "# will increase your catch rate by #e#b" + rates[selection] + "%#k#n ( #e#b" + drates[selection] + "#k#n% in Donor fishing map) for #r#e" + prices[selection] + "#k#n fishing points. Would you like to buy this chair?");
			  iterator = selection;
			  status = 6;
			}
		 } else if(place == 2){
			if(selection == 0){
				cm.sendOk("\t\t\t\t\t\t#e#bMapleInfinity#k Fishing Rods#n\r\nYou can buy yourself the full starter fisherman package for just #g1#k Vote Point through the VP Exchanger NPC!");
			     cm.dispose();
			}else{
			  cm.sendYesNo("\t\t\t\t\t\t#e#bMapleInfinity#k Fishing Rods#n\r\nBuying #i" + rods[selection] + "# will enable you to catch #i" + baits[selection] + "# for #r#e" + prices[selection] + "#k#n fishing points. Would you like to buy this rod?");
			  iterator = selection;
			  status = 6;
			}
		 }			
		 		
	}	else if(status == 6){
        if(cm.getPlayer().getFishpoints() > prices[iterator]-1){
			if(place == 1){
			cm.gainItem(chairs[iterator],1);					
            cm.showItemsgained(chairs[iterator],1);
			} else if(place == 2){
				cm.gainItem(rods[iterator],1);					
            cm.showItemsgained(rods[iterator],1);
			}
			cm.getPlayer().addFishpoints(-prices[iterator]);
		}
        else
          cm.getPlayer().dropMessage(6,"You don't have enough fishing points.");			
    }	else if(status == 3){
		  chosen = selection;
		  cm.sendGetNumber("\t\t\t\t\t\t#e#rMapleInfinity#k Bait Exchanger#n\r\nHow many #i"+baits[selection]+"# do you want trade? #r#e1#k#n Fish point = #b#e" + points[selection] + "#k#n #i" + baits[selection] + "\r\n",3,1,10000);
		  status=5;
	}	else if(status == 5){
		  cm.tradeBait(cm.getText(),points[chosen],baits[chosen]);
	}   else if(status == 7){		
		switch(selection){
			case 0:
			invtype = 4;
			break;
			case 1: 
			invtype = 3;
			break;
		} if(cm.haveItem(specials[selection],1,invtype)){
			 switch(selection){
				 case 0:
				 cm.sendYesNo("\t\t\t\t\t\t\t\t#e#gMapleInfinity#k Special#n\r\nTrading #i" + specials[selection] + "# will grant you a #r#eSPECIAL#k#n reward.. Do you wish to make the trade?");
				 specialchosen = 0;
				 break;
				 case 1:
				 cm.sendYesNo("\t\t\t\t\t\t\t\t#e#gMapleInfinity#k Special#n\r\nTrading #i" + specials[selection] + "# will grant you a #r#e100#k#n fishing points. Do you wish to make the trade?");				 
				 specialchosen = 1;
				 break;
			 }
			 status = 8;
		 }
		 else{
			 cm.sendOk("\t\t\t\t\t\t\t\t#e#gMapleInfinity#k Special#n\r\nYou don't have any #i" + specials[selection] +"# #eGet serious!#n Come back later when you've got the goods.");
			 cm.dispose();
		 }
	} else if(status == 8){ 
	   switch(specialchosen){
		   case 0:
		   cm.loseItem(specials[specialchosen],1,invtype);
		   cm.gainItem(1002140,1);
		   cm.showItemsgained(1002140,1);
		   break;
		   case 1:
		   cm.loseItem(specials[specialchosen],1,invtype);
		   cm.getPlayer().addFishpoints(100);
		   break;
	   }
	}	
}
