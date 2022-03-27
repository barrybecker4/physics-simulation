import BoxWorld from "../physics/BoxWorld.js";
import Sounds from "/physics-simulation/src/js/sounds/Sounds.js";
import NoiseContactListener from "../animation/NoiseContactListener.js";
import BridgeSimulation from "../physics/simulations/AbstractSimulation.js";


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
    this.boxWorld = new BoxWorld(config.width, config.height, config.physicsOptions, createGraphics, this.sounds);
    this.boxWorld.addContactListener(new NoiseContactListener(this.sounds));

    this.boxWorld.setSimulation(this.simulation);

    this.input.mouse.disableContextMenu();
    this.input.on("pointerdown", this.pointerDown, this);
    this.input.on('pointermove', this.pointerMove, this);
    this.input.on("pointerup", this.pointerReleased, this);

    this.events.on('pause', () => this.simulation.setPaused(true));
    this.events.on('resume', () => this.simulation.setPaused(false));
  }

  pointerDown(pointer) {
    const worldPoint = this.getWorldCoords(pointer);

    if (pointer.leftButtonDown()) {
      this.boxWorld.leftMouseDown(worldPoint);
    }
    else if (pointer.rightButtonDown()) {
      this.boxWorld.rightMouseDown(worldPoint);
    }
  }

  pointerMove(pointer) {
    if (pointer.leftButtonDown()) {
      this.boxWorld.leftMouseDragged(this.getWorldCoords(pointer));
    }
  }

  pointerReleased(pointer) {
    if (pointer.leftButtonReleased()) {
      this.boxWorld.leftMouseReleased(this.getWorldCoords(pointer));
    }
  }

  getWorldCoords(pointer) {
    const worldX = this.toWorldScale(pointer.x);
    const worldY = this.toWorldScale(pointer.y);
    return planck.Vec2(worldX, worldY);
  }

  // simple function to convert pixels to meters
  toWorldScale(n) {
    return n / this.game.config.physicsOptions.worldScale;
  }

  setPaused(paused) {
    this.paused = paused;
    this.simulation.setPaused(paused);
  }

  update(time, delta) {
    //this.simulation.onFrameUpdate(timeStep);
    this.boxWorld.onEnterFrame(this.timeStep);
  }

}
