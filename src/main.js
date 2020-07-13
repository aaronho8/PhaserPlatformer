// Team Members:
// Aaron Ho
// Justin Lao


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 500},
            debug: false
        }
    },
    scene: [Menu, Game]
}

var game = new Phaser.Game(config);

var map;
var player;
var cursors;
var groundLayer
var text;
let keyENTER;