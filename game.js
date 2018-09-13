// the game itself
var game;
// the spinning wheel
var wheel; 
// can the wheel spin?
var canSpin;
// slices (prizes) placed in the wheel
var slices = 12;
// prize names, starting from 12 o'clock going clockwise
var slicePrizes = ["Act like you are the world's former strongest man/woman and brag about yourself.", 
    "Do a death scene making it as dramatic as you can.", 
    "Mimicry of a teacher.", 
    "Propose your shoe'", 
    "Sell your old dirty hankerchief.", 
    "Deliver a dialogue of SRK in Salman's style and vice versa", 
    "Dance on hehehe hss delan.", 
    "Dance with your favorite senior.",
    "Provide them a prop and ask them to do whatever best they can do using that prop !",
    "Enacting any of the leaders who stood for the elections !",
    "Kisi bhi song ka.. of their choice.. Different genre me gana.. As in if it's a rap then they may sing it as bhajan or  romantic way !",
    "Make up a tragic story about the item given to you.",
    "How you come to know that thing and how a tragedy made you apart from that thing."
    ];
// the prize you are about to win
var prize;
// text field where to show the prize
var prizeText;

window.onload = function() {	
     // creation of a 458x488 game
     var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
     var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	game = new Phaser.Game(w, h, Phaser.AUTO, "");
     // adding "PlayGame" state
     game.state.add("PlayGame",playGame);
     // launching "PlayGame" state
     game.state.start("PlayGame");
}

// PLAYGAME STATE
	
var playGame = function(game){};

playGame.prototype = {
     // function to be executed once the state preloads
     preload: function(){
          // preloading graphic assets
          game.load.image("wheel", "wheel.png");
		game.load.image("pin", "pin.png");     
     },
     // funtion to be executed when the state is created
  	create: function(){
          // giving some color to background
  		game.stage.backgroundColor = "#880044";
          // adding the wheel in the middle of the canvas
  		wheel = game.add.sprite(game.width / 4, game.width / 4, "wheel");
          // setting wheel registration point in its center
          wheel.anchor.set(0.5);
          // adding the pin in the middle of the canvas
          var pin = game.add.sprite(game.width / 4, game.width / 4, "pin");
          // setting pin registration point in its center
          pin.anchor.set(0.5);
          // adding the text fields
          prizeText = game.add.text(650, 250, "How you come to know that thing and how a tragedy made you apart from that thing.");
          // setting text field registration point in its center
          prizeText.anchor.set(0.02);
          // aligning the text to center
          prizeText.wordWrap = true;
          prizeText.align = 'left';
          prizeText.wordWrapWidth = 350;
          prizeText.addColor("#8cf441", 0);
          prizeText.fontSize = 30;
          
          // the game has just started = we can spin the wheel
          canSpin = true;
          // waiting for your input, then calling "spin" function
          game.input.onDown.add(this.spin, this);		
	},
     // function to spin the wheel
     spin(){
          // can we spin the wheel?
          if(canSpin){  
               // resetting text field
               prizeText.text = "";
               // the wheel will spin round from 2 to 4 times. This is just coreography
               var rounds = game.rnd.between(2, 4);
               // then will rotate by a random number from 0 to 360 degrees. This is the actual spin
               var degrees = game.rnd.between(0, 360);
               // before the wheel ends spinning, we already know the prize according to "degrees" rotation and the number of slices
               prize = slices - 1 - Math.floor(degrees / (360 / slices));
               // now the wheel cannot spin because it's already spinning
               canSpin = false;
               // animation tweeen for the spin: duration 3s, will rotate by (360 * rounds + degrees) degrees
               // the quadratic easing will simulate friction
               var spinTween = game.add.tween(wheel).to({
                    angle: 360 * rounds + degrees
               }, 4000, Phaser.Easing.Quadratic.Out, true);
               // once the tween is completed, call winPrize function
               spinTween.onComplete.add(this.winPrize, this);
          }
     },
     // function to assign the prize
     winPrize(){
          // now we can spin the wheel again
          canSpin = true;
          // writing the prize you just won
          prizeText.text = slicePrizes[prize];
          slicePrizes.splice( slicePrizes.indexOf(slicePrizes[prize]), 1 );
          slices = slices - 1;
     }
}