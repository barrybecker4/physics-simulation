import Util from "../animation/common/Util.js";
import Line from "../animation/sprites/Line.js";
import AbstractShape from "../animation/sprites/AbstractShape.js";

const VELOCITY_ITERATIONS = 10;
const STEP_ITERATIONS = 6;
const TIME_STEP = 1.0 / 20.0;



export default class BoxWorld {

  constructor(width, height, physicsOptions, createGraphics) {
    // create a Box2D world
    this.width = width;
    this.height = height;

    this.physicsOptions = physicsOptions;
    this.createGraphics = createGraphics;
    this.worldScale = physicsOptions.worldScale;
    this.contactListeners = [];

    this.world = new planck.World(planck.Vec2(0, physicsOptions.gravity));
    physicsOptions.addGravityChangeListener(this);

    this.initInteractionListeners();
  }

  initInteractionListeners() {
    this.world.on('begin-contact', contact => {
      this.contactListeners.forEach(listener => {
        if (listener.onBeginContact) {
          listener.onBeginContact(contact);
        }
      });
    });
    this.world.on('end-contact', contact => {
      this.contactListeners.forEach(listener => {
        if (listener.onEndContact) {
          listener.onEndContact(contact);
        }
      });
    });
    this.world.on('pre-solve', (contact, oldManifold) => {
      this.contactListeners.forEach(listener => {
        if (listener.onPreSolve) {
          listener.onPreSolve(contact, oldManifold);
        }
      });
    });
    this.world.on('post-solve', (contact, contactImpulse) => {
      this.contactListeners.forEach(listener => {
        if (listener.onPostSolve) {
          listener.onPostSolve(contact, contactImpulse);
        }
      });
    });
  }

  addContactListener(contactListener) {
    this.contactListeners.push(contactListener);
  }

  removeContactListener(contactListener) {
    const index = this.contactListeners.indexOf(contactListener);
    this.contactListeners.splice(index, 1);
  }

  gravityChanged(g) {
    this.world.setGravity(planck.Vec2(0, g));
  }

  /**
   * @param simulation the Simulation to show in this world
   */
  setSimulation(simulation) {
    this.firstTime = true;

    if (this.simulation != null) {
      this.simulation.cleanup();
    }
    simulation.initialize(this.world, this.createGraphics, this.physicsOptions);
    this.simulation = simulation;
    this.startAnimation();
  }

  startAnimation() {
    this.world.setContinuousPhysics(true);

    this.simulation.addStaticElements();
    this.simulation.addDynamicElements();
  }

  resized(evt) {
    //simulation.scale = this.width / 100;
  }

  onEnterFrame(e) {

    if (this.firstTime && this.scene != null) {
      console.log("adding interactors");
      this.simulation.createInteractors();
      this.firstTime = false;
    }
    // for stuff in the simulation that needs to be updated every frame
    this.simulation.onFrameUpdate();

    this.world.step(TIME_STEP, VELOCITY_ITERATIONS, STEP_ITERATIONS);
    this.world.clearForces();
    if (this.showDebug) {
      this.world.drawDebugData();
    }

    this.drawAllBodies();
    this.drawAllJoints();
  }

  /** Go through body list and update sprite positions / rotations */
  drawAllBodies() {

    for (let bb = this.world.getBodyList(); bb; bb = bb.getNext()) {
      let shape = bb.getUserData(); // AbstractShape's graphics object
      const scale = this.simulation.scale;
      const bodyPosition = bb.getPosition();
      shape.x = bodyPosition.x * scale;
      shape.y = bodyPosition.y * scale;
      //if (Math.random() <= .1)
      //  console.log("x = " + shape.x + " y = " + shape.y + " v = " + shape.visible + " s = " + shape.scale + " active=" + shape.active + " s=" + scale);
      shape.rotation = bb.getAngle(); //* Util.RAD_TO_DEG;
    }
  }

  /** Go through joint list and render corresponding geometry */
  drawAllJoints() {
    const s = this.simulation.scale;

    for (let joint = this.world.getJointList(); joint; joint = joint.getNext()) {

      if (joint.getUserData()) {
        const userData = joint.getUserData().getUserData();
        if (userData.type === "Line") {
          const line = new Line(userData);

          line.x = joint.getAnchorA().x * s;
          line.y = joint.getAnchorA().y * s;

          const numer = joint.getAnchorB().y - joint.getAnchorA().y;
          const denom = joint.getAnchorB().x - joint.getAnchorA().x;
          const angle = Math.atan2(numer, denom);

          line.rotation = angle * Util.RAD_TO_DEG;
        }
        else if (userData.type === "AbstractShape") {
          const shape = new AbstractShape(userData);

          shape.x = joint.getAnchorA().x * s;
          shape.y = joint.getAnchorA().y * s;
          shape.rotation = 0;
        }
      }
    }
  }

  set showDebugDrawing(show) {
    if (show) {
      this.addDebugDrawing();
    }
    else {
      this.removeDebugDrawing();
    }
  }

  addDebugDrawing() {
    // if already showing debug, don't do it again.
    /*
    if (!this.showDebug) {
      let dbgDraw = new planck.DebugDraw();
      this.debugSprite = new Sprite();
      addChild(debugSprite);
      dbgDraw.SetSprite(debugSprite);
      dbgDraw.SetDrawScale(simulation.scale);
      dbgDraw.SetFillAlpha(0.4);
      dbgDraw.SetLineThickness(2.0);
      dbgDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit || b2DebugDraw.e_pairBit);  //0xFFFFFFFF;
      this.world.SetDebugDraw(dbgDraw);
      this.world.DrawDebugData();
      this.showDebug = true;
    }*/
  }

  removeDebugDrawing() {
    if (this.showDebug) {
      this.removeChild(this.debugSprite);
      //this.world.setDebugDraw(null);
      this.world.setDebug(true, true, 0x2255ff);
      this.showDebug = false;
    }
  }
}