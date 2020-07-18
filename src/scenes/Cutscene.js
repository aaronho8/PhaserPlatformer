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
        player = this.physics.add.sprite(420, 420, 'player').setOrigin(0,0);
        player.setBounce(0.2); // our player will bounce from items
        player.setCollideWorldBounds(true); // don't go out of the map
        this.playerMoving = false;

        // player will collide with the level tiles 
        this.physics.add.collider(groundLayer, player);

        this.camera = this.cameras.main;

        // make the camera follow the player
        this.camera.startFollow(player);
        this.camera.setZoom(2);
        this.fadingIn = true;
        this.cameraFader();

        // Boolean to check in cutscene is done
        this.sceneEnd = false;

        // define keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.clock = this.time.delayedCall(2500, () => {
            this.fadingIn = false;
        }, null, this);
    }

    update() {
        if ((Phaser.Input.Keyboard.JustDown(keyENTER)) && (this.sceneEnd == true)) {
            this.scene.start("gameScene");  
        }

        if ((player.x != 650) && (this.fadingIn == false)) {
            player.x += 1;
            this.playerMoving == false;
        }

        if (this.playerMoving == false && this.dialogueBox == false) {

        }
        
    }

    cameraFader() {
        if (this.fadingIn == true) {
            this.camera.fadeIn(2000);
        }
        else if (this.fadingOut == true) {
            this.camera.fadeOut(2000);
        }
    }
}
