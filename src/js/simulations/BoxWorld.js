import Util from "../animation/common/Util.js";

const VELOCITY_ITERATIONS = 10;
const STEP_ITERATIONS = 6;
const TIME_STEP = 1.0 / 20.0;
const ORIG_WIDTH = 1200;



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
   * @param the name of a class that implements Simulation
   */
  setSimulation(simulation, params) {

    removeEventListener(Event.ENTER_FRAME, this.onEnterFrame);
    removeEventListener(ResizeEvent.RESIZE, resized);
    this.firstTime = true;
    //world = createWorld();

    if (this.simulation != null) {
      this.simulation.cleanup();
    }
    simulation.initialize(this.world, params);
    this.simulation = simulation;
    this.startAnimation();
  }

  startAnimating() {
  }

  startAnimation() {

    this.removeAllChildren();
    this.addEventListener(Event.ENTER_FRAME, this.onEnterFrame, false, 0, true);
    this.addEventListener(ResizeEvent.RESIZE, this.resized, false, 0, true);

    this.world.setContinuousPhysics(true);

    this.simulation.addStaticElements();
    this.simulation.addDynamicElements();
  }

  resized(evt) {
    //simulation.scale = this.width / 100;
  }

  get enableSimulation() {
    return this._enableSimulation;
  }

  set enableSimulation(enable) {
    if (enable) {
      this.addEventListener(Event.ENTER_FRAME, this.onEnterFrame, false, 0, true);
    }
    else {
      this.removeEventListener(Event.ENTER_FRAME, this.onEnterFrame);
    }
    this._enableSimulation = enable;
  }

  onEnterFrame(e) {

    if (this.firstTime && this.enableSimulation && this.scene != null) {
      console.log("adding interactors");
      this.simulation.createInteractors();
      this.firstTime = false;
    }
    // for stuff in the simulation that needs to be updated every frame
    this.simulation.onFrameUpdate();

    this.world.Step(TIME_STEP, VELOCITY_ITERATIONS, STEP_ITERATIONS);
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

      //for (var fixture:b2Fixture = bb.GetFixtureList(); fixture; fixture = fixture.GetNext()) {
      let shape = bb.betUserData(); //AbstractShape
      if (shape) {
        shape.x = bb.getPosition().x * this.simulation.scale;
        shape.y = bb.getPosition().y * this.simulation.scale;
        shape.rotation = bb.getAngle() * Util.RAD_TO_DEG;
      }
      //}
    }
  }

  /** Go through joint list and render corresponding geometry */
  drawAllJoints() {
    const s = this.simulation.scale;

    for (let joint = world.getJointList(); joint; joint = joint.getNext()) {

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

  /*
  createWorld() {
    const gravityVec = new planck.Vec2(0.0, gravity);
    const doSleep = true;
    return new b2World(gravityVec, doSleep);
  }*/

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
      world.SetDebugDraw(dbgDraw);
      world.DrawDebugData();
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