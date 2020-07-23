class Credits extends Phaser.Scene {
    constructor() {
      super("creditsScene");
    }

    preload() {
        this.load.audio('ld', './assets/ld.mp3');
    }
    
    create() {
        //music
        this.music = this.sound.add('ld');
        this.ldConfig = {
            mute: false,
            volume: 0.06,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }    
        this.music.play(this.ldConfig);

        // menu display
        this.creditsConfig = {
            fontFamily: 'Arial',
            fontSize: '32px',
            backgroundColor: false,
            color: '#FFFFFF',
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

        this.add.text(centerX, centerY - textSpacer, 'The Way Life Goes', this.creditsConfig).setOrigin(0.5);

        this.clock = this.time.delayedCall(3000, () => {
            this.add.text(centerX, centerY + 30, 'Developed by Justin Lao and Aaron Ho', this.creditsConfig).setOrigin(0.5);
            this.clock = this.time.delayedCall(3000, () => {
                this.add.text(centerX, centerY + textSpacer, 'Music Done by Justin Lao and Chris Avila', this.creditsConfig).setOrigin(0.5);
            }, null, this);
            this.clock = this.time.delayedCall(7000, () => {
                if (this.fadingOut == false) {
                    this.cameras.main.fadeOut(7000);
                    this.fadingOut = true;
                  }
                  this.clock = this.time.delayedCall(7000, () => {
                    this.music.pause();
                    score = 0;
                    lives = 3;
                    this.scene.start('menuScene');
                  }, null, this);
            }, null, this);
        }, null, this);

        this.fadingOut = false;
    }
}   