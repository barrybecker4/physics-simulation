import BoxWorld from "./BoxWorld.js";
import Sounds from "/physics-simulation/src/js/sounds/Sounds.js";
import NoiseContactListener from "../animation/NoiseContactListener.js";
import BridgeSimulation from "./BridgeSimulation.js";


export default class BridgeScene extends Phaser.Scene {

  static NAME = "BridgeScene";

  constructor(){
    super(BridgeScene.NAME);
  }

  preload() {
    this.sounds = new Sounds(this);
    this.timeStep = 1 / 30;
  }

  create() {
    const createGraphics = () => this.add.graphics();
    const config = this.game.config;
    this.boxWorld = new BoxWorld(config.width, config.height, config.physicsOptions, createGraphics);
    this.boxWorld.addContactListener(new NoiseContactListener(this.sounds));

    this.bridgeSim = new BridgeSimulation();
    this.boxWorld.setSimulation(this.bridgeSim);
  }


  update(time, delta) {
    //this.bridgeSim.onFrameUpdate(timeStep);
    this.boxWorld.onEnterFrame(this.timeStep);
  }

}
