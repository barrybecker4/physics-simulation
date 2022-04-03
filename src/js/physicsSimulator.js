import SimulationSelector from "./ui/SimulationSelector.js";
import PhysicsControls from "./ui/PhysicsControls.js";
import PhysicsOptions from "./physics/PhysicsOptions.js";
import PhaserGame from "./phaser/PhaserGame.js";

/**
 * Sets up Phaser and and handles interaction with the HTML elements.
 * Shows a dropdown to select the simulation scene to show.
 */

let game; // Phaser game object
const physicsOptions = new PhysicsOptions();


window.onload = function() {
  getRestartButton().onclick = doRestart;
  getPauseButton().onclick = togglePause;
  getDebugCheckbox().onclick = onCheckboxToggled;

  new SimulationSelector(simulationSelectionChanged);
  new PhysicsControls(physicsOptions);
  initializePhaser();
  onCheckboxToggled();
  simulationSelectionChanged();
};

function simulationSelectionChanged() {
  const simulationSelector = getSimulationSelector();
  const sceneName = simulationSelector.options[ simulationSelector.selectedIndex ].value;
  game.setScene(sceneName);
  doResume();
}

function doRestart() {
  if (game) {
    game.start();
    doResume();
  }
}

function togglePause() {
  if (game.getScene().paused)
    doResume();
  else doPause();
}

function doPause() {
  game.pause();
  getPauseButton().innerText = "Resume";
}

function doResume() {
  game.resume();
  getPauseButton().innerText = "Pause";
}

function onCheckboxToggled() {
  const debugValue = getDebugCheckbox().checked;
  game.setDebug(debugValue);
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
