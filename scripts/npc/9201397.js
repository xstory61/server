/*
* Author : Lex (Troxied)
* Npc : ioc vendor
* Date : 5/28/17
*/

var status = -1;
var searchResult;
var prevSelection;

function start() {
	cm.sendGetText("Hello! I'm the IOC Trader of Memory.\r\nType in the item name you wish to search below.\r\nTo search an Item ID, place a * infront of the Item ID.\r\n#r#e<Search results above 200 will be voided>");
}

function action(mode, type, selection) {
	if (mode != 1) {
		cm.dispose();
		return;
	}
	status ++;
	switch (status) {
	case 0:
		if (cm.getText() != "") {
			searchResult = cm.getItemSearchResult(cm.getText());
			if (searchResult.length == 0) {
				cm.sendOk("No results found!");
				cm.dispose();
				return;
			}
			if (searchResult.length < 200) {
				var text = "Here are the search results for " + cm.getText() + ".\r\n#r#eTip: Refrain from selecting items with no Tool Tips.\r\n<IOC's cost 2 Event Trophy>#k#n\r\n#e";
				for (var i = 0; i < searchResult.length; i ++)
					text += "#L" + i + "##z" + searchResult[i] + "##l\r\n";
				cm.sendSimple(text);
			} else {
				cm.sendOk("There were too many search results returned.\r\nTry again with a more specific name.");
				cm.dispose();
			}
		}
		break;
	case 1:
		if (selection > -1) {
			prevSelection = selection;
			cm.sendYesNo("#e#i" + searchResult[selection] + "# - #z" + searchResult[selection] + "##n\r\nAre you sure you would like to trade 2 Event Trophy for this item?");
		}
		break;
	case 2:
		if (cm.haveItem(4000038, 2) && cm.canHold(searchResult[prevSelection])) {
			cm.gainItem(4000038, -2);
			cm.gainItem(searchResult[prevSelection]);
		} else {
			cm.sendOk("Either you do not have enough Event Trophy or you do not have enough space in your Inventory to hold that item.");
			cm.dispose();
		}
		break;
	}
}