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
  // Put all the scened that will appear in the scene selector here.
  scene: [
    BridgeScene,
    FallingBoxesScene,
  ],
};

export default class PhaserGame {

  constructor(physicsOptions) {
    this.game = new Phaser.Game(gameConfig);
    this.game.config.currentScene = gameConfig.scene[0].NAME;
    this.game.config.physicsOptions = physicsOptions;
  }

  getConfig() {
    return this.game.config;
  }

  getScene() {
    return this.game.scene;
  }

  setScene(scene) {
    this.getScene().stop(this.getConfig().currentScene);
    this.getConfig().currentScene = scene;
    this.getScene().start(scene);
  }

}