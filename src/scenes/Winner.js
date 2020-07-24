class End extends Phaser.Scene {
    constructor() {
      super("endScene");
    }

    preload() {
        this.load.image('player1', 'assets/player1.png');
        this.load.image('girl', './assets/girl.png');
        this.load.image('sun', './assets/sun_shiny.png');

        // map made with Tiled in JSON format
        this.load.tilemapTiledJSON('winnerscene', 'assets/flatscene.json');

        // tiles in spritesheet 
        this.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth: 70, frameHeight: 70});

        // dialogue box asset
        this.load.image('dBox', './assets/dialogue_box.png');
        this.load.image('dBoxG', './assets/dBoxG.png');

        //music asset
        this.load.audio('twlg', './assets/twlg_bit.mp3');
    }

    create() {

      //music
      this.music = this.sound.add('twlg');
      this.twlgConfig = {
          mute: false,
          volume: 0.015,
          rate: 1,
          detune: 0,
          seek: 0,
          loop: true,
          delay: 0
      }    
      this.music.play(this.twlgConfig);

      // menu display
      this.winConfig = {
        fontFamily: 'Arial',
        fontSize: '18px',
        backgroundColor: false,
        color: '#FFFFFF',
        align: 'left',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 0,
        wordWrap: { width: 460 }
    }

      //  replace with sky blue
      this.add.rectangle(0, 0, 800, 540, 0xFF4500).setOrigin(0, 0);
      this.add.rectangle(0, 500, 800, 200, 0x9b7653).setOrigin(0, 0);
      this.add.image(600, -300, 'sun').setScale(3).setOrigin(0,0);

      // load the map 
      map = this.make.tilemap({key: 'winnerscene'});
    
      // tiles for the ground layer
      var groundTiles = map.addTilesetImage('tiles');
      // create the ground layer
      groundLayer = map.createDynamicLayer('World', groundTiles, 0, 0);

      this.add.image(60, 460, 'player1');
      this.add.image(740, 460, 'girl');

      this.cameras.main.fadeIn(2000);
      this.intro = false;
      this.boy1 = false;
      this.girl1 = false;
      this.boy2 = false;
      this.girl2 = false;
      this.finale = false;
      this.fadingOut = false;

      this.clock = this.time.delayedCall(2500, () => {
        this.intro = true;
      }, null, this);

      this.boyBox;
      this.boyText;
      this.girlBox;
      this.girlText;
      this.enterText;

      // define keys
      keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {
      if (this.intro == true) {
        this.boyBox = this.add.image(50, 300, 'dBox').setScale(1.5).setOrigin(0,0);
        this.boyText = this.add.text(288, 340, "I traveled across 2 whole levels to get rich enough to ask you out! So please date me!", this.winConfig).setOrigin(0.5);
        this.enterText = this.add.text(380, 395, "PRESS ENTER TO CONTINUE", this.winConfig).setOrigin(0.5);
        this.intro = false;
        this.boy1 = true;
      }

      if (this.boy1 == true && Phaser.Input.Keyboard.JustDown(keyENTER)) {
        this.boyBox.destroy();
        this.boyText.destroy();
        this.enterText.destroy();

        this.girlBox = this.add.image(260, 300, 'dBoxG').setScale(1.5).setOrigin(0,0);
        this.girlText = this.add.text(493, 340, "Money isn't everything in this world, that's an immature way of thinking! I'd never date you!", this.winConfig).setOrigin(0.5);
        this.enterText = this.add.text(586, 395, "PRESS ENTER TO CONTINUE", this.winConfig).setOrigin(0.5);

        this.boy1 = false;
        this.girl1 = true;
      }

      if (this.girl1 == true && Phaser.Input.Keyboard.JustDown(keyENTER)) {
        this.girlBox.destroy();
        this.girlText.destroy();
        this.enterText.destroy();
  
        this.boyBox = this.add.image(50, 300, 'dBox').setScale(1.5).setOrigin(0,0);
        this.boyText = this.add.text(288, 340, "I thought having money could buy happiness ... and even love. Was I wrong?", this.winConfig).setOrigin(0.5);
        this.enterText = this.add.text(380, 395, "PRESS ENTER TO CONTINUE", this.winConfig).setOrigin(0.5);

        this.girl1 = false;
        this.boy2 = true;
      }

      if (this.boy2 == true && Phaser.Input.Keyboard.JustDown(keyENTER)) {
        this.boyBox.destroy();
        this.boyText.destroy();
        this.enterText.destroy();

        this.girlBox = this.add.image(260, 300, 'dBoxG').setScale(1.5).setOrigin(0,0);
        this.girlText = this.add.text(493, 340, "Of course you were wrong. You can't think like that!", this.winConfig).setOrigin(0.5);
        this.enterText = this.add.text(586, 395, "PRESS ENTER TO CONTINUE", this.winConfig).setOrigin(0.5);

        this.boy2 = false;
        this.girl2 = true;
      }

      if (this.girl2 == true && Phaser.Input.Keyboard.JustDown(keyENTER)) {
        this.girlBox.destroy();
        this.girlText.destroy();
        this.enterText.destroy();
  
        this.boyBox = this.add.image(50, 300, 'dBox').setScale(1.5).setOrigin(0,0);
        this.boyText = this.add.text(288, 340, "I guess that's just ...", this.winConfig).setOrigin(0.5);
        this.enterText = this.add.text(380, 395, "PRESS ENTER TO CRY", this.winConfig).setOrigin(0.5);

        this.girl2 = false;
        this.finale = true;
      }

      if (this.finale == true && Phaser.Input.Keyboard.JustDown(keyENTER)) {
        if (this.fadingOut == false) {
          this.music.pause();
          this.cameras.main.fadeOut(2500);
          this.fadingOut = true;
        }
        this.clock = this.time.delayedCall(2500, () => {
          this.scene.start('creditsScene');
        }, null, this);
      }
    }
}