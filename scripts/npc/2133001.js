var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.sendOk("Alright let me know when you're ready for me to check ur Wz's!")
        cm.dispose();
    } else {
        if (mode == 0 && status == 1) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
            if (status == 0) {
                cm.sendNext("Welcome to Memory #h #, I'm not going to waste your time with some tutorial, we all know how to play Maplestory. But I am going to check to make sure you are using our Wz's so that you don't dc. \r\n#eClick next to get started.");
        } else if (status == 1) {
                cm.sendNext("#i1008577# #i01112138# \r\n\r\n Congratulations! Click #enext#n to be warped to our custom home map, thank you again for joining Memory!")
        } else if (status == 2) {
                cm.warp(51);
                cm.dispose();
        }
    }
}