class Cutscene extends Phaser.Scene {
    constructor() {
      super("cutScene");
    }
     

    preload() {
        // map made with Tiled in JSON format
        this.load.tilemapTiledJSON('map1', 'assets/cutscene.json');

        // tiles in spritesheet 
        this.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth: 70, frameHeight: 70});
        
   
        // player/sprite animations and animations
        this.load.atlas('player', 'assets/player.png', 'assets/player.json');
        this.load.atlas('demon', 'assets/demon.png', 'assets/demon.json');
        this.load.image('heart', './assets/heart.png');
        
        // sky assets
        this.load.image('sun', './assets/sun_shiny.png');
        this.load.image('bigCloud', './assets/big_cloud.png');
        this.load.image('smallCloud', './assets/Cloud.png');


        //bed asset
        this.load.image('bed', './assets/bed.png');
    }

    create() {
         //  replace with sky blue
         this.add.rectangle(0, 0, 2200, 540, 0x87ceeb).setOrigin(0, 0);
         this.add.rectangle(0, 500, 2200, 200, 0x9b7653).setOrigin(0, 0);

        //  replace with grey wall
        this.add.rectangle(250, 250, 1000, 250, 0xA9A9A9).setOrigin(0, 0);

        //bed
        this.add.image(300, 325, 'bed').setScale(1).setOrigin(0,0);


        // load the map 
        map = this.make.tilemap({key: 'map1'});
    
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
        player = this.physics.add.sprite(500, 340, 'player').setOrigin(0,0);
        player.setBounce(0.2); // our player will bounce from items
        player.setCollideWorldBounds(true); // don't go out of the map

        // player will collide with the level tiles 
        this.physics.add.collider(groundLayer, player);

        this.camera = this.cameras.main;

        // define keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start("gameScene");  
        }
    }
}
