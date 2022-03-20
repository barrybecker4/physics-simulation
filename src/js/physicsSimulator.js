import PhysicsControls from "./ui/PhysicsControls.js";
import PhysicsOptions from "./simulations/PhysicsOptions.js";
import PhaserGame from "./phaser/PhaserGame.js";

/**
 * Sets up Phaser and and handles interaction with the HTML elements.
 * Shows a dropdown to select the simulation scene to show.
 */

let game; // Phaser game object
const physicsOptions = new PhysicsOptions();


window.onload = function() {
  getSimulationSelector().onchange = simulationSelectionChanged;
  getRestartButton().onclick = doRestart;
  getPauseButton().onclick = togglePause;
  getDebugCheckbox().onclick = onCheckboxToggled;

  const physicsControls = new PhysicsControls(physicsOptions);
  initializePhaser();
  onCheckboxToggled();
};

function simulationSelectionChanged() {
  const simulationSelector = getSimulationSelector();
  game.setScene(simulationSelector.options[ simulationSelector.selectedIndex ].value)
  doResume();
}

function doRestart() {
  if (game) {
    game.getScene().start(game.getConfig().currentScene, game.getConfig());
    doResume();
  }
}

function togglePause() {
  if (game.getScene().paused) doResume();
  else doPause();
}

function doPause() {
  game.getScene().pause(game.getConfig().currentScene);
  getPauseButton().innerText = "Resume";
  game.getScene().paused = true;
}

function doResume() {
  game.getScene().resume(game.getConfig().currentScene);
  getPauseButton().innerText = "Pause";
  game.getScene().paused = false;
}

function onCheckboxToggled() {
  const debugValue = getDebugCheckbox().checked;
  game.getConfig().debug = debugValue;
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

function getDebugCheckbox() {
  return document.getElementById("debugCheckbox");
}

function initializePhaser() {
  game = new PhaserGame(physicsOptions);
  window.focus();
}
