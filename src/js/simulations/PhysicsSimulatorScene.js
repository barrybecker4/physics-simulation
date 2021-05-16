import PlanckWorld from "./PlanckWorld.js";
import phaserUtils from "./phaserUtils.js";
import Sounds from "../sounds/Sounds.js";


export default class PhysicsSimulatorScene extends Phaser.Scene {

  static NAME = "PhysicsSimulatorScene";
  static MAX_BLOCKS = 200;

  constructor() {
    super(PhysicsSimulatorScene.NAME);
  }

  preload() {
    this.sounds = new Sounds(this);
    console.log("sound loaded");
  }

  create() {

    const createGraphics = () => this.add.graphics();
    const config = this.game.config;
    this.world = new PlanckWorld(config.width, config.height, config.physicsOptions, createGraphics, this.sounds);
    this.world.createContent();

    // creates a random box every short delay, then restarts after a while.
    this.tick = 0;
    this.time.addEvent({
        delay: 600,
        callbackScope: this,
        callback: function(){
            const xPos = Phaser.Math.Between(100, config.width - 100);
            this.world.createBox(xPos, -100, Phaser.Math.Between(20, 80), Phaser.Math.Between(20, 80), true, phaserUtils.randomColor());
            this.tick ++;
            this.sounds.playHit();
            if (this.tick === PhysicsSimulatorScene.MAX_BLOCKS) {
                this.sounds.playScrape();
                this.game.scene.start(PhysicsSimulatorScene.NAME, config);
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
