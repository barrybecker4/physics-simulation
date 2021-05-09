import physicsOptions from "../physicsOptions.js";

let game2;

/*
window.onload = function() {
  const restartButton = document.getElementById("restartButton2");
  restartButton.onclick = doRestart2;

  doRestart2();
}*/

function doRestart2() {
  if (game2) {
    //game2.destroy(true);
    game2.scene.start("Basic");
  }
  else initializePhaser2();
}

function initializePhaser2() {

  const config = {
    type:  Phaser.AUTO,
    backgroundColor: physicsOptions.backgroundColor,
    width: 600,
    height: 600,
    parent: "physicsSimulator2",
    physics: {
        default: 'matter',
        matter: {
            enableSleeping: true,
            gravity: {
                y: 0
            },
            debug: {
                showBody: true,
                showStaticBody: true
            }
        }
    },
    scene: Basic
  };

  game2 = new Phaser.Game(config);
  //window.focus();
}

class Basic extends Phaser.Scene {
  constructor(){
    super("Basic");
  }

  preload() {
    //this.load.image('ball', './pangball.png');
  }

  create() {
    this.matter.world.setBounds(0, 0, 600, 600, 32, true, true, false, true);

    for (var i = 0; i < 64; i++){
        var ball = this.matter.add.circle(Phaser.Math.Between(100, 600), Phaser.Math.Between(-600, 0), 16);
        //this.matter.add.image(Phaser.Math.Between(100, 700), Phaser.Math.Between(-600, 0), 'ball');
        ball.setCircle();
        ball.setFriction(0.005);
        ball.setBounce(1);
    }
  }
}


function update (time, delta) {
    controls.update(delta);
}