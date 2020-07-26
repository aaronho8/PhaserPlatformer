/* 
*   Team Members:
*   Aaron Ho
*   Justin Lao
*
*------------------------------------------------------------------------------
*   Contributers:
*
*   Level Design:
*       Impulsive22, '2d Cloud', https://opengameart.org/content/2d-cloud
*       SalemF, 'Shiny Sun', https://opengameart.org/content/shiny-sun
*       Nicole Marie T, 'Heart 16*16', https://opengameart.org/content/heart-1616
*       CharlesGabriel 'CGArtsenal', '10 Basic Message Boxes', https://opengameart.org/content/10-basic-message-boxes
*       mase, Lorn Music Video 'Weigh Me Down',  https://vimeo.com/user3135298, (Link to Usage Agreement Below)
        ArMM1998, 'Zelda-Like Tilesets and Sprites', https://opengameart.org/content/zelda-like-tilesets-and-sprites
*
*   Sound Design:
*       Chris Avila '8 Bit Wizard', Game Music, https://linktr.ee/flouresworld
*       Pixel Beats 'Waiting For You', Game Music, https://www.youtube.com/watch?v=x9jd10FMejY
*/

var config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },

    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 800},
            debug: false
        }
    },
    scene: [Menu, Cutscene, Game, Game1, Dead, End, Credits]
}

let game = new Phaser.Game(config);

var lives = 3;
var objTxt;
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
