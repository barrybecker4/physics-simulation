import FallingBoxesScene from "../simulations/FallingBoxesScene.js";
import BridgeScene from "../simulations/BridgeScene.js";


const gameConfig = {
  type: Phaser.AUTO,
  backgroundColor: 0x110022,
  audio: {
    disableWebAudio: false,
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: "physicsSimulator",
    width: 600,
    height: 600
  },
  // Put all the scenes that will appear in the scene selector here.
  scene: [
    BridgeScene,
    FallingBoxesScene,
  ],
};

export default class PhaserGame {

  constructor(physicsOptions) {
    this.game = new Phaser.Game(gameConfig);
    this.game.config.currentSceneName = gameConfig.scene[0].NAME;
    this.game.config.physicsOptions = physicsOptions;
  }

  getConfig() {
    return this.game.config;
  }

  getScene() {
    return this.game.scene;
  }

  setScene(sceneName) {
    this.getScene().stop(this.getConfig().currentSceneName);
    this.getConfig().currentSceneName = sceneName;
    this.getScene().start(sceneName);
  }

  start() {
    this.getScene().start(this.getCurrentSceneName(), this.getConfig());
  }

  pause() {
    this.getScene().pause(this.getCurrentSceneName());
    this.getScene().paused = true;
  }

  resume() {
    this.getScene().resume(this.getCurrentSceneName());
    this.getScene().paused = false;
  }

  setDebug(debugValue) {
    this.getConfig().debug = debugValue;
  }

  getCurrentSceneName() {
    return this.getConfig().currentSceneName;
  }
}