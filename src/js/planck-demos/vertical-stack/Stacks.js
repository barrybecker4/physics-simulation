const BLOCK_ATTRIBUTES = {
  density : 1.0,
  friction : 0.3,
  restitution: 0.05,
};

export default class Stacks {


  constructor(floor, rowCount, columnCount, world) {

    //const xs = [ 0.0, -10.0, -5.0, 5.0, 10.0 ];
    const xMin = 0.0;
    const xMax = 10.0;
    const xInc = (xMax - xMin) / columnCount;

    const shape = planck.Box(0.5, 0.5);

    for (let j = 0; j < columnCount; j++) {
      for (let i = 0; i < rowCount; i++) {
        const n = j * rowCount + i;
        let x = 0.0;
        //let x = planck.Math.random(-0.06, 0.08);

        var body = world.createDynamicBody();
        body.setUserData(n);
        body.setPosition(planck.Vec2(x + xMin + j * xInc, floor + 0.5 + 1.01 * i));
        body.createFixture(shape, BLOCK_ATTRIBUTES);
      }
    }
  }
}