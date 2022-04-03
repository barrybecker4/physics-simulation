import AbstractSimulation from "./AbstractSimulation.js";
import BasicShapeBuilder from "/physics-simulation/src/js/animation/builders/BasicShapeBuilder.js";
import CrapBuilder from "/physics-simulation/src/js/animation/builders/CrapBuilder.js";
import AbstractBuilder from "/physics-simulation/src/js/animation/builders/AbstractBuilder.js";


const NUM_SEGMENTS = 12;

/** the length of one of the bridge planks */
const SEGMENT_WIDTH = 75;
const HALF_SEGMENT_WIDTH = SEGMENT_WIDTH / 2.0;

const BRIDGE_HEIGHT = 600;
const BRIDGE_STARTX = 200;
const ANCHOR_SIZE = 1;


export default class BridgeSimulation extends AbstractSimulation {

  initialize(world, createGraphics, params, sounds) {
    super.initialize(world, createGraphics, params, sounds);
    this.params.gravity = 5;

    this.shapeBuilder = new BasicShapeBuilder(world, createGraphics, params.worldScale);
    this.crapBuilder = new CrapBuilder(world, createGraphics, params.worldScale);
    this.crapBuilder.setSpawnPosition(250, 20)
  }

  getName() {
    return "Bridge";
  }

  addStaticElements() {
    this.anchor = new planck.Vec2();
    this.ground = this.createGroundElement(600, 1200, 800, 20 );
  }

  createGroundElement(posX, posY, width, height) {
    const bodyDef = { type: 'static' }
    const style = { color: 0x00ee11, opacity: 0.9 }
    return this.shapeBuilder.createBox(posX, posY, width, height, bodyDef, style);
  }

  addDynamicElements(){
    const bodyDef = {
      type: 'dynamic',
      position: new planck.Vec2(),
      density: 1.0,
      friction: 0.2,
      restitution: 0.9,
    };
    this.addBridge(bodyDef);
    this.crapBuilder.addCrap(bodyDef, 40, 30, 60);
  }

  /** Bridge */
  addBridge(bodyDef) {

    const s = this.scale;
    let body;
    let prevBody = this.createGroundElement(BRIDGE_STARTX - HALF_SEGMENT_WIDTH, BRIDGE_HEIGHT + 120, 60, 20);

    const jd = {
      //lowerAngle: AbstractBuilder.degreesToRadians(-25), // not working
      //upperAngle: AbstractBuilder.degreesToRadians(25),
      //enableLimit: true,
    }

    for (let i = 0; i < NUM_SEGMENTS; ++i) {
      bodyDef.position.set((BRIDGE_STARTX + HALF_SEGMENT_WIDTH + SEGMENT_WIDTH * i) / s, BRIDGE_HEIGHT/ s);
      const fixtureDef = { density: 20.0, friction: 0.2, restitution: 1.1 }
      body = this.shapeBuilder.buildBlock(HALF_SEGMENT_WIDTH, 10, bodyDef, fixtureDef);

      this.anchor.set((BRIDGE_STARTX + SEGMENT_WIDTH * i) / s, BRIDGE_HEIGHT / s);

      const rjoint = planck.RevoluteJoint(jd, prevBody, body, this.anchor);
      this.world.createJoint(rjoint);
      prevBody = body;
    }

    let rightBody = this.createGroundElement(BRIDGE_STARTX + SEGMENT_WIDTH * (0.5 + NUM_SEGMENTS), BRIDGE_HEIGHT + 120, 60, 20);
    this.anchor.set((BRIDGE_STARTX + SEGMENT_WIDTH * NUM_SEGMENTS) / s, BRIDGE_HEIGHT / s);
    this.world.createJoint(planck.RevoluteJoint(jd, prevBody, rightBody, this.anchor));
  }

}