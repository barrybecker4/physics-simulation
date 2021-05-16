//import Box2D.Dynamics.b2World;
//import com.becker.animation.box2d.interactors.MouseDragInteractor;
//import com.becker.animation.box2d.NoiseContactListener;
//import com.becker.common.PhysicalParameters;

//import com.becker.animation.box2d.Simulation;
//import mx.core.UIComponent;

import KeyboardInteractor from "../animation/interactors/KeyboardInteractors.js";

/**
 * Default implementations for simulations.
 * @author Barry Becker
 */
class AbstractSimulation  {
/*
    protected var world:b2World;
    protected var canvas:UIComponent;
    protected var params:PhysicalParameters;
    protected var interactors:Array;
    private var _scale:Number;

    // an array of interactors to us in the simulation
    protected var _interactors:Array;

    public function AbstractSimulation() {}

    public function get instructions():String {
        return "Use this Flash application, based on <a href=\"http://box2dflash.sourceforge.net/\">Box2DAS3</a> " +
            "to simulate dynamic structures. You can click on things and drag them around, " +
            "and you can press 'd' over an object to delete it.";
    }

    initialize(world:b2World, canvas:UIComponent,
                               params:PhysicalParameters):void {
        this.world = world;
        this.canvas = canvas;
        this.params = params;
        _scale = canvas.width / 80;
        world.SetContactListener(new NoiseContactListener());
    }

    addStaticElements():void {
    }

    addDynamicElements():void {
    }


    //Called every time a new frame is drawn.  The default is to do nothing.
    onFrameUpdate():void {
    }

    createInteractors():void {
        interactors = [new MouseDragInteractor(canvas, world, scale)];
    }

    // Cleanup when the simulation is destroyed
    cleanup():void {
        for each (var interactor:Interactor in interactors) {
            interactor.removeHandlers();
        }
        canvas.x = 0;
        canvas.y = 0;
    }

    get scale():Number {
        return _scale;
    }

    set scale(s:Number):void {
        _scale = s;
    }

 */
}