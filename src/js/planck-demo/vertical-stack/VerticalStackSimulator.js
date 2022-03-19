export default class VerticalStackSimulator {

  constructor(columnCount, rowCount, world) {
     this.columnCount = columnCount;
     this.rowCount = rowCount;
     this.world = world;

     this.createStaticBodies();
     this.createStacks();
  }

  createStaticBodies() {
     const ground = this.world.createBody();
     ground.createFixture(planck.Edge(planck.Vec2(-40.0, 0.0), planck.Vec2(40.0, 0.0)));
     ground.createFixture(planck.Edge(planck.Vec2(20.0, 0.0), planck.Vec2(20.0, 20.0)));
  }

  createStacks() {
    const bodies = [];
    const indices = [];
    const xs = [ 0.0, -10.0, -5.0, 5.0, 10.0 ];

    const shape = planck.Box(0.5, 0.5);

    for (let j = 0; j < this.columnCount; j++) {
      for (let i = 0; i < this.rowCount; i++) {
        const n = j * this.rowCount + i;
        indices[n] = n;
        let x = 0.0;
        // let x = pl.Math.random(-0.02, 0.02);
        // let x = i % 2 == 0 ? -0.01 : 0.01;

        var body = this.world.createDynamicBody();
        body.setUserData(indices[n]);
        body.setPosition(planck.Vec2(xs[j] + x, 0.55 + 1.1 * i));
        body.createFixture(shape, {
          density : 1.0,
          friction : 0.3
        });

        bodies[n] = body;
      }
    }
  }
}