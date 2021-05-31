import AbstractSimulation from "./AbstractSimulation.js";
import BasicShapeBuilder from "../animation/builders/BasicShapeBuilder.js";
import CrapBuilder from "../animation/builders/CrapBuilder.js";
import AbstractBuilder from "../animation/builders/AbstractBuilder.js";


const NUM_SHAPES = 50;
const NUM_PLANKS = 10;

/** the length of one of the bridge planks */
const PLANK_LENGTH = 44;
const HALF_PLANK_LENGTH = PLANK_LENGTH / 2.0;

const BRIDGE_HEIGHT = 250;
const BRIDGE_STARTX = 100;


export default class BridgeSimulation extends AbstractSimulation {

  constructor() {
    super();
  }

  initialize(world, createGraphics, params) {
    super.initialize(world, createGraphics, params);

    this.shapeBuilder = new BasicShapeBuilder(world, createGraphics, this.scale);
    this.crapBuilder = new CrapBuilder(world, createGraphics, this.scale);
  }

  addStaticElements() {
    const width = this.world.width;
    this.anchor = new planck.Vec2();
    this.ground = this.shapeBuilder.createBox(width / 2, this.world.height - 30, width, 10, false, 0x00ee11);
  }


  addDynamicElements(){
    const bodyDef = { isDynamic: true, type: 'dyanmic', position: new planck.Vec2() }; // is it isDynamic or tye: 'dynamic'?
    //bodyDef.type = b2Body.b2_dynamicBody;
    //let bodyDef = this.world.createBody();
    //bodyDef.setDynamic();
    //bodyDef.position = new planck.Vec2();

    this.addBridge(bodyDef);
    this.crapBuilder.addCrap(bodyDef, 6, 5, 15);
  }

  /** Bridge */
  addBridge(bodyDef) {

    const s = this.scale;
    let body;
    //let body = this.builder.buildBlock(24 / s, 5 / s, bodyDef, 20.0, 0.2, 0.1);
    let prevBody = this.ground;

    const jd = {
      bodyA: prevBody,
      bodyB: body,
      anchorPoint: this.anchor,
      lowerAngle: AbstractBuilder.degreesToRadians(-15),
      upperAngle: AbstractBuilder.degreesToRadians(15),
      enableLimit: true,
    }

    for (let i = 0; i < NUM_PLANKS; ++i) {
      bodyDef.position.set((BRIDGE_STARTX + HALF_PLANK_LENGTH + PLANK_LENGTH * i) / s, BRIDGE_HEIGHT/ s);
      body = this.shapeBuilder.buildBlock(24 / s, 5 / s, bodyDef, 20.0, 0.2, 0.1);

      this.anchor.set((BRIDGE_STARTX + PLANK_LENGTH * i) / s, BRIDGE_HEIGHT / s);
      jd.bodyA = prevBody;
      jd.bodyB = body;
      jd.anchorPoint = this.anchor;

      this.world.createJoint(planck.RevoluteJoint(jd));
      prevBody = body;
    }

    this.anchor.set((BRIDGE_STARTX + PLANK_LENGTH * NUM_PLANKS) / s, BRIDGE_HEIGHT / s);
    jd.bodyA = prevBody;
    jd.bodyB = this.ground;
    jd.anchorPoint = this.anchor;
    this.world.createJoint(planck.RevoluteJoint(jd));
  }
}