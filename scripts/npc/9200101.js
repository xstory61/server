/*
	XStory 2017
*/
/*  Author:			Art
	NPC Name: 		Dr. Rhomes
	Description: 	Starting
*/
var status;
function start()
{
	status = -1;
	action(1, 0 , 0);
}

function action(mode, type, sel)
{
	if (mode == -1) cm.dispose();
	else if (mode == 0 && status == 0) cm.dispose();
	if (mode == 1) status ++;
	else status --;
	if (status == 0)
	{
		cm.sendSimple("Oh... You are late! Phew you are lucky, I was about to leave! What took you so long?! \r\n\r\n" +
				      "#L0#Why did you call me here in the first place?#l\r\n" +
				      "#L1#Sorry Doc it won't happen again...#l"
					  ); 
	
	}
	else if (status == 1)
	{
		if (sel == 0)
		{
			cm.sendSimple("Remember those powerful items I was talking about before? Anyways I found a way to upgrade them!\r\n\r\n" +
						  "#L0#Really? How?#l\r\n" +
						  "#L1#What's the catch?#l\r\n"
						  );
		}
		else if (sel == 1)
		{
			cm.sendOk("Pfft fine, here have a free warp, but next time I won't be so easy on you. WILL CONTINUE DIALOGUE LATER!");
			cm.dispose();
		}
	}
	else if (status == 2)
	{
		if (sel == 0)
		{
			cm.sendSimple("Well... See those robots above? They have the crystals that we need in order to upgrade the equipment! \r\n" +
				"#L0# No way I am going to do that...#l\r\n" +
				"#L1# How do you expect me to defeat them?#l"
						 );
		}
		else if (sel == 1)
		{
			cm.sendOk("Aha straight to the point! Nothing special, really. We just need to take the crystals of the robots above us! \r\n WILL CONTINUE DIALOGUE LATER!");
		}
	}
	else if (status == 3)
	{
		cm.dispose();
		if (sel) 
		{
			cm.sendOk("We just need to take the crystals of the robots above us! \r\n WILL CONTINUE DIALOGUE LATER!");
			cm.dispel();
		}
	}
	
}