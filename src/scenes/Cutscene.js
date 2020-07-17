class Cutscene extends Phaser.Scene {
    constructor() {
      super("cutScene");
    }
     
    create() {

        // define keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start("gameScene");  
        }
    }
  }