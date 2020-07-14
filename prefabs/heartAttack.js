class Heartbreak extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene, displayList, updateList
    }

    update() {
        // move spaceship left
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