import physicsOptions from "./physicsOptions.js";
import PhysicsSimulatorScene from "./PhysicsSimulatorScene.js";

let game;

window.onload = function() {
  getRestartButton().onclick = doRestart;
  getPauseButton().onclick = togglePause;

  initializePhaser();
}

function doRestart() {
  if (game) {
    game.scene.start(PhysicsSimulatorScene.NAME, game.config);
    doResume();
  }
}

function togglePause() {
  if (game.scene.paused) doResume();
  else doPause();
}

function doPause() {
  game.scene.pause(PhysicsSimulatorScene.NAME);
  getPauseButton().innerText = "Resume";
  game.scene.paused = true;
}

function doResume() {
  game.scene.resume(PhysicsSimulatorScene.NAME);
  getPauseButton().innerText = "Pause";
  game.scene.paused = false;
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
      backgroundColor: physicsOptions.backgroundColor,
      scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          parent: "physicsSimulator",
          width: 600,
          height: 600
      },
      scene: PhysicsSimulatorScene
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
}
