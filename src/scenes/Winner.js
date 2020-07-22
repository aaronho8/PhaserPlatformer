class End extends Phaser.Scene {
    constructor() {
      super("endScene");
    }

    preload() {
        this.load.image('player1', 'assets/player1.png');
        this.load.image('girl', './assets/girl.png');
    }
}