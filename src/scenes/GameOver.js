class Dead extends Phaser.Scene {
    constructor() {
      super("deadScene");
    }

    preload() {
        // player/sprite animations and animations
        this.load.image('player2', 'assets/player1.png');
    }

    create() {
        // menu display
        this.menuConfig2 = {
            fontFamily: 'Comic Sans MS',
            fontSize: '18px',
            backgroundColor: false,
            color: '#FFFFFF',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0,
            wordWrap: { width: 300 }
        }


        // create the player sprite    
        this.player2 = this.add.image(60, 520, 'player2');

        this.camera = this.cameras.main;

        // make the camera follow the player
        this.camera.startFollow(this.player2);
        this.camera.setZoom(2);
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
        if ((Phaser.Input.Keyboard.JustDown(keyENTER))) {
            this.music.pause();
            this.scene.start("cutScene");  
        }

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        if (this.fadingIn == false) {
            this.graveTxt = this.add.text(this.player2.x - 100, this.player2.y - 150, "This can't be it! I have to date her! I can't die yet!", this.menuConfig2);
            this.resurrectTxt = this.add.text(this.player2.x - 100, this.player2.y - 300, "Press Enter to Ressurect", this.menuConfig2);
            this.menuTxt = this.add.text(this.player2.x - 100, this.player2.y - 350, "Press Left to Die", this.menuConfig2);
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