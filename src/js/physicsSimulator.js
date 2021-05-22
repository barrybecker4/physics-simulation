import PhysicsControls from "./ui/PhysicsControls.js";
import PhysicsSimulatorScene from "./simulations/PhysicsSimulatorScene.js";
import BridgeScene from "./simulations/BridgeScene.js";
import PhysicsOptions from "./simulations/PhysicsOptions.js";



let game;
const physicsOptions = new PhysicsOptions();


window.onload = function() {
  getSimulationSelector().onchange = simulationSelectionChanged;
  getRestartButton().onclick = doRestart;
  getPauseButton().onclick = togglePause;

  const physicsControls = new PhysicsControls(physicsOptions);
  initializePhaser();
};

function simulationSelectionChanged() {
    const simulationSelector = getSimulationSelector();
    game.scene.stop(game.config.currentScene);
    game.config.currentScene = simulationSelector.options[ simulationSelector.selectedIndex ].value;
    game.scene.start(game.config.currentScene);
    doResume();
}

function doRestart() {
  if (game) {
    game.scene.start(game.config.currentScene, game.config);
    doResume();
  }
}

function togglePause() {
  if (game.scene.paused) doResume();
  else doPause();
}

function doPause() {
  game.scene.pause(game.config.currentScene);
  getPauseButton().innerText = "Resume";
  game.scene.paused = true;
}

function doResume() {
  game.scene.resume(game.config.currentScene);
  getPauseButton().innerText = "Pause";
  game.scene.paused = false;
}

function getSimulationSelector() {
    return document.getElementById("simulationSelector");
}

function getRestartButton() {
  return document.getElementById("restartButton");
}

function getPauseButton() {
  return document.getElementById("pauseButton");
}

function initializePhaser() {
  let gameConfig = {
      type: Phaser.AUTO,
      backgroundColor: 0x110022,
      scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          parent: "physicsSimulator",
          width: 600,
          height: 600
      },
      scene: [PhysicsSimulatorScene, BridgeScene],
    };
    game = new Phaser.Game(gameConfig);
    game.config.currentScene = PhysicsSimulatorScene.NAME;
    game.config.physicsOptions = physicsOptions;

    window.focus();
}
