/*
	Interstellar 2017
*/
/*  Author:			Art
	NPC Name: 		Sparkling Crystal
	Description: 	Deleting Character
*/
var status;
function start()
{
	status = -1
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
		cm.sendOk("I dont work for now!");
		cm.dispose();
	}	
}