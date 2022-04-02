import KeyboardInteractor from "/physics-simulation/src/js/animation/interactors/KeyboardInteractor.js";
import MouseDragInteractor from "/physics-simulation/src/js/animation/interactors/MouseDragInteractor.js";
import NoiseContactListener from "/physics-simulation/src/js/animation/NoiseContactListener.js";


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