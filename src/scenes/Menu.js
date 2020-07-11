class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
     
    create() {
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

    
        this.add.text(centerX, centerY - textSpacer, 'Voices of a Distant Star', menuConfig).setOrigin(0.5);
        centerX = game.config.width / 2;
        centerY = game.config.height / 2;
        menuConfig.color = '#4287f5';
        this.add.text(centerX, centerY + textSpacer, 'Press ENTER to Begin Journey', menuConfig).setOrigin(0.5);

        // define keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start("gameScene");  
        }
    }
  }