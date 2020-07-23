class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
     
    preload() {
        this.load.image('player1', 'assets/player1.png');
        this.load.image('girl', './assets/girl.png');

        //music asset
        this.load.audio('music0', './assets/ld.mp3');
        this.load.audio('coin', './assets/coin.mp3');
    }

    create() {

        //music
        this.music = this.sound.add('music0');
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
            fontFamily: 'Arial',
            fontSize: '24px',
            backgroundColor: false,
            color: '#4287f5',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //show menu text
        let centerX = game.config.width / 2;
        let centerY = game.config.height / 2;
        let textSpacer = 64;

        this.add.rectangle(0, 0, 800, 600, 0xab433c).setOrigin(0, 0);

        this.add.text(centerX, centerY - textSpacer, 'The Way Life Goes', this.menuConfig).setOrigin(0.5);
        centerX = game.config.width / 2;
        centerY = game.config.height / 2;
        this.menuConfig.color = '#4287f5';

        this.cameras.main.fadeIn(2000);

        this.add.image(60, 520, 'player1');
        this.add.image(740, 520, 'girl');

        this.clock = this.time.delayedCall(3000, () => {
            this.add.text(centerX, centerY + 30, 'Arrow Keys to Move, Space to Jump', this.menuConfig).setOrigin(0.5);
            this.clock = this.time.delayedCall(3000, () => {
                this.add.text(centerX, centerY + textSpacer, 'Press ENTER to Begin Journey', this.menuConfig).setOrigin(0.5);
            }, null, this);
        }, null, this);

        // define keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.music.pause();
            this.scene.start("cutScene");  
        }
    }
  }