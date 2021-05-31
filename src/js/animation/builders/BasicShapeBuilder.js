import Rectangle from '../sprites/Rectangle.js';
import Circle from '../sprites/Circle.js';
import AbstractBuilder from "./AbstractBuilder.js";
import Util from "../common/Util.js"
import Line from "../sprites/Line.js"
import Polygon from "../sprites/Polygon.js";
import phaserUtils from "/physics-simulation/src/js/simulations/phaserUtils.js";

const MAX_GROUP_INDEX = 1000000;

export default class BasicShapeBuilder extends AbstractBuilder {

  /** Constructor */
  constructor(world, createGraphics, scale) {
    super(world, createGraphics, scale);
  }

  buildBlock(width, height, bodyDef,
             density = 1.0, friction = 0.5, restitution = 0.2,
             groupIndex = MAX_GROUP_INDEX) {

    const fixtureDef = { density, friction, restitution, filter: {} };

    if (groupIndex !== MAX_GROUP_INDEX) {
      fixtureDef.filter.groupIndex = groupIndex;
    }
    const shape = planck.Box(width, height);
    fixtureDef.shape = shape;
    bodyDef.userData = new Rectangle(this.createGraphics, width * 2 * this.scale, height * 2 * this.scale, 0x2244ff).graphics;

    return this.addShape(fixtureDef, bodyDef);
  }

  createBox(posX, posY, width, height, isDynamic, color, density = 1.0, friction = 0.5, restitution = 0.2) {

    let box = this.world.createBody();
    if (isDynamic){
      box.setDynamic();
    }

    // a body can have one or more physical fixtures. This is how we create a box fixture inside a body
    const scale = this.scale;
    const physWidth = width / 2 / scale;
    const physHeight = height / 2 / scale;
    box.createFixture(planck.Box(physWidth, physHeight), {
      density, restitution, friction,
    });

    // now we place the body in the world
    box.setPosition(planck.Vec2(posX / scale, 0.8 * posY / scale)); // why 0.8?

    // time to set mass information
    box.setMassData({
      mass: physWidth * physHeight,
      center: planck.Vec2(),
      I: 1 // needed to rotate
    });

    // now we create a graphics object representing the body
    const userData = new Rectangle(this.createGraphics, -width / 2, -height / 2, width, height, color).graphics;

    // a body can have anything in its user data, normally it's used to store its sprite
    box.setUserData(userData);
    box.label = "ground";
    return box;
  }

  buildOrientedBlock(orientedBlock, bodyDef,
                     density = 1.0, friction = 0.5, restitution = 0.2,
                     groupIndex= int.MAX_VALUE) {

    const fixtureDef = { density, fr, restitution, filter:{} };
    if (groupIndex !== MAX_GROUP_INDEX) {
      fixtureDef.filter.groupIndex = groupIndex;
    }

    const mainShape = new planck.Polygon();
    console.log("oriented center = " + orientedBlock.center + " ang=" + orientedBlock.rotation);
    mainShape.setAsOrientedBox(
      orientedBlock.width, orientedBlock.height, orientedBlock.center, orientedBlock.rotation);
    fixtureDef.shape = mainShape;
    bodyDef.setUserData(new Rectangle(this.createGraphics, orientedBlock.width * 2 * this.scale, orientedBlock.height * 2 * this.scale).graphics);

    return this.addShape(fixtureDef, bodyDef);
  }


  buildSensor(center, width, height, body, sensorName = "sensor") {

    const fixtureDef = {
      isSensor: true,
    }

    const shape = new planck.Polygon();
    shape.setAsOrientedBox(width, height, center);
    fixtureDef.shape = shape;
    fixtureDef.setUserData(sensorName);
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
    const shape = new planck.Polygon();
    shape.setAsBox(width, height);
    boxDef.shape = shape;
    bodyDef.setUserData()new Bazooka(width * 2 * scale, height * 2 * scale).graphics);

    return this.addShape(boxDef, bodyDef);
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
    bodyDef.setUserData(new Bullet(radius * scale, duration).graphics);

    return this.addShape(circleDef, bodyDef, false); // true (causes slow)
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

    const mainShape = new planck.Polygon();
    mainShape.setAsOrientedBox(masterBlock.width, masterBlock.height, masterBlock.center, masterBlock.rotation);
    fixtureDef.shape = mainShape;

    bodyDef.setUserData(new Rectangle(masterBlock.width * 2 * this.scale, masterBlock.height * 2 * this.scale).graphics);
    const body = this.addShape(fixtureDef, bodyDef);

    for (let i = 1; i < orientedBlocks.length; i++) {
      const orientedBlock = orientedBlocks[i];
      const blockShape = new planck.Polygon();
      blockShape.setAsOrientedBox(orientedBlock.width, orientedBlock.height, orientedBlock.center, orientedBlock.rotation);

      fixtureDef.shape = blockShape;
      const rect = new Rectangle(orientedBlock.width * 2 * this.scale, orientedBlock.height * 2 * this.scale).graphics;
      rect.x = orientedBlock.center.x * this.scale;
      rect.y = orientedBlock.center.y * this.scale;
      rect.rotation = Util.RAD_TO_DEG * orientedBlock.rotation;
      // bodyDef.userData.addChild(rect); how to do children in phaser?

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
    circleDef.shape = new planck.Circle(radius);
    bodyDef.userData = new Circle(this.createGraphics, radius * this.scale, null, 0x4455ee).graphics;

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

    const verts = [];
    for (let i = 0; i < points.length; i++) {
      verts.push(new planck.Vec2(vpoints[i].x, vpoints[i].y));
    }
    const poly = new planck.Polygon(verts);
    polyDef.shape = poly;

    bodyDef.userData = new Polygon(this.createGraphics, vpoints, this.scale).graphics;
    return this.addShape(polyDef, bodyDef);
  }

  buildLine(start, stop, bodyDef, params,
            groupIndex = MAX_GROUP_INDEX) {

    const lineDef = { density, friction, restitution, filter: {} };
    if (groupIndex !== MAX_GROUP_INDEX) {
      lineDef.filter.groupIndex = groupIndex;
    }

    const lineShape = new b2PolygonShape();
    const verts = [ new planck.b2Vec2(start.x, start.y), new planck.Vec2(stop.x, stop.y) ];
    lineShape.setAsArray(verts, 2);
    lineDef.shape = lineShape;

    //const diff = new planck.Vec2(stop.x - start.x, stop.y - start.y);
    bodyDef.setUserData(new Line(this.world.graphics, start, stop).graphics);
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
    const bodyDef = { type: 'dynamic' };
    //bodyDef.type = b2Body.b2_dynamicBody;

    const polyDef = new planck.Polygon();
    polyDef.setAsArray(vec);

    bodyDef.position.set(xPos/this.scale, yPos/this.scale);
    // custom userData used to map the texture
    bodyDef.setUserData(new ExplodableShape(numEnterPoints, vec, this.scale, texture).graphics);

    const fixtureDef = { density: 1, friction: 0.5, restitution: 0.2, shape: polyDef };

    return this.addShape(fixtureDef, bodyDef);
  }


  /** Different depending on whether we are passed Vec2 or Points */
  getPointsFromArray(points) {
    return points;
  }

}
