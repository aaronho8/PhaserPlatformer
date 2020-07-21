// Team Members:
// Aaron Ho
// Justin Lao


var config = {
    type: Phaser.AUTO,
<<<<<<< HEAD
    render: {
        pixelArt: true},
    
=======
>>>>>>> parent of d08fc88... pixel true
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 500},
            debug: false
        }
    },
    scene: [Menu, Cutscene, Game, Game1, Dead]
}

let game = new Phaser.Game(config);

var lives = 3;
var txt;
var map;
var demon;
var player;
var cursors;
var groundLayer
var text;
var groundLayer, coinLayer;
var text;
var score = 0;


let keyENTER, keyLEFT;
