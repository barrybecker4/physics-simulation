import PlanckWorld from "./PlanckWorld.js";
import phaserUtils from "./phaserUtils.js";
import Sounds from "../sounds/Sounds.js";

export default class BridgeScene extends Phaser.Scene {

  static NAME = "BridgeScene";
  static MAX_BLOCKS = 300;

  constructor(){
    super(BridgeScene.NAME);
  }

  preload() {
    this.sounds = new Sounds(this);
  }

  create() {
    const createGraphics = () => this.add.graphics();
    const config = this.game.config;
    this.world = new PlanckWorld(config.width, config.height, config.physicsOptions, createGraphics, this.sounds);
    this.world.createContent();

    // creates a random box every short delay, then restarts after a while.
    this.tick = 0;
    this.time.addEvent({
        delay: 40,
        callbackScope: this,
        callback: function(){
            const xPos = Phaser.Math.Between(100, config.width - 100);
            this.world.createBox(xPos, -100,
                Phaser.Math.Between(20, 80),
                Phaser.Math.Between(20, 80),
                true,
                phaserUtils.randomColor(20, 10)
            );
            this.tick ++;
            if (this.tick === BridgeScene.MAX_BLOCKS) {
                this.game.scene.start(BridgeScene.NAME, config);
            }
        },
        loop: true
    });
  }


  update(time, delta) {
    const timeStep = 1 / 30;
    this.world.update(timeStep);
  }

}
