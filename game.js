// the game itself
var game;
// the spinning wheel
var wheel; 
// can the wheel spin?
var canSpin;
// slices (prizes) placed in the wheel
var slices = 12;
var title = "DARE ROUND";
var w;
var h;
// prize names, starting from 12 o'clock going clockwise
var slicePrizes = ["Act like you are the world's former strongest man/woman and brag about yourself.", 
    "Do a death scene making it as dramatic as you can.", 
    "Mimic a teacher.", 
    "Propose your shoe.", 
    "Sell your old dirty handkerchief.", 
    "Deliver a dialogue of SRK in Salman's style and vice versa.", 
    "Dance on Rinkiya ke papa.", 
    "Dance with your favorite senior.",
    "You are provided with a prop and do whatever best you can do using that prop !",
    "Enact any of the leaders who stood for the elections !",
    "Kisi bhi song ka.. of your choice.. Different genre me gana.. As in if it's a rap then you may sing it as bhajan or  romantic way !",
    "Make up a funny story about the item given to you.",
    ];

var names = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
// the prize you are about to win
var prize;
// text field where to show the prize
var prizeText;

window.onload = function() {	
     // creation of a 458x488 game
     w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
     h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
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
  		game.stage.backgroundColor = "#25055b";
          // adding the wheel in the middle of the canvas
          wheel = game.add.sprite(game.width / 4, game.height / 1.8, "wheel");
          var pin2 = game.add.text(game.width / 2, game.height / 9, "DARE ROUND");
          pin2.anchor.set(0.5);
          pin2.addColor("#f4f754", 0);
          pin2.fontSize = 60;
          pin2.font = 'Comic Sans MS';

          // setting wheel registration point in its center
          wheel.anchor.set(0.5);
          // adding the pin in the middle of the canvas
          var pin = game.add.sprite(game.width / 4, game.height / 1.8, "pin");
          // setting pin registration point in its center
          pin.anchor.set(0.5);
          // adding the text fields
          prizeText = game.add.text(game.width - game.width / 3, game.height - game.height / 2, "var pin = game.add.sprite(game.width / 4, game.height / 2, );");
          // setting text field registration point in its center
          prizeText.anchor.set(0.5);
          // aligning the text to center
          prizeText.font = 'ChunkFive';
          prizeText.wordWrap = true;
          prizeText.align = 'left';
          prizeText.wordWrapWidth = 500;
          prizeText.addColor("#54f7ec", 0);
          prizeText.fontSize = 35;

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
               var rounds = game.rnd.between(2, 6);
               // then will rotate by a random number from 0 to 360 degrees. This is the actual spin
               var degrees = game.rnd.between(0, 360);
               // before the wheel ends spinning, we already know the prize according to "degrees" rotation and the number of slices
               prize = slices - 1 - Math.floor(degrees / (360 / slices));
               // now the wheel cannot spin because it's already spinning
               canSpin = false;
               // animation tweeen for the spin: duration 3s, will rotate by (360 * rounds + degrees) degrees
               // the quadratic easing will simulate friction
               var spinTween = game.add.tween(wheel).to({
                    angle: 360 * rounds + degrees + 500
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
          prizeText.text = names[prize] + '\n\n' + slicePrizes[prize];
          slicePrizes.splice( slicePrizes.indexOf(slicePrizes[prize]), 1 );
          names.splice(names.indexOf(names[prize]), 1);
          slices = slices - 1;
          if (slices == 0)
            canSpin = false;
     }
}