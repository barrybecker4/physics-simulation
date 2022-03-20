import AbstractSimulation from "./AbstractSimulation.js";
import BasicShapeBuilder from "../animation/builders/BasicShapeBuilder.js";
import CrapBuilder from "../animation/builders/CrapBuilder.js";
import AbstractBuilder from "../animation/builders/AbstractBuilder.js";


const NUM_SHAPES = 50;
const NUM_SEGMENTS = 10;

/** the length of one of the bridge planks */
const SEGMENT_WIDTH = 44;
const HALF_SEGMENT_WIDTH = SEGMENT_WIDTH / 2.0;

const BRIDGE_HEIGHT = 300;
const BRIDGE_STARTX = 100;
const ANCHOR_SIZE = 1;


export default class BridgeSimulation extends AbstractSimulation {

  constructor() {
    super();
  }

  initialize(world, createGraphics, params) {
    super.initialize(world, createGraphics, params);

    this.shapeBuilder = new BasicShapeBuilder(world, createGraphics, params.worldScale);
    this.crapBuilder = new CrapBuilder(world, createGraphics, params.worldScale);
  }

  addStaticElements() {
    this.anchor = new planck.Vec2();
    // used to do this.world.getGroundBody();
    this.ground = this.createGroundElement(300, 600, 400, 10 );
  }

  createGroundElement(posX, posY, width, height) {
    return this.shapeBuilder.createBox(posX, posY, width, height, false, 0x00ee11);
  }

  getName() {
    return "BridgeScene";
  }

  addDynamicElements(){
    const bodyDef = {
      type: 'dynamic',
      position: new planck.Vec2(),
      density: 10.0,
      friction: 0.2
    };
    this.addBridge(bodyDef);
    this.crapBuilder.addCrap(bodyDef, 6, 2, 2); // 5, 15);
  }

  /** Bridge */
  addBridge(bodyDef) {

    const s = this.scale;
    let body;
    let prevBody = this.createGroundElement(BRIDGE_STARTX - HALF_SEGMENT_WIDTH, BRIDGE_HEIGHT + 60, 30, 10);

    const jd = {
      //lowerAngle: AbstractBuilder.degreesToRadians(-25), // not working
      //upperAngle: AbstractBuilder.degreesToRadians(25),
      //enableLimit: true,
    }

    for (let i = 0; i < NUM_SEGMENTS; ++i) {
      bodyDef.position.set((BRIDGE_STARTX + HALF_SEGMENT_WIDTH + SEGMENT_WIDTH * i) / s, BRIDGE_HEIGHT/ s);
      body = this.shapeBuilder.buildBlock(HALF_SEGMENT_WIDTH, 5, bodyDef, 20.0, 0.2, 0.1);

      this.anchor.set((BRIDGE_STARTX + SEGMENT_WIDTH * i) / s, BRIDGE_HEIGHT / s);

      const rjoint = planck.RevoluteJoint(jd, prevBody, body, this.anchor);
      this.world.createJoint(rjoint);
      prevBody = body;
    }

    let rightBody = this.createGroundElement(BRIDGE_STARTX + SEGMENT_WIDTH * (0.5 + NUM_SEGMENTS), BRIDGE_HEIGHT + 60, 30, 10);
    this.anchor.set((BRIDGE_STARTX + SEGMENT_WIDTH * NUM_SEGMENTS) / s, BRIDGE_HEIGHT / s);
    this.world.createJoint(planck.RevoluteJoint(jd, prevBody, rightBody, this.anchor));
  }


}