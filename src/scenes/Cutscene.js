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

        // dialogue box asset
        this.load.image('dBox', './assets/dialogue_box.png');

        //music asset
        this.load.audio('music', './assets/twlg_bit.mp3');
    }

    create() {
        //music
        this.music = this.sound.add('music');
        var musicConfig = {
            mute: false,
            volume: 0.07,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }    
        this.music.play(musicConfig);

        // menu display
        this.menuConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '12px',
            backgroundColor: false,
            color: '#000000',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0,
            wordWrap: { width: 300 }
        }

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

        // Booleans for events
        this.sceneEnd = false;
        this.dialogueBox = false;
        this.playerMoving = true;

        // define keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.clock = this.time.delayedCall(2500, () => {
            this.fadingIn = false;
        }, null, this);
    }

    update() {
        if ((Phaser.Input.Keyboard.JustDown(keyENTER)) && (this.sceneEnd == true)) {
            this.music.pause();
            this.scene.start("gameScene");  
        }

        if ((player.x != 650) && (this.fadingIn == false)) {
            player.x += 1;
            player.anims.play('walk', true);
            if (player.x == 649) {
                this.playerMoving = false;
            }
        }

        if (this.playerMoving == false && this.dialogueBox == false) {
            if (player.body.onFloor() && this.dialogueBox == false) {
                player.body.setVelocityY(-120);
                this.dialogueBox = true;
            }   
            this.add.image(510, 495, 'dBox').setScale(1).setOrigin(0,0);
            this.add.text(665, 525, "At this rate, she'll never go out with me! Maybe if I can get rich enough, she'll fall for me! I should go look for coins.", this.menuConfig).setOrigin(0.5);
            this.add.text(720, 555, "PRESS ENTER TO GET THAT BAG", this.menuConfig).setOrigin(0.5);
            this.sceneEnd = true;
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
