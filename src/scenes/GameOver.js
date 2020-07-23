class Dead extends Phaser.Scene {
    constructor() {
      super("deadScene");
    }

    preload() {
        // player/sprite animations and animations
        this.load.image('player2', 'assets/player1.png');

        // background
        this.load.image('hell', './assets/hell.jpg');

        this.load.audio('deadMusic', './assets/deadMusic.mp3');
    }

    create() {
        this.background = this.add.image(0, 0, 'hell').setScale(0.60).setOrigin(0, 0);

        // menu display
        this.menuConfig2 = {
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
            wordWrap: { width: 500 }
        }

        //music
        this.music = this.sound.add('deadMusic');
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

        // create the player sprite    
        this.player2 = this.add.image(400, 300, 'player2');

        this.camera = this.cameras.main;

        // make the camera follow the player
        this.camera.startFollow(this.player2);
        this.camera.setZoom(1.5);
        this.fadingIn = true;
        this.cameraFader();

        // define keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.clock = this.time.delayedCall(2500, () => {
            this.fadingIn = false;
        }, null, this);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyENTER) && this.fadingIn == false) {
            this.music.pause();
            score = 0;
            lives = 3;
            this.scene.start("cutScene");  
        }

        if (Phaser.Input.Keyboard.JustDown(keyLEFT) && this.fadingIn == false) {
            this.music.pause();
            score = 0;
            lives = 3;
            this.scene.start("menuScene");
        }

        if (this.fadingIn == false) {
            this.graveTxt = this.add.text(140, 440, "This can't be it! I have to date her! I can't die yet! Press Enter to Ressurect or Press Left to Die", this.menuConfig2);
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