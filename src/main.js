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
    scene: {
        key: 'main',
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var map;
var player;
var cursors;
var groundLayer
var text;
var score = 0;

function preload() {
    // map made with Tiled in JSON format
    this.load.tilemapTiledJSON('map', 'assets/map.json');
    // tiles in spritesheet 
    this.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth: 70, frameHeight: 70});

    // player animations
    this.load.atlas('player', 'assets/player.png', 'assets/player.json');

    this.load.audio('music', './assets/gamemusic.mp3');
}

function create() {

     //music
     this.music = this.sound.add('music');

     var musicConfig = {
         mute: false,
         volume: 1,
         rate: 1,
         detune: 0,
         seek: 0,
         loop: true,
         delay: 0
     }

     this.music.play(musicConfig);





    // load the map 
    map = this.make.tilemap({key: 'map'});

    // tiles for the ground layer
    var groundTiles = map.addTilesetImage('tiles');
    // create the ground layer
    groundLayer = map.createDynamicLayer('World', groundTiles, 0, 0);
    // the player will collide with this layer
    groundLayer.setCollisionByExclusion([-1]);

    

    // set the boundaries of our game world
    this.physics.world.bounds.width = groundLayer.width;
    this.physics.world.bounds.height = groundLayer.height;

    // create the player sprite    
    player = this.physics.add.sprite(200, 200, 'player');
    player.setBounce(0.2); // our player will bounce from items
    player.setCollideWorldBounds(true); // don't go out of the map    
    
    // small fix to our player images, we resize the physics body object slightly
    player.body.setSize(player.width, player.height-8);
    
    // player will collide with the level tiles 
    this.physics.add.collider(groundLayer, player);

   

    // player walk animation
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNames('player', {
          prefix: 'player_',
          start: 2,
          end: 3,
        }),
        frameRate: 10,
        repeat: -1
      });
    // idle with only one frame, so repeat is not neaded
    this.anims.create({
        key: 'idle',
        frames: [{key: 'player', frame: 'player_0'}],
        frameRate: 10,
    });

    this.anims.create({
        key: 'jump',
        frames: [{ key: 'player', frame: 'player_1' }],
        frameRate: 10,
      });


    cursors = this.input.keyboard.createCursorKeys();

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // make the camera follow the player
    this.cameras.main.startFollow(player);

    // set background color, so the sky is not black    
    this.cameras.main.setBackgroundColor('#000000');

   
}



function update(time, delta) {
    if (cursors.left.isDown)
    {
        player.body.setVelocityX(-200);
        player.anims.play('walk', true); // walk left
        player.flipX = true; // flip the sprite to the left
    }
    else if (cursors.right.isDown)
    {
        player.body.setVelocityX(200);
        player.anims.play('walk', true);
        player.flipX = false; // use the original sprite looking to the right
    } else {
        player.body.setVelocityX(0);
        player.anims.play('idle', true);
    }
    // jump 
    if (cursors.up.isDown && player.body.onFloor())
    {
        player.body.setVelocityY(-500);        
    }
}