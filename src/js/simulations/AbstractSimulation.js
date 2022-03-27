//import Box2D.Dynamics.b2World;
//import com.becker.animation.box2d.interactors.MouseDragInteractor;
//import com.becker.animation.box2d.NoiseContactListener;
//import com.becker.common.PhysicalParameters;

//import com.becker.animation.box2d.Simulation;
//import mx.core.UIComponent;

import KeyboardInteractor from "../animation/interactors/KeyboardInteractor.js";
import MouseDragInteractor from "../animation/interactors/MouseDragInteractor.js";
import NoiseContactListener from "../animation/NoiseContactListener.js";


/**
 * Default implementations for simulations.
 * @author Barry Becker
 */
export default class AbstractSimulation  {

    constructor() {}

    initialize(world, createGraphics, params, sounds) {
      this.world = world;
      this.sounds = sounds;
      this.createGraphics = createGraphics;
      this.params = params;
      this.paused = false;
      //world.addContactListener(new NoiseContactListener()); this is raw planckWorld
    }

    get instructions() {
        return "<p>A <a href=\"https://piqnt.com/planck.js/\">Planck-js</a>application to simulate dynamic structures.</p>" +
          "<p>You can click on things and drag them around, and you can press 'd' over an object to delete it.</p>";
    }

    getName() {
      throw Error("You must override this method");
    }

    addStaticElements() {
    }

    addDynamicElements() {
    }

    setPaused(paused) {
      this.paused = paused;
    }

    isPaused() {
      return this.paused;
    }

    //Called every time a new frame is drawn.  The default is to do nothing.
    onFrameUpdate() {
    }

    createInteractors() {
        this.interactors = [new MouseDragInteractor(this.world, this.scale)];
    }

    // Cleanup when the simulation is destroyed
    cleanup() {
        this.interactors.forEach(interactor => interactor.removeHandlers());
    }

    get scale() {
        return this.params.worldScale;
    }
}