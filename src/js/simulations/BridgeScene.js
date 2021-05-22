import PlanckWorld from "./PlanckWorld.js";
import phaserUtils from "./phaserUtils.js";
import Sounds from "../sounds/Sounds.js";
import NoiseContactListener from "../animation/NoiseContactListener.js";


export default class BridgeScene extends Phaser.Scene {

  static NAME = "BridgeScene";
  static MAX_BLOCKS = 100;

  constructor(){
    super(BridgeScene.NAME);
  }

  preload() {
    this.sounds = new Sounds(this);
  }

  create() {
    const createGraphics = () => this.add.graphics();
    const config = this.game.config;
    this.world = new PlanckWorld(config.width, config.height, config.physicsOptions, createGraphics);
    this.world.addContactListener(new NoiseContactListener(this.sounds));
    this.world.createGround(this.world.width / 4, this.world.height - 20, 0.7 * this.world.width, 60);

    // creates a random box every short delay, then restarts after a while.
    this.tick = 0;
    this.time.addEvent({
        delay: 1000,
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
