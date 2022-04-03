import AbstractSimulation from "./AbstractSimulation.js";
import BasicShapeBuilder from "/physics-simulation/src/js/animation/builders/BasicShapeBuilder.js";
import CrapBuilder from "/physics-simulation/src/js/animation/builders/CrapBuilder.js";
import AbstractBuilder from "/physics-simulation/src/js/animation/builders/AbstractBuilder.js";
import Util from "/physics-simulation/src/js/animation/common/Util.js";

const MAX_BLOCKS = 100;
const WIDTH = 600;
const HEIGHT = 600


export default class FallingBoxesSimulation extends AbstractSimulation {

  initialize(world, createGraphics, params, sounds) {
    super.initialize(world, createGraphics, params, sounds);
    this.params.gravity = 5;
    this.shapeBuilder = new BasicShapeBuilder(world, createGraphics, params.worldScale);

    // keep track of the boxes so that we can periodically delete them
    this.randomBoxes = [];
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
         this.randomBoxes.push(this.createRandomBox());
         tick++;
         if (tick === MAX_BLOCKS) {
           // destroy all blocks and start over

           this.sounds.playScrape();
           this.destroyBoxes();
           tick = 0;
         }
       }
     }, 600);
   }

  createGroundElement(posX, posY, width, height) {
    const bodyDef = { type: 'static' }
    const style = { color: 0x00ee11, opacity: 0.9 }
    return this.shapeBuilder.createBox(posX, posY, width, height, bodyDef, style);
  }

  createRandomBox() {
    const xPos = Phaser.Math.Between(100, WIDTH - 100);
    const randomWidth = Phaser.Math.Between(20, 80);
    const randomHeight = Phaser.Math.Between(20, 80);

    const bodyDef = { type: 'dynamic', bullet: true }
    const style = { color: Util.getRandomColor(), opacity: 0.7 }
    return this.shapeBuilder.createBox(xPos, -100, randomWidth, randomHeight, bodyDef, style);
  }

  destroyBoxes() {
    while (this.randomBoxes.length) {
      const box = this.randomBoxes.pop();

      const userData = box.getUserData();
      userData.destroy();
      this.world.destroyBody(box);
    }
  }
}