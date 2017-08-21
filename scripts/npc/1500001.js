

var status = 0;
var rewardtype = 0;
omoks = [4080000,4080001,4080002,4080003,4080004,4080005,4080006,4080007,4080008,4080009,4080010,4080011];
function start() { 
    action(1, 0, 0);
}

function action(mode, type, selection) {
        if(mode < 1){
			cm.dispose();			
		}			
        else if (status == 0) {
               cm.sendSimple("\t\t\t\t\t#e#rMapleInfinity#k Vote Points Exchanger#n\r\n\r\n #e#b#L1##i4021010#Currency#l\t#L2##i4080000#Minigames#l\t#L3##i4031039#Cash#l\r\n#L4##i1402018#Training#l\t#L5##i5072000# Smega#l\t\t\t#L6##i1812000#Pet#l\r\n#L7##i1302570#Inventory#l\t#d#L8##i1002140#Other#l\r\n\r\n\r\n#k#n#b*Make sure you have enough #espace#n in your inventory before you proceed!");
			   status++;
		} else if(status == 1) {
			rewardtype = selection;
			switch(selection){
				case 1:/*
				 cm.sendSimple("#e#bMapleInfinity#k Currency\r\n#L1#10#i4021010##l-#r#e1#k Vote Point#l\r\n#L2#25#i4021010##l-#r#e2#k Vote Points#l\r\n#L3#65#i4021010##l-#r#e5#k Vote Points#l"); */
				 cm.sendSimple("#e#bMapleInfinity#k Currency\r\n\t#L1##i4021010#x10#l\t\t\t\t#L2##i4021010#x25#l\t\t\t#L3##i4021010#x65#l\r\n\r\n\t\t(#r1#k Vote Point)\t\t (#r2#k Vote Points)\t\t(#r5#k Vote Points)\r\n\t#L4##i4021010#x105#l\r\n\r\n\t\t(#r8#k Vote Points)");
				  break;
				case 2:
				 cm.sendSimple("#e#bMapleInfinity#k Minigames\r\n\t#L1##i4080100# Match cards#l\t\t#L2##i4080001# Random omok#l\r\n\r\n\t\t\t\t(#r2#k Vote Points)\t\t\t\t\t (#r2#k Vote Points)");
				  break;
				case 3:
				  cm.sendSimple("#e#bMapleInfinity#k Nx Cash\r\n\#n#b\t#L1#10000 Nx#l\t\t\t#L2#25000 Nx#l\t\t\t#L3#40000 Nx#l\r\n\r\n\t#k#e(#r1#k Vote Point)\t\t\t(#r2#k Vote Points)\t\t(#r3#k Vote Points)\r\n\r\n\t#n#b#L4#55000 Nx#l\t\t\t#L5#70000 Nx#l\t\t\t#L6#100000 Nx#l#k\r\n\r\n\t#k#e(#r4#k Vote Point)\t\t\t(#r5#k Vote Points)\t\t(#r6#k Vote Points)");
				  break;
				case 4:
				 cm.sendSimple("#r#eMapleInfinity#k Training\r\n\t#L1##i4031057# AutoRB#l\t\t#L2##i4031058# AutoRB (to same job)#l\r\n\r\n\t\t(#r15#k VP & #g1000#k Rb pts)\t\t(#r22#k VP & #g2000#k Rb pts)");
				  break;
				case 5:
				 cm.sendSimple("#e#rMapleInfinity#k Smega Perks\r\n#L1##i4032737#Cooldown decrease#l\t#L2##i4033322#Infinite smegas#l\r\n\r\n\t\t\t\t\t (#r5#k Vote Points)\t\t\t\t\t (#r4#k Vote Points)");
				  break;
				case 6:
				 cm.sendSimple("#e#rMapleInfinity#k Pet Equips\r\n#L1##i1812000# Meso Magnet#l\t#L2##i1812001# Item Pouch#l\r\n\r\n\t\t(#r4#k Vote Points)\t\t\t\t(#r4#k Vote Points)\r\n#L3##i1812004#Wing Boots#l\t\t#L4##i1812005# Binoculars#l\r\n\r\n\t\t(#r3#k Vote Points)\t\t\t\t(#r3#k Vote Points)\r\n#L5##i4033091#All-in-one Package#l\r\n\r\n\t\t\t(#r10#k Vote Points)");
				  break;
				case 7:
				 cm.sendSimple("#e#dMapleInfinity#k Inventory\r\n#L1##i1302562# Fish Starter Package#l\t#L2##i3010038# Clear Chair#l\r\n\r\n\t\t\t\t\t(#r1#k Vote Points)\t\t\t\t\t\t(#r1#k Vote Points)");
				  break;
 				case 8:
				 cm.sendSimple("#e#dMapleInfinity#k Other Rewards\r\n#L1##i5431000# 20 Additional BL Space#l\t\t#L2##i1002140# Gm job#l\r\n\r\n\t\t\t\t\t (#r3#k Vote Points)\t\t\t\t\t\t (#r25#k Vote Points)\r\n#L3##i5432000# 50 Additional BL Space#l\t#L4##i5400000# Name change#l\r\n\r\n\t\t\t\t\t (#r5#k Vote Points)\t\t\t\t\t\t\t(#r30#k Vote Points)");
				  break;
			}
                status++;
		} else if(status == 2) { 
			switch(rewardtype){
				case 1:
				switch(selection){
					case 1:	
				   if(cm.getClient().getVotePoints() > 0){
					cm.gainItem(4021010,10);					
                    cm.showItemsgained(4021010,10);	
					cm.getClient().addVotePoints(-1);
				   }
				   else
					   cm.getPlayer().dropMessage(6,"You don't have enough vote points.");
					 break;
					case 2:					
					if(cm.getClient().getVotePoints() > 1){
					cm.gainItem(4021010,25);					
                    cm.showItemsgained(4021010,25);
					cm.getClient().addVotePoints(-2);
				   }
				   else
					   cm.getPlayer().dropMessage(6,"You don't have enough vote points.");
					 break;
					case 3:					
					if(cm.getClient().getVotePoints() > 4){
					cm.gainItem(4021010,65);					
                    cm.showItemsgained(4021010,65);	
					cm.getClient().addVotePoints(-5);
				   }
				   else
					   cm.getPlayer().dropMessage(6,"You don't have enough vote points.");	
					 break;
					case 4:					
					if(cm.getClient().getVotePoints() > 7){
					cm.gainItem(4021010,105);					
                    cm.showItemsgained(4021010,105);
					cm.getClient().addVotePoints(-8);
				   }
				   else
					   cm.getPlayer().dropMessage(6,"You don't have enough vote points.");
					 break; 
				}
				  break;
				case 2:
                switch(selection){
					case 1:
					if(cm.getClient().getVotePoints() > 1){
					cm.gainItem(4080100,1);					
                    cm.showItemsgained(4080100,1);
					cm.getClient().addVotePoints(-2);
					}					
					 break;
					case 2:
					if(cm.getClient().getVotePoints() > 1){
                    var randnum = Math.floor((Math.random()*(omoks.length-1)));
                    cm.gainItem(omoks[randnum],1);
                    cm.showItemsgained(omoks[randnum],1);
					cm.getClient().addVotePoints(-2);
					}
					else
					   cm.getPlayer().dropMessage(6,"You don't have enough vote points.");
                     break;			
                  			   
                }					
				  break;
				case 3:	
				switch(selection){
					case 1:
					if(cm.getClient().getVotePoints() > 0){
						cm.getClient().getPlayer().getCashShop().gainCash(1, 10000);
						cm.getClient().addVotePoints(-1);
						cm.getPlayer().dropMessage(6,"You've gained 10,000 Nx Cash.");
						}
					else
					   cm.getPlayer().dropMessage(6,"You don't have enough vote points.");
                     break;
					case 2:
					if(cm.getClient().getVotePoints() > 1){
						cm.getClient().getPlayer().getCashShop().gainCash(1, 25000);
						cm.getClient().addVotePoints(-2);
						cm.getPlayer().dropMessage(6,"You've gained 25,000 Nx Cash.");
						}
					else
					   cm.getPlayer().dropMessage(6,"You don't have enough vote points.");
                     break;	 
                  	case 3:
					if(cm.getClient().getVotePoints() > 2){
						cm.getClient().getPlayer().getCashShop().gainCash(1, 40000);
						cm.getClient().addVotePoints(-3);
						cm.getPlayer().dropMessage(6,"You've gained 40,000 Nx Cash.");
						}
					else
					   cm.getPlayer().dropMessage(6,"You don't have enough vote points.");
                     break;	
                    case 4:
					if(cm.getClient().getVotePoints() > 3){
						cm.getClient().getPlayer().getCashShop().gainCash(1, 55000);
						cm.getClient().addVotePoints(-4);
						cm.getPlayer().dropMessage(6,"You've gained 55,000 Nx Cash.");
						}
					else
					   cm.getPlayer().dropMessage(6,"You don't have enough vote points.");
                     break;	
                    case 5:
					if(cm.getClient().getVotePoints() > 4){
						cm.getClient().getPlayer().getCashShop().gainCash(1, 70000);
						cm.getClient().addVotePoints(-5);
						cm.getPlayer().dropMessage(6,"You've gained 70,000 Nx Cash.");
						}
					else
					   cm.getPlayer().dropMessage(6,"You don't have enough vote points.");
                     break;	
					case 6:
					if(cm.getClient().getVotePoints() > 5){
						cm.getClient().getPlayer().getCashShop().gainCash(1, 100000);
						cm.getClient().addVotePoints(-6);
						cm.getPlayer().dropMessage(6,"You've gained 100,000 Nx Cash.");
						}
					else
					   cm.getPlayer().dropMessage(6,"You don't have enough vote points.");
					
                     break;	 
                }
				  break;
				case 4:
              	switch(selection){
					case 1:
					if(cm.getClient().getVotePoints() > 4 && cm.getPlayer().getRbpoints() > 999){					  
						cm.gainItem(4031057,1);					
                        cm.showItemsgained(4031057,1);
						cm.getClient().addVotePoints(-15);
						cm.getPlayer().addRbpoints(-1000);
						}
					else
					   cm.getPlayer().dropMessage(6,"You don't have enough vote points or/and rebirth points.");
                     break;	
					case 2:
					if(cm.getClient().getVotePoints() > 7 && cm.getPlayer().getRbpoints() > 1999){
						cm.gainItem(4031058,1);					
                        cm.showItemsgained(4031058,1);
						cm.getClient().addVotePoints(-22);
						cm.getPlayer().addRbpoints(-2000);
						}
					else
					   cm.getPlayer().dropMessage(6,"You don't have enough vote points or/and rebirth points.");
                }					
				  break;
				case 5:	
                switch(selection){
					case 1:					
					if(cm.getClient().getVotePoints() > 4){
					cm.gainItem(4032737,1);					
                    cm.showItemsgained(4032737,1);	
					cm.getClient().addVotePoints(-5);
				   }
				   else
					   cm.getPlayer().dropMessage(6,"You don't have enough vote points.");	
					 break;
					case 2:					
					if(cm.getClient().getVotePoints() > 3){
					cm.gainItem(4033322,1);					
                    cm.showItemsgained(4033322,1);
					cm.getClient().addVotePoints(-4);
				   }
				   else
					   cm.getPlayer().dropMessage(6,"You don't have enough vote points.");
					 break;
				}					
				  break;
				case 6:
				switch(selection){
					case 1:					
					if(cm.getClient().getVotePoints() > 3){
					cm.gainItem(1812000,1);					
                    cm.showItemsgained(1812000,1);
					cm.getClient().addVotePoints(-4);
				   }
				   else
					   cm.getPlayer().dropMessage(6,"You don't have enough vote points.");
					 break; 
					case 2:					
					if(cm.getClient().getVotePoints() > 3){
					cm.gainItem(1812001,1);					
                    cm.showItemsgained(1812001,1);
					cm.getClient().addVotePoints(-4);
				   }
				   else
					   cm.getPlayer().dropMessage(6,"You don't have enough vote points.");
					 break; 
                    case 3:					
					if(cm.getClient().getVotePoints() > 2){
					cm.gainItem(1812004,1);					
                    cm.showItemsgained(1812004,1);
					cm.getClient().addVotePoints(-3);
				   }
				   else
					   cm.getPlayer().dropMessage(6,"You don't have enough vote points.");
					 break;
 					case 4:					
					if(cm.getClient().getVotePoints() > 2){
					cm.gainItem(1812005,1);					
                    cm.showItemsgained(1812005,1);
					cm.getClient().addVotePoints(-3);
				   }
				   else
					   cm.getPlayer().dropMessage(6,"You don't have enough vote points.");
					 break; 
					case 5:					
					if(cm.getClient().getVotePoints() > 9){
					cm.gainItem(1812000,1);
					cm.gainItem(1812001,1);
					cm.gainItem(1812004,1);
					cm.gainItem(1812005,1);
                    cm.showItemsgained(1812000,1);
					cm.showItemsgained(1812001,1);
					cm.showItemsgained(1812004,1);
					cm.showItemsgained(1812005,1);
					cm.getClient().addVotePoints(-10);
				   }
				   else
					   cm.getPlayer().dropMessage(6,"You don't have enough vote points.");
					 break;  
					 
				}
				  break;
				case 7:
				 switch(selection){
					 case 2:					
					if(cm.getClient().getVotePoints() > 0){
					cm.gainItem(3010038,1);					
                    cm.showItemsgained(3010038,1);
					cm.getClient().addVotePoints(-1);
				   }
				   else
					   cm.getPlayer().dropMessage(6,"You don't have enough vote points.");
					 break; 
					case 1:					
					if(cm.getClient().getVotePoints() > 0){					
					cm.gainItem(1302562,1);
					cm.gainItem(3010018,1);
                    
					cm.showItemsgained(1302562,1);
					cm.showItemsgained(3010018,1);
					cm.getClient().addVotePoints(-1);
				   }
				   else
					   cm.getPlayer().dropMessage(6,"You don't have enough vote points.");
					 break;  
				 }
				  break;
 				case 8:
				 switch(selection){
					 case 1:
					 if(cm.getClient().getVotePoints() > 2){
					 cm.getPlayer().getBuddylist().setCapacity(cm.getPlayer().getBuddylist().getCapacity()+20);
					 cm.getPlayer().saveToDB();
					 cm.getClient().addVotePoints(-3);
					 cm.getPlayer().dropMessage(6,"You've gained 20 buddylist slots. Please relog.");
					}
				   else
					   cm.getPlayer().dropMessage(6,"You don't have enough vote points.");					 
					  break;
					 case 2:
					 if(cm.getClient().getVotePoints() > 24){
					 cm.jobGM();
					 cm.getClient().addVotePoints(-25);
					 cm.getPlayer().dropMessage(6,"You'll now be able to change to GM through the job advancer.");
					 }
				   else
					   cm.getPlayer().dropMessage(6,"You don't have enough vote points.");
					  break;
					 case 3:
					 if(cm.getClient().getVotePoints() > 4){
					 cm.getPlayer().getBuddylist().setCapacity(cm.getPlayer().getBuddylist().getCapacity()+50);
					 cm.getPlayer().saveToDB();
					 cm.getClient().addVotePoints(-5);
					 cm.getPlayer().dropMessage(6,"You've gained 50 buddylist slots. Please relog.");
					 }
				   else
					   cm.getPlayer().dropMessage(6,"You don't have enough vote points.");					 
					  break;
				  case 4:
                        cm.sendGetText("#e#dMapleInfinity#k Other Rewards\r\n\r\nInsert a #bnew#k nickname for your character!\r\n");
						status++;
                     break;						
				 }				 
				  break;
				  				  
			}
    } else if(status == 3){
	  if(cm.nameViable(cm.getText())){
		if(cm.getClient().getVotePoints() > 29){
			cm.getClient().addVotePoints(-30);	 
			cm.changeName(cm.getText());
			}
		    else
			 cm.getPlayer().dropMessage(6,"You don't have enough vote points.");
		}
	  else
		   cm.getPlayer().dropMessage(5,"Invalid nickname, please insert a valid nickname.");
	} 		
}
