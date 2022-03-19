import Stacks from "./Stacks.js"

// keep this under 20 to avoid problems
const NUM_COLUMNS = 6;
const NUM_ROWS = 30;
const WIDTH = 30.0;


export default class VerticalStackSimulator {

  constructor(floor, world) {
     this.world = world;
     this.createStaticBodies(floor);
     new Stacks(floor, NUM_ROWS, NUM_COLUMNS, world)
  }

  createStaticBodies(floor) {
     const ground = this.world.createBody();
     ground.createFixture(planck.Edge(planck.Vec2(-WIDTH, floor), planck.Vec2(WIDTH, floor)));
     ground.createFixture(planck.Edge(planck.Vec2(20.0, floor), planck.Vec2(20.0, floor + 20.0)));
  }
}