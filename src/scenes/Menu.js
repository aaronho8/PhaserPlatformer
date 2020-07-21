class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
     
    preload() {
        this.load.image('player1', 'assets/player1.png');
        this.load.image('girl', './assets/girl.png');

        //music asset
        this.load.audio('music0', './assets/ld.mp3');
    }

    create() {

        //music
        this.music = this.sound.add('music0');
        var musicConfig = {
            mute: false,
            volume: 0.05,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }    
        this.music.play(musicConfig);

        // menu display
        var menuConfig = {
            fontFamily: 'Comic Sans MS',
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

    
        this.add.text(centerX, centerY - textSpacer, 'The Way Life Goes', menuConfig).setOrigin(0.5);
        centerX = game.config.width / 2;
        centerY = game.config.height / 2;
        menuConfig.color = '#4287f5';
        this.add.text(centerX, centerY + textSpacer, 'Press ENTER to Begin Journey', menuConfig).setOrigin(0.5);
        this.add.image(60, 520, 'player1');
        this.add.image(740, 520, 'girl');

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