import physicsOptions from "../physicsOptions.js";
import PlanckWorld from "./PlanckWorld.js";


let game;


window.onload = function() {
  const restartButton = document.getElementById("restartButton1");
  restartButton.onclick = doRestart;

  doRestart();
}

function doRestart() {
  if (game) {
    //game.destroy(true);
    game.scene.start("PlayGame");
  }
  else initializePhaser();
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
      scene: PlayGame
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
}

class PlayGame extends Phaser.Scene {
  constructor(){
    super("PlayGame");
  }

  create() {
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
            this.world.createBox(xPos, -100, Phaser.Math.Between(20, 80), Phaser.Math.Between(20, 80), true, this.randomColor());
            this.tick ++;
            if (this.tick == 200) {
                doRestart();
            }
        },
        loop: true
    });
  }

  randomColor() {
    const color = new Phaser.Display.Color();
    color.random();
    color.saturate(-30).brighten(30);
    return color;
  }

  update(){
    const timeStep = 1 / 30;
    this.world.update(timeStep);
  }
}
