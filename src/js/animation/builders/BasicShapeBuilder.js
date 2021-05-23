// import Box2D.Collision.b2AABB;
// import Box2D.Collision.Shapes.b2CircleShape;
// import Box2D.Collision.Shapes.b2PolygonShape;
// import Box2D.Common.Math.b2Vec2;
// import Box2D.Dynamics.b2Body;
// import Box2D.Dynamics.b2BodyDef;
// import Box2D.Dynamics.b2FixtureDef;
// import Box2D.Dynamics.b2World;
// import Box2D.Dynamics.b2FixtureDef;
// import com.becker.animation.sprites.AbstractShape.js;
// import com.becker.animation.sprites.Bazooka;
// import com.becker.animation.sprites.Bullet;
// import com.becker.animation.sprites.ExplodableShape;
// import com.becker.animation.sprites.Line;
// import com.becker.common.PhysicalParameters;
// import flash.display.BitmapData;
//
// import com.becker.animation.sprites.Circle;
// import com.becker.animation.sprites.Polygon;
// import com.becker.animation.sprites.Rectangle;
// import com.becker.common.Util;

//import flash.geom.Point;

import AbstractBuilder from "./AbstractBuilder.js";

const MAX_GROUP_INDEX = 1000000;

export default class BasicShapeBuilder extends AbstractBuilder {

  /** Constructor */
  constructor(world, scale) {
    super(world, scale);
  }

  buildBlock(width, height, bodyDef,
             density = 1.0, friction = 0.5, restitution = 0.2,
             groupIndex = MAX_GROUP_INDEX) {

    const fixtureDef = { density, friction, restitution, filter: {} };

    if (groupIndex !== MAX_GROUP_INDEX) {
      fixtureDef.filter.groupIndex = groupIndex;
    }
    const shape = new planck.PolygonShape();  // b2PolygonShape
    shape.setAsBox(width, height);
    fixtureDef.shape = shape;
    bodyDef.userData = new planck.Rectangle(width * 2 * this.scale, height * 2 * this.scale);

    return addShape(fixtureDef, bodyDef);
  }

  buildOrientedBlock(orientedBlock, bodyDef,
                     density = 1.0, friction = 0.5, restitution = 0.2,
                     groupIndex= int.MAX_VALUE) {

    const fixtureDef = { density, fr, restitution, filter:{} };
    if (groupIndex !== MAX_GROUP_INDEX) {
      fixtureDef.filter.groupIndex = groupIndex;
    }

    const mainShape = new planck.PolygonShape();
    console.log("oriented center = " + orientedBlock.center + " ang=" + orientedBlock.rotation);
    mainShape.setAsOrientedBox(
      orientedBlock.width, orientedBlock.height, orientedBlock.center, orientedBlock.rotation);
    fixtureDef.shape = mainShape;
    bodyDef.userData = new planck.Rectangle(orientedBlock.width * 2 * this.scale, orientedBlock.height * 2 * this.scale);

    return addShape(fixtureDef, bodyDef);
  }


  buildSensor(center, width, height, body, sensorName = "sensor") {

    const fixtureDef = {
      isSensor: true,
    }

    const shape = new planck.PolygonShape();
    shape.setAsOrientedBox(width, height, center);
    fixtureDef.shape = shape;
    fixtureDef.userData = sensorName;
    body.createFixture(fixtureDef);
  }

  /** remove this and allow passing in the class for the graphic shape
  buildBazooka(width, height, bodyDef,
               density = 1.0, friction = 0.5, restitution = 0.2,
               groupIndex = MAX_GROUP_INDEX) {

    const boxDef = { density, friction, restitution, filter:{} };

    if (groupIndex != MAX_GROUP_INDEX) {
      boxDef.filter.groupIndex = groupIndex;
    }
    const shape = new planck.PolygonShape();
    shape.setAsBox(width, height);
    boxDef.shape = shape;
    bodyDef.userData = new Bazooka(width * 2 * scale, height * 2 * scale);

    return addShape(boxDef, bodyDef);
  } */

  /*
  buildBullet(radius, bodyDef,
              density = 1.0, friction = 0.5, restitution = 0.2,
              duration = 10000,
              groupIndex = MAX_GROUP_INDEX) {

    const circleDef = { density, fr, restitution, filter:{} };
    if (groupIndex != int.MAX_VALUE) {
      circleDef.filter.groupIndex = groupIndex;
    }
    circleDef.shape = new planck.CircleShape(radius);
    bodyDef.userData = new Bullet(radius * scale, duration);

    return addShape(circleDef, bodyDef, false); // true (causes slow)
  }*/

  /**
   * A group of blocks that are glued together into one body
   * @return body with children for all the decorating blocks.
   */
  buildCompoundBlock(orientedBlocks, bodyDef,
                     density = 1.0, friction = 0.5, restitution = 0.2,
                     groupIndex = MAX_GROUP_INDEX) {

    const fixtureDef = { density, friction, restitution, filter: {} };
    if (groupIndex !== MAX_GROUP_INDEX) {
      fixtureDef.filter.groupIndex = groupIndex;
    }

    const masterBlock = orientedBlocks[0];

    const mainShape = new planck.PolygonShape();
    mainShape.setAsOrientedBox(masterBlock.width, masterBlock.height, masterBlock.center, masterBlock.rotation);
    fixtureDef.shape = mainShape;

    bodyDef.userData = new planck.Rectangle(masterBlock.width * 2 * scale, masterBlock.height * 2 * scale);
    const body = this.addShape(fixtureDef, bodyDef);

    for (let i = 1; i < orientedBlocks.length; i++) {
      const orientedBlock = orientedBlocks[i];
      const blockShape = new planck.PolygonShape();
      blockShape.setAsOrientedBox(orientedBlock.width, orientedBlock.height, orientedBlock.center, orientedBlock.rotation);

      fixtureDef.shape = blockShape;
      const rect = new planck.Rectangle(orientedBlock.width * 2 * scale, orientedBlock.height * 2 * this.scale);
      rect.x = orientedBlock.center.x * this.scale;
      rect.y = orientedBlock.center.y * this.scale;
      rect.rotation = Util.RAD_TO_DEG * orientedBlock.rotation;
      bodyDef.userData.addChild(rect);

      this.addShapeWithoutFixture(bodyDef);
    }
    body.resetMassData();
    return body;
  }

  buildBall(radius, bodyDef,
            density = 1.0, friction = 0.5, restitution = 0.2,
            groupIndex = MAX_GROUP_INDEX) {

    const circleDef = { density, friction, restitution, filter: {} };
    if (groupIndex !== MAX_GROUP_INDEX) {
      circleDef.filter.groupIndex = groupIndex;
    }
    circleDef.shape = new planck.CircleShape(radius);
    bodyDef.userData = new Circle(radius * this.scale, null, 0x4455ee);

    return this.addShape(circleDef, bodyDef);
  }

  buildPolygon(points, bodyDef,
               density = 1.0, friction = 0.5, restitution = 0.2,
               groupIndex = MAX_GROUP_INDEX) {

    const vpoints = this.getPointsFromArray(points);

    const polyDef = { density, friction, restitution, filter:{} };
    if (groupIndex !== MAX_GROUP_INDEX) {
      polyDef.filter.groupIndex = groupIndex;
    }

    const poly = new planck.PolygonShape();
    const verts = [];

    for (let i = 0; i < points.length; i++) {
      verts.push(new planck.Vec2(vpoints[i].x, vpoints[i].y));
    }
    poly.setAsArray(verts, vpoints.length);
    polyDef.shape = poly;

    bodyDef.userData = new Polygon(vpoints, scale);
    return this.addShape(polyDef, bodyDef);
  }

  buildLine(start, stop, bodyDef, params,
            groupIndex = MAX_GROUP_INDEX) {

    const lineDef = { density, friction, restitution, filter: {} };
    if (groupIndex !== MAX_GROUP_INDEX) {
      lineDef.filter.groupIndex = groupIndex;
    }

    const lineShape = new b2PolygonShape();
    const verts = [ new planck.b2Vec2(start.x, start.y), new plack.b2Vec2(stop.x, stop.y) ];
    lineShape.setAsArray(verts, 2);
    lineDef.shape = lineShape;

    //const diff = new planck.Vec2(stop.x - start.x, stop.y - start.y);
    bodyDef.userData = new Line(this.world.graphics, start, stop);
    return this.addShapeWithoutFixture(bodyDef);
  }

  /** function to create and texture a dynamic body */
  createExplodableBody(xPos, yPos,
                       verticesArr, texture, numEnterPoints) {

    // This temp vector helps convert pixel coordinates to Box2D meters coordinates
    const vec = [];
    for (let i = 0; i < verticesArr.length; i++) {
      vec.push(new planck.Vec2(verticesArr[i].x / this.scale,verticesArr[i].y / this.scale));
    }
    const bodyDef = { isDynamic: true };
    //bodyDef.type = b2Body.b2_dynamicBody;

    const polyDef = new PolygonShape();
    polyDef.setAsArray(vec);

    bodyDef.position.Set(xPos/this.scale, yPos/this.scale);
    // custom userData used to map the texture
    bodyDef.userData = new ExplodableShape(numEnterPoints, vec, this.scale, texture);

    const fixtureDef = { density: 1, friction: 0.5, restitution: 0.2, shape: polyDef };

    return this.addShape(fixtureDef, bodyDef);
  }


  /** Different depending on whether we are passed Vec2 or Points */
  getPointsFromArray(points) {
    return points;
  }

}
