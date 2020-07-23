class End extends Phaser.Scene {
    constructor() {
      super("endScene");
    }

    preload() {
        this.load.image('player1', 'assets/player1.png');
        this.load.image('girl', './assets/girl.png');


        // map made with Tiled in JSON format
        this.load.tilemapTiledJSON('winnerscene', 'assets/flatscene.json');

        // tiles in spritesheet 
        this.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth: 70, frameHeight: 70});

        // dialogue box asset
        this.load.image('dBox', './assets/dialogue_box.png');
    }
}