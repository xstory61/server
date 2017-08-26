/*
  */

var status = 1;
medals = [1142393,1142326,1142379,1142623,1142799,1142803,1142365,1142610,1142146,1142422,1142397];
//1142393,1142326,1142326,1142379,1142623,1142799,1142803,1142365,1142422,1142397



function start() { 
    action(1, 0, 0);
}

function action(m,t,s) {   		
  if(m < 1)
	  cm.dispose();
  else{
	  if(status == 1){
		  var msg = "#e#r \t\t\t\t\t\t\tMapleInfinity#k Rank Medals#e\r\n\t\t\t\t";
		  var space = 1;		 
		for(var i= 0; i < medals.length; i++){
         msg+= "#L"+i+"##i"+medals[i]+"##l\t\t";
		 if(space == 3){
			 msg+= "\r\n\t\t\t\t";
			 space = 0;			 
		 }
         if(i == 6 || i == 7)
             msg+= "  ";			 
		
		 space++;
		}		 
         cm.sendSimple(msg);
         status++;		 
	  
    }else if(status == 2){
		  var post = "";
		  if(s == 0)
		   post =  cm.Rbrank();
	   else if(s == 1)
		   post = cm.Currank();
	   else if(s == 2)
		   post =  cm.Eprank();
	   else if(s == 3)		
	     post = cm.Erprank();
	   else if(s == 4)
		   post =  cm.Omscorerank();
	   else if(s == 5)
		   post =  cm.Omokrank();
	   else if(s == 6)
		   post =  cm.Famerank();
	   else if(s == 9)
		   post =  cm.Onlinerank();
	   else if(s == 10)
		   post = cm.Jqptsrank();
	   else if(s == 7)
		   post = cm.Fishptsrank();
	   else if(s == 8)
		   post = cm.Fishexprank();
	   else
		   cm.dispose();
	   if(cm.isWorthy(post,medals[s]) == "//Alreadyhas//"){
		   cm.dispose();
	   } else if(cm.isWorthy(post,medals[s]) == cm.getPlayer().getName()){
		   if(cm.haveSpace()){
		 cm.oneMedal(medals[s]); 
		 cm.gainMsiMedal(medals[s]);
		   } else {
			   cm.getPlayer().dropMessage(5,"Your inventory is full! Please clear a slot before proceeding");
		   }
	   } else{		   
		   cm.sendOk("I do not belong to you. My true master is #e" + cm.isWorthy(post,medals[s]) +"#n! You're \t\tnot #r#eWORTHY#k#n.");
		   cm.dispose();
	   }
		   
     }
  }
}  