import AbstractSimulation from "../AbstractSimulation.js";
import BasicShapeBuilder from "/physics-simulation/src/js/animation/builders/BasicShapeBuilder.js";
import AbstractBuilder from "/physics-simulation/src/js/animation/builders/AbstractBuilder.js";
import Table from "./Table.js"
import Puck from "./Puck.js"
import Paddle from "./Paddle.js"
import Constants from "./Constants.js"

const Vec2 = planck.Vec2

export default class AirHockeySimulation extends AbstractSimulation {

  initialize(world, createGraphics, params, sounds) {
    super.initialize(world, createGraphics, params, sounds);
    this.params.gravity = Constants.GRAVITY;
    this.shapeBuilder = new BasicShapeBuilder(this.world, this.createGraphics, params.worldScale);

    world.on('begin-contact', contact => {
      const fixtureA = contact.getFixtureA()
        const fixtureB = contact.getFixtureB()
        if (fixtureA == this.table.getGoal1Fixture()) {
            alert('Player1 scored')
            this.puck.reset()
        }
        if (fixtureA == this.table.getGoal2Fixture()) {
            alert('Player2 scored')
            this.puck.reset()
        }
      }
    )
  }

  getName() {
    return "AirHockeyScene";
  }

  addStaticElements() {
    this.table = new Table(this.shapeBuilder)
  }

  addDynamicElements(){
    this.puck = new Puck(this.shapeBuilder)
    const paddleHt = Constants.TABLE_HEIGHT / 3
    this.paddle1 = new Paddle(Vec2(0, paddleHt).add(Constants.CENTER), this.shapeBuilder)
    this.paddle2 = new Paddle(Vec2(0, -paddleHt).add(Constants.CENTER), this.shapeBuilder)
  }

}