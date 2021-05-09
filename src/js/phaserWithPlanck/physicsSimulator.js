import physicsOptions from "../physicsOptions.js";
import PlanckWorld from "./PlanckWorld.js";

let game;

window.onload = function() {
  const restartButton = document.getElementById("restartButton");
  restartButton.onclick = doRestart();

  doRestart();
}

function doRestart() {
  if (game) {
    game.destroy(true);
  }
  initializePhaser();
}

function initializePhaser() {
  let gameConfig = {
      type: Phaser.AUTO,
      backgroundColor: physicsOptions.backgroundColor,
      scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          parent: "physicsSimulator1",
          width: 600,
          height: 600
      },
      scene: playGame
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
}

class playGame extends Phaser.Scene {
  constructor(){
    super("PlayGame");
  }

  create(){
    const createGraphics = () => this.add.graphics();
    this.world = new PlanckWorld(game.config.width, game.config.height, physicsOptions, createGraphics);
    this.world.createContent();

    // creates a random box each 500ms, then restarts after a while.
    this.tick = 0;
    this.time.addEvent({
        delay: 100,
        callbackScope: this,
        callback: function(){
            const xPos = Phaser.Math.Between(100, game.config.width - 100);
            this.world.createBox(xPos, -100, Phaser.Math.Between(20, 80), Phaser.Math.Between(20, 80), true);
            this.tick ++;
            if (this.tick == 200) {
                this.scene.start("PlayGame");
            }
        },
        loop: true
    });
  }

  update(){
    const timeStep = 1 / 30;
    this.world.update(timeStep);
  }
};
