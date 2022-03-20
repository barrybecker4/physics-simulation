import AbstractSimulation from "./AbstractSimulation.js";
import BasicShapeBuilder from "../animation/builders/BasicShapeBuilder.js";
import CrapBuilder from "../animation/builders/CrapBuilder.js";
import AbstractBuilder from "../animation/builders/AbstractBuilder.js";
import Util from "../animation/common/Util.js";

const MAX_BLOCKS = 200;
const WIDTH = 600;
const HEIGHT = 600


export default class FallingBoxesSimulation extends AbstractSimulation {

  initialize(world, createGraphics, params) {
    super.initialize(world, createGraphics, params);
    this.shapeBuilder = new BasicShapeBuilder(world, createGraphics, params.worldScale);
  }

  getName() {
    return "FallingBoxesScene";
  }

  addStaticElements() {
    this.ground = this.createGroundElement( WIDTH / 3, HEIGHT - 20, WIDTH / 2, 40);
  }

   addDynamicElements() {

     // creates a random box every short delay, then restarts after a while.
     let tick = 0;
     const intervalId = setInterval(() => {
       if (!this.isPaused()) {
         this.createRandomBox();
         tick++;
         if (tick === MAX_BLOCKS) {
           //this.sounds.playScrape();
           //this.start(getName(), config);
           // destroy all blocks and start over
         }
       }
     }, 600);
   }

  createGroundElement(posX, posY, width, height) {
    return this.shapeBuilder.createBox(posX, posY, width, height, false, 0x00ee11);
  }

  createRandomBox() {
    const xPos = Phaser.Math.Between(100, WIDTH - 100);
    const randomWidth = Phaser.Math.Between(20, 80);
    const randomHeight = Phaser.Math.Between(20, 80);
    //console.log("compare " + 0x88eeaa + " to " + phaserUtils.randomColor())
    this.shapeBuilder.createBox(xPos, -100, randomWidth, randomHeight, true, Util.getRandomColor());
  }
}