import PlanckWorld from "./PlanckWorld.js";
import phaserUtils from "./phaserUtils.js";


export default class PhysicsSimulatorScene extends Phaser.Scene {

  static NAME = "PhysicsSimulatorScene";
  static MAX_BLOCKS = 100;

  constructor() {
    super(PhysicsSimulatorScene.NAME);
  }

  create() {
    const createGraphics = () => this.add.graphics();
    const config = this.game.config;
    this.world = new PlanckWorld(config.width, config.height, config.physicsOptions, createGraphics);
    this.world.createContent();

    // creates a random box every short delay, then restarts after a while.
    this.tick = 0;
    this.time.addEvent({
        delay: 400,
        callbackScope: this,
        callback: function(){
            const xPos = Phaser.Math.Between(100, config.width - 100);
            this.world.createBox(xPos, -100, Phaser.Math.Between(20, 80), Phaser.Math.Between(20, 80), true, phaserUtils.randomColor());
            this.tick ++;
            if (this.tick === PhysicsSimulatorScene.MAX_BLOCKS) {
                this.game.scene.start(PhysicsSimulatorScene.NAME, config);
            }
        },
        loop: true
    });
  }

  update() {
    const timeStep = 1 / 30;
    this.world.update(timeStep);
  }

}
