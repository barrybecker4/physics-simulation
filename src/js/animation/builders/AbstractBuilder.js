//import Box2D.Collision.Shapes.b2Shape;
//import Box2D.Dynamics.b2Body;
//import Box2D.Dynamics.b2BodyDef;
//import Box2D.Dynamics.b2FixtureDef;
//import Box2D.Dynamics.b2World;
//import com.becker.animation.sprites.AbstractShape.js;
//import mx.core.UIComponent;

export default class AbstractBuilder  {

  constructor(world, createGraphics, scale) {
    this.world = world;
    this.createGraphics = createGraphics;
    //this.canvas = canvas;
    this._scale = scale;
  }

  addShape(fixtureDef, bodyDef, isBullet = false) {

    const body = this.world.createBody(bodyDef);
    body.setBullet(isBullet);
    body.createFixture(fixtureDef);
    //this.canvas.addChild(bodyDef.userData);
    return body;
  }

  /** Will just be visible without physical presence. */
  addShapeWithoutFixture(bodyDef) {
    const body = this.world.createBody(bodyDef);
    //this.canvas.addChild(bodyDef.userData);
    return body;
  }

  static degreesToRadians(angle) {
    return angle * (180.0 / Math.PI);
  }

  get scale() {
    return this._scale;
  }
}
