//import Box2D.Dynamics.b2World;
//import com.becker.animation.box2d.interactors.MouseDragInteractor;
//import com.becker.animation.box2d.NoiseContactListener;
//import com.becker.common.PhysicalParameters;

//import com.becker.animation.box2d.Simulation;
//import mx.core.UIComponent;

import KeyboardInteractor from "../animation/interactors/KeyboardInteractors.js";
import MouseDragInteractor from "../animation/interactors/MouseDragInteractor.js";
import NoiseContactListener from "../animation/NoiseContactListener.js";


/**
 * Default implementations for simulations.
 * @author Barry Becker
 */
export default class AbstractSimulation  {

    constructor(world, canvas, params) {
      this.world = world;
      this.canvas = canvas;
      this.params = params;
      this._scale = canvas.width / 80;
      world.addContactListener(new NoiseContactListener());
    }

    get instructions() {
        return "<p>A <a href=\"https://piqnt.com/planck.js/\">Planck-js</a>application to simulate dynamic structures.</p>" +
          "<p>You can click on things and drag them around, and you can press 'd' over an object to delete it.</p>";
    }

    addStaticElements() {
    }

    addDynamicElements() {
    }

    //Called every time a new frame is drawn.  The default is to do nothing.
    onFrameUpdate() {
    }

    createInteractors() {
        this.interactors = [new MouseDragInteractor(this.canvas, this.world, this.scale)];
    }

    // Cleanup when the simulation is destroyed
    cleanup() {
        interactors.forEach(interactor => interactor.removeHandlers());
        this.canvas.x = 0;
        this.canvas.y = 0;
    }

    get scale() {
        return this._scale;
    }

    set scale(s) {
        this._scale = s;
    }

}