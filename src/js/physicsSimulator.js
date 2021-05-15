import physicsOptions from "./physicsOptions.js";
import PhysicsSimulatorScene from "./PhysicsSimulatorScene.js";


let game;

window.onload = function() {
  const restartButton = document.getElementById("restartButton");
  restartButton.onclick = doRestart;

  const pauseButton = document.getElementById("pauseButton");
  pauseButton.onclick = doPause;

  initializePhaser();
}

function doRestart() {
  if (game) {
    game.scene.start(PhysicsSimulatorScene.name, game.config);
  }
}

function doPause() {
  const pauseButton = document.getElementById("pauseButton");

  if (game.scene.paused) {
    game.scene.resume(PhysicsSimulatorScene.name);
    pauseButton.innerText = "Pause";
  }
  else {
    game.scene.pause(PhysicsSimulatorScene.name);
    pauseButton.innerText = "Resume";
  }
  game.scene.paused = !game.scene.paused;
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
