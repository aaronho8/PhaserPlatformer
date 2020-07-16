class Demon extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene, displayList, updateList
    }
    preload() {
        this.load.atlas('demon', 'assets/demon.png', 'assets/demon.json');
    }

    create() {
        // player walk animation
        this.anims.create({
            key: 'chase',
            frames: this.anims.generateFrameNames('demon', {
              prefix: 'demon_',
              start: 2,
              end: 3,
            }),
            frameRate: 10,
            repeat: -1
          });
        // idle with only one frame, so repeat is not neaded
        this.anims.create({
            key: 'move',
            frames: [{key: 'demon', frame: 'demon_1'}],
            frameRate: 10,
        });
    }

    update() {
        // move object left
        demon.anims.play('move', true);
        demon.flipX = false;
        this.x -= 4;
        // wraparound from left to right edge
        if (this.x <= 0-this.width) {
            this.reset();
        }
    }

    reset(){
        this.x = 2200;
    }
}