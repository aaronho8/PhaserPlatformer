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
    }

    create() {
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
    }
}