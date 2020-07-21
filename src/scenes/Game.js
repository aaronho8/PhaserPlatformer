class Game extends Phaser.Scene {
    constructor() {
      super("gameScene");
    }
     
    preload() {
        // map made with Tiled in JSON format
        this.load.tilemapTiledJSON('map', 'assets/map.json');

        // tiles in spritesheet 
        this.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth: 70, frameHeight: 70});
        
        // sky assets
        this.load.image('sun', './assets/sun_shiny.png');
        this.load.image('bigCloud', './assets/big_cloud.png');
        this.load.image('smallCloud', './assets/Cloud.png');

        // player/sprite animations and animations
        this.load.atlas('player', 'assets/player.png', 'assets/player.json');
        this.load.atlas('demon', 'assets/demon.png', 'assets/demon.json');
        this.load.image('heart', './assets/heart.png');
        
        // simple coin image
        this.load.image('coin', 'assets/coinGold.png');

        //  game music
        this.load.audio('music1', './assets/gamemusic.mp3');
    }

    create() {
        // menu display
        this.menuConfig1 = {
            fontFamily: 'Comic Sans MS',
            fontSize: '24px',
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

        //music
        this.music = this.sound.add('music1');
        var musicConfig = {
            mute: false,
            volume: 0.01,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }    
        this.music.play(musicConfig);
    
        //  replace with sky blue
        this.add.rectangle(0, 0, 2200, 540, 0x87ceeb).setOrigin(0, 0);
        this.add.rectangle(0, 500, 2200, 200, 0x9b7653).setOrigin(0, 0);
        this.add.image(-350, -300, 'sun').setScale(3).setOrigin(0,0);
        this.add.image(80, 50, 'bigCloud').setScale(3).setOrigin(0,0);
        this.add.image(200, 100, 'smallCloud').setScale(3).setOrigin(0,0);
        this.add.image(360, 80, 'smallCloud').setScale(3).setOrigin(0,0);
        this.add.image(500, 100, 'bigCloud').setScale(3).setOrigin(0,0);
        this.add.image(750, 80, 'bigCloud').setScale(3).setOrigin(0,0);
        this.add.image(1200, 100, 'bigCloud').setScale(3).setOrigin(0,0);
        this.add.image(1300, 50, 'bigCloud').setScale(3).setOrigin(0,0);
        this.add.image(1400, 80, 'smallCloud').setScale(3).setOrigin(0,0);
        this.add.image(1500, 50, 'bigCloud').setScale(3).setOrigin(0,0);
        this.add.image(1700, 80, 'bigCloud').setScale(3).setOrigin(0,0);

        // load the map 
        map = this.make.tilemap({key: 'map'});
    
        // tiles for the ground layer
        var groundTiles = map.addTilesetImage('tiles');
        // create the ground layer
        groundLayer = map.createDynamicLayer('World', groundTiles, 0, 0);
        // the player will collide with this layer
        groundLayer.setCollisionByExclusion([-1]);
    

        // coin image used as tileset
        var coinTiles = map.addTilesetImage('coin');
        // add coins as tiles
        coinLayer = map.createDynamicLayer('Coins', coinTiles, 0, 0);


        // set the boundaries of our game world
        this.physics.world.bounds.width = groundLayer.width;
        this.physics.world.bounds.height = groundLayer.height;
    
        // create the player sprite    
        player = this.physics.add.sprite(200, 200, 'player').setOrigin(0,0);
        player.setBounce(0.2); // our player will bounce from items
        player.setCollideWorldBounds(true); // don't go out of the map    
        
        //create the demon sprite
        demon = new Demon(this, 2200, 430, 'demon', 0, 30).setOrigin(0,0);  

        // small fix to our player and demon images, we resize the physics body object slightly
        //player.body.setSize(player.width - 48, player.height - 18);

        demon.setScale(4);
        demon.setSize(demon.width, demon.height + 48);
        
        // player will collide with the level tiles 
        this.physics.add.collider(groundLayer, player);
      
       coinLayer.setTileIndexCallback(17, this.collectCoin, this.function); // the coin id is 17
        // when the player overlaps with a tile with index 17, collectCoin will be called    
        this.physics.add.overlap(player, coinLayer);

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
          
        this.heartAttack = new Heartbreak(this, 2200, 150, 'heart', 0, 30).setOrigin(0,0);

        text = this.add.text(20, 550, '0', {
            fontSize: '50px',
            fill: '#00ff00'
        });
        text.setScrollFactor(0);

        this.allCoins = false;

        txt = this.add.text(680, 15, 'Lives: ' + lives, this.menuConfig1);
        txt.setScrollFactor(0);

        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }
    
    update(time, delta) {
        if ((this.allCoins == true) && (Phaser.Input.Keyboard.JustDown(keyENTER))) {
            this.scene.start("game1Scene"); 
        }

        if (score == 27) {
            this.allCoins = true;
            player.body.setVelocityX(0);
            player.anims.play('idle', true);
            this.music.pause();
        }

        if (lives == 0) {
            player.body.setVelocityX(0);
            player.anims.play('idle', true);
            this.music.pause();
            
            this.deadTxt = this.add.text(player.x - 100, player.y - 150, 'You have died! Press enter to go into the afterlife!', this.menuConfig1);
            if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
                this.scene.start("deadScene"); 
            }
        }

        if(this.allCoins == false && lives > 0) {
            this.heartAttack.update();
            demon.update();

            // Player Controls
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

            // check collisions
            if(this.checkCollision(player, this.heartAttack)) {
                lives--;
                txt.setText('Lives: ' + lives);
                this.heartAttack.reset();
            }
            if(this.checkCollision(player, demon)) {
                lives--;
                txt.setText('Lives: ' + lives);
                demon.reset();
            }
        }
    }

    // this function will be called when the player touches a coin
    collectCoin(sprite, tile) {
        coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
        score++; // add 1 point to the score
        text.setText(score); // set the text to show the current score
        return false;
    }


    checkCollision(character, object1) {
        // simple AABB checking
        if (character.x < object1.x + object1.width && 
            character.x + character.width > object1.x && 
            character.y < object1.y + object1.height &&
            character.height + character.y > object1.y) {
                return true;
        } else {
            return false;
        }
    }
}