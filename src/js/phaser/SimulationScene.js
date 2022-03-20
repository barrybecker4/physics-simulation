import BoxWorld from "../simulations/BoxWorld.js";
import Sounds from "/physics-simulation/src/js/sounds/Sounds.js";
import NoiseContactListener from "../animation/NoiseContactListener.js";
import BridgeSimulation from "../simulations/AbstractSimulation.js";


export default class SimulationScene extends Phaser.Scene {

  constructor(simulation) {
    super(simulation.getName());
    this.simulation = simulation;
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

    this.boxWorld.setSimulation(this.simulation);

    this.input.on("pointerdown", this.selectionClick, this);
  }

  selectionClick(evt) {
      let worldX = this.toWorldScale(evt.x);
      let worldY = this.toWorldScale(evt.y);
      this.boxWorld.makeSelection(worldX, worldY);
  }

  // simple function to convert pixels to meters
  toWorldScale(n) {
      return n / this.game.config.physicsOptions.worldScale;
  }

  update(time, delta) {
    //this.bridgeSim.onFrameUpdate(timeStep);
    this.boxWorld.onEnterFrame(this.timeStep);
  }

}
