status = -1;
playerFlag = 0;
computerFlag = 0;
var playerColor;
var computerColor;

function start() {
    cm.sendYesNo("Hello #h #. I just lost a bet against my dad. He punished me hard, so meanwhile my injuries are not yet sanitized... Wanna play tic tac toe with a brainless computer and gain a #b#t1002140##k?");
}

function action (mode, type, selection) {
    if (mode != 1) {
        if (type == 1 && mode == 0) {
            cm.sendNext("Coward.");
        }
        cm.dispose();
        return;
    }
    status++;
    if (status == 0) {
        cm.sendSimple("What do you wants be?\r\n\r\n#b#L0#First player.\r\n#L1#Second player.");
    } else if (status == 1) {
        playerColor = selection == 0 ? 3991040 : 3991049;
        computerColor = selection == 0 ? 3991023 : 3991014;
        if (selection == 1) {
            computerMoves();
        }
        play();
    } else {
        if ((playerFlag & (1 << selection)) == (1 << selection) || (computerFlag & (1 << selection)) == (1 << selection) || selection < 0 || selection > 9) {
            cm.sendNext("No cheaters allowed.");
            cm.dispose();
            return;
        }
        playerFlag |= 1 << selection;
        if (((playerFlag | computerFlag) ^ 511) == 0) {
            tie();
            return;
        }
        for (var i = 0; i < 3; ) {
            if (isWinner(playerFlag, i++)) {
                win();
                return;
            }
        }
        computerMoves();
        for (var i = 0; i < 3; ) {
            if (isWinner(computerFlag, i++)) {
                lose();
                return;
            }
        }
        play();
    }
}

function play() {
    cm.sendSimple(loadText(true));
}

function win() {
    if (cm.canHold(1002140)) {
        cm.gainItem(1002140, 1);
        cm.sendNext(loadText(false) + "\r\n\r\nWoah! You made it! Congratulations! You have won a #b#t1002140##k.");
    } else {
        cm.sendNext("Woah! You made it! Congratulations! But I'm sorry to tell you that I can give you the #b#t1002140##k because your Equip inventory seems to be full. Try again later.");
    }
    cm.dispose();
}

function isWinner(player, val) {
    return (player & (7 << (val * 3))) == 7 << (val * 3) || (player & (73 << val)) == (73 << val) || (((player & (1 << 4)) == 1 << 4) && (player & ((1 << 6) << (val * 2))) && ((player & (1 << 2) >> (val * 2))));
}

function lose() {
    cm.sendNext(loadText(false) + "\r\n\r\nIt's a shame that you have lost againts this computer. You should try again after you take your breakfast, you're probably just tired.");
    cm.dispose();
}

function computerMoves() {
    if (playerFlag == 0) {
        var rand = Math.random() * 9 | 0;
        computerFlag |= 1 << (rand + 1 & 1 == 1 ? rand : 4);
    } else {
        if (computerFlag == 0) {
            for (var i = 0; i < 4; i++) {
                if (playerFlag & (2 << i) == 2 << i) {
                    computerFlag |= 1 << 4;
                    return;
                }
            }
            var rand = Math.random() * 9 | 0;
            if (playerFlag == 1 << 4) {
                computerFlag |= 1 << (rand + 1 & 1 == 1 ? rand : 0);
            } else {
                if ((playerFlag & 1) << (rand + 1 & 1 == 1 ? rand : 4) != 1 << (rand + 1 & 1 == 1 ? rand : 4)) {
                    computerFlag |= 1 << (rand + 1 & 1 == 1 ? rand : 4);
                } else {
                    computerFlag |= 1 << 4;
                }
            }
        } else {
            for (var i = 0; i < 9; i++) {
                if (((computerFlag | playerFlag) & (1 << i)) != 0) {
                    continue;
                }
                var nextMove = (computerFlag | (1 << i));
                for (var x = 0; x < 3; x++) {
                    if (isWinner(nextMove, x)) {
                        computerFlag |= 1 << i;
                        return;
                    }
                }
                var playerPossibleMove = (playerFlag | (1 << i));
                for (var x = 0; x < 3; x++) {
                    if (isWinner(playerPossibleMove, x)) {
                        computerFlag |= 1 << i;
                        return;
                    }
                }
            }
            for (var i = 0; i < 9; i++) {
                if (((computerFlag | playerFlag) & (1 << i)) != 0) {
                    continue;
                }
                computerFlag |= 1 << i;
                break;
            }
        }
    }
}

function loadText(sendSimple) {
    var text = (sendSimple ? "Pick your move." : "Match Result.") + "\r\n\r\n";
    for (var i = 0; i < 9; i++) {
        text += ((playerFlag & (1 << i)) == (1 << i) ? "#i" + playerColor + "#" : (computerFlag & (1 << i)) == (1 << i) ? "#i" + computerColor + "#" : ((sendSimple ? "#L" + i + "#" : "") + "___")) + "\t\t" + (((i + 1) % 3 == 0 ? "\r\n" : ""));
    }
    return text;
}

function tie() {
    cm.sendNext(loadText(false) + "\r\n\r\nOh, looks you you tied with the computer. You're really good player, but you need to try harder.");
    cm.dispose();
}  