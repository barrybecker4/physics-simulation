import BoxWorld from "./BoxWorld.js";
import Sounds from "/physics-simulation/src/js/sounds/Sounds.js";
//import Sounds from "../sounds/Sounds.js";
import NoiseContactListener from "../animation/NoiseContactListener.js";
import BridgeSimulation from "./BridgeSimulation.js";


export default class BridgeScene extends Phaser.Scene {

  static NAME = "BridgeScene";

  constructor(){
    super(BridgeScene.NAME);
  }

  preload() {
    this.sounds = new Sounds(this);
  }

  create() {
    const createGraphics = () => this.add.graphics();
    const config = this.game.config;
    this.boxWorld = new BoxWorld(config.width, config.height, config.physicsOptions, createGraphics);
    this.boxWorld.addContactListener(new NoiseContactListener(this.sounds));
    //this.world.createGround(this.world.width / 4, this.world.height - 20, 0.7 * this.world.width, 60);

    this.bridgeSim = new BridgeSimulation();
    this.boxWorld.setSimulation(this.bridgeSim, config.physicsOptions);
  }


  update(time, delta) {
    const timeStep = 1 / 30;
    //this.bridgeSim.onFrameUpdate(timeStep);
    this.boxWorld.onEnterFrame(timeStep);
  }

}
