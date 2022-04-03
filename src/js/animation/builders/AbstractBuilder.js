export default class AbstractBuilder  {

  constructor(world, createGraphics, scale) {
    this.world = world;
    this.createGraphics = createGraphics;
    //this.canvas = canvas;
    this._scale = scale;
  }

  addShape(fixtureDef, bodyDef) {

    const body = this.world.createBody(bodyDef);

    body.createFixture(fixtureDef.shape, fixtureDef);
    body.setMassData({              // need ?
      mass: 0.1,
      center: planck.Vec2(),
      I: 1 // needed to rotate
    });
    return body;
  }

  /** Will just be visible without physical presence. */
  addShapeWithoutFixture(bodyDef) {
    const body = this.world.createBody(bodyDef);
    return body;
  }

  static degreesToRadians(angle) {
    return angle * (Math.PI / 180);
  }

  static radiansToDegrees(angle) {
    return angle * (180.0 / Math.PI);
  }

  get scale() {
    return this._scale;
  }
}
