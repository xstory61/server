var lyrics = [
"Oooh.",
"We're no strangers to love.",
"You know the rules and so do I.",
"A full commitment's what I'm thinking of.",
"You wouldn't get this from any other guy.",
"I just wanna tell you how I'm feeling.",
"Gotta make you understand.",
"#r#eSO GONNA GIVE YOU UP.",
"#r#eSO GONNA LET YOU DOWN.",
"#r#eGONNA RUN AROUND AND DESERT YOU.",
"#r#eSO GONNA MAKE YOU CRY.",
"#r#eSO GONNA SAY GOODBYE",
"#r#eGONNA TELL A LIE AND HURT YOU.",
"We've known each other for so long.",
"Your heart's been aching, but.",
"You're too shy to say it.",
"Inside, we both know what's been going on.",
"We know the game and we're gonna play it.",
"And if you ask me how I'm feeling.",
"Don't tell me you're too blind to see.",
"#r#eSO GONNA GIVE YOU UP.",
"#r#eSO GONNA LET YOU DOWN.",
"#r#eGONNA RUN AROUND AND DESERT YOU.",
"#r#eSO GONNA MAKE YOU CRY.",
"#r#eSO GONNA SAY GOODBYE",
"#r#eGONNA TELL A LIE AND HURT YOU.",
"#r#eSO GONNA GIVE YOU UP.",
"#r#eSO GONNA LET YOU DOWN.",
"#r#eGONNA RUN AROUND AND DESERT YOU.",
"#r#eSO GONNA MAKE YOU CRY.",
"#r#eSO GONNA SAY GOODBYE",
"#r#eGONNA TELL A LIE AND HURT YOU.",
"#r#eSOO gonna give, so gonna give.",
"(Give you up)",
"#r#eSOO gonna give, so gonna give.",
"(Give you up)",
"We've known each other for so long.",
"Your heart's been aching, but.",
"You're too shy to say it.",
"Inside, we both know what's been going on.",
"We know the game and we're gonna play it.",
"I just wanna tell you how I'm feeling.",
"Gotta make you understand.",
"#r#eSO GONNA MAKE YOU CRY.",
"#r#eSO GONNA SAY GOODBYE",
"#r#eGONNA TELL A LIE AND HURT YOU.",
"#r#eSO GONNA GIVE YOU UP.",
"#r#eSO GONNA LET YOU DOWN.",
"#r#eGONNA RUN AROUND AND DESERT YOU.",
"#r#eSO GONNA MAKE YOU CRY.",
"#r#eSO GONNA SAY GOODBYE",
"#r#eGONNA TELL A LIE AND HURT YOU.",
"#r#eSO GONNA MAKE YOU CRY.",
"#r#eSO GONNA SAY GOODBYE",
"#r#eGONNA TELL A LIE AND HURT YOU.",
"#r#eSO GONNA GIVE YOU UP.",
"#r#eSO GONNA LET YOU DOWN.",
"#r#eGONNA RUN AROUND AND DESERT YOU.",
"#r#eSO GONNA MAKE YOU CRY.",
"#r#eSO GONNA SAY GOODBYE",
"#r#eGONNA TELL A LIE AND HURT YOU.",
"#r#eSO GONNA MAKE YOU CRY.",
"#r#eSO GONNA SAY GOODBYE",
"#r#eGONNA TELL A LIE AND HURT YOU.",
"#r#eSO GONNA GIVE YOU UP.",
"#r#eSO GONNA LET YOU DOWN.",
"#r#eGONNA RUN AROUND AND DESERT YOU.",
"#r#eSO GONNA MAKE YOU CRY.",
"#r#eSO GONNA SAY GOODBYE",
"#r#eGONNA TELL A LIE AND HURT YOU.",
];

var i = 0;

function start() {
	action (1, 0, 0);
}

function action(m, t, s) {
	if (i < lyrics.length) {
		cm.sendOk(lyrics[i]);
		i ++;
	} else {
		cm.sendOk("Rick Rolled!");
		cm.dispose();
	}
}