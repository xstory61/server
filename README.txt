Update list by: Art


Date 08/30/2017

Added:
	@social
	@help (not finished)
	help NPC 9201143
	Added player.ismuted() to the chat GeneralChatHandler
	!whx (doesnt work well right)
	
	
Changed:
	!wh instead of whx for warphere
	@smega item is not required anymore for interns rank +
	can't @smega if map you are in or you are muted.
	staff lower rank cannot kill staff higher rank anymore (instead super megaphone will pop up with a surprise :') )
	staff lower rank cannot mute staff higher rank anymore (instead super megaphone will pop up with a another surprise :') )
	rewrote !mutem and !mute command. Now wont affect each other, work seperately.
	
	
Fixed:
	Organized the code in GeneralChatHandler
	!reloadmap reloads everyone in the map now
	

======================================================================================================================


Date 08/29/2017

Added:
	!oxmap
	!minigame
	!bomberman
	!rlglm <number> (1,2)
	@stats
	Delete Character NPC 1052005
	
Edited:
	MapleWedding.java (incase doesnt work line 117 I had no chance to test it cause of sql)



======================================================================================================================



Date: 08/28/2017


- Organized the code in:
		GMCommands
		PlayerCommands
- Made new class DonorCommands '#'command
- rewrote !give command, Syntax: !give <type> <playername> <amount>,      Types: nx, ep, vp, ms, jp, fp, rp (For GM only!)
- rewrote !mob, Syntax: !spawn <mobid> <amount> / !spawn <mobid> <amount> hp <hp amount>
- Added Fishing Points, Event Points, Rebirth Points, Jump Quest points
- Added new functions to NPC scripting for points mentioned above in addition to vote points
- Added !heal / !heal <ign> (For interns)
- Added !mute (For Interns)
- Added !pnotice (Pop-up notice) Syntax !pnotice <message> (for admins only)
- Added !giveep <name> <amount> (for interns)
- Added !whereami (for interns)
- Changed !notice. Syntax !notice <message>
- Disabled commands openportal, closeportals, pe, startevent, endevent for GMs
- Fixed issue with commands not working if using caps lock
- Fixed the issue that !killm killed staff as well
- Fixed @rb
- Interns are able to use all typing commands now
- Interns are able to !kill, !killall, !reloadmap, !mutemap
- Interns are able to !killm/!killmap
- Interns are able to !saveall
- Interns are not able to strip any more (only admins)
- Interns are not allowed to use !gmshop (To prevent abuse) (rank GM +)
- Interns are not allowed to use !deleteitem and !dropinv (Admins only)
- GMs are able to itemvac now
- Disabled player commands in tutorial map (109090200)
- Added @stats/ @checkme

- And some more I forgot about

======================================================================================================================


