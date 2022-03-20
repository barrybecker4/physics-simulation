import PlanckWorld from "./PlanckWorld.js";
import phaserUtils from "../phaser/phaserUtils.js";
import Sounds from "../sounds/Sounds.js";


export default class FallingBoxesScene extends Phaser.Scene {

  static NAME = "FallingBoxesScene";
  static MAX_BLOCKS = 200;

  constructor() {
    super(FallingBoxesScene.NAME);
  }

  preload() {
    this.sounds = new Sounds(this);
    this.timeStep = 1 / 30;
  }

  create() {
    const createGraphics = () => this.add.graphics();
    const config = this.game.config;
    this.planckWorld = new PlanckWorld(config.physicsOptions, createGraphics, this.sounds);
    this.planckWorld.createGround( config.width / 3, config.height - 20, config.width / 2, 40);

    // creates a random box every short delay, then restarts after a while.
    let tick = 0;
    this.time.addEvent({
        delay: 600,
        callbackScope: this,
        callback: () => {
            this.createRandomBox(config);
            tick++;
            if (tick === FallingBoxesScene.MAX_BLOCKS) {
                this.sounds.playScrape();
                this.game.scene.start(FallingBoxesScene.NAME, config);
            }
        },
        loop: true
    });
  }

  createRandomBox(config) {
    const xPos = Phaser.Math.Between(100, config.width - 100);
    const randomWidth = Phaser.Math.Between(20, 80);
    const randomHeight = Phaser.Math.Between(20, 80);
    this.planckWorld.createBox(xPos, -100, randomWidth, randomHeight, true, phaserUtils.randomColor());
  }

  update(time, delta) {
    this.planckWorld.update(this.timeStep);
  }

}
