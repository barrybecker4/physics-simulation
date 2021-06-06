//import Box2D.Dynamics.b2BodyDef;
//import Box2D.Dynamics.b2World;
//import flash.geom.Point;
import AbstractBuilder from "./AbstractBuilder.js";
import BasicShapeBuilder from "./BasicShapeBuilder.js";

const DEFAULT_X_POS = 150;
const DEFAULT_Y_POS = 50;

const DEFAULT_X_SPREAD = 400;
const DEFAULT_Y_SPREAD = 150;

const DEFAULT_SIZE = 10.0;
const DENSITY = 1.0;
const FRICTION = 0.5;
const RESTITUTION = 0.1;


/**
 * Builds a bunch of random crap composed of blocks and circles
 */
export default class CrapBuilder extends AbstractBuilder {

  constructor(world, createGraphics, scale) {
    super(world, createGraphics, scale);

    this.xPos = DEFAULT_X_POS;
    this.yPos = DEFAULT_Y_POS;

    this.xSpread = DEFAULT_X_SPREAD;
    this.ySpread = DEFAULT_Y_SPREAD;

    this.shapeSize = DEFAULT_SIZE;
    this.shapeHalfSize = DEFAULT_SIZE / 2.0;

    this.builder = new BasicShapeBuilder(world, createGraphics, scale);
  }

  setSpawnPosition(xpos, ypos) {
    this.xPos = xpos;
    this.yPos = ypos;
  }

  setSpawnSpread(xspread, yspread) {
    this.xSpread = xspread;
    this.ySpread = yspread;
  }

  setShapeSize(value) {
    this.shapeSize = value;
    this.shapeHalfSize = value / 2.0;
  }

  /**
   * Spawn in a bunch of crap to fall on the bridge.
   */
  addCrap(bodyDef, numBlocks = 0, numBalls = 0, numPolygons = 0) {

    this.addBlocks(numBlocks, this.shapeSize, bodyDef);
    this.addBalls(numBalls, this.shapeSize, bodyDef);
    this.addPolygons(numPolygons, bodyDef);
  }

  addBlocks(num, size, bodyDef)  {

    const halfSize = size / 2.0;
    const scale = this.scale;
    for (let i = 0; i < num; i++) {
      this.setRandomPlacement(bodyDef);
      const width = (Math.random() * halfSize + size);
      const height = (Math.random() * halfSize + size);
      this.builder.buildBlock(width, height, bodyDef, DENSITY, FRICTION, RESTITUTION);
    }
  }

  addBalls(num, size, bodyDef)  {

    const halfSize = size / 2.0;
    for (let i = 0; i < num; i++) {
      this.setRandomPlacement(bodyDef);
      this.builder.buildBall((Math.random() * halfSize + size) / this.scale,
        bodyDef, DENSITY, FRICTION, RESTITUTION);
    }
  }

  addPolygons(num, bodyDef) {
    for (let i = 0; i < num; i++){
      this.createRandomPolygon(bodyDef);
    }
  }

  createRandomPolygon(bodyDef) {

    this.setRandomPlacement(bodyDef);
    let pts;

    if (Math.random() > 0.66) {
      pts = this.createQuadrilateralPoints()
    }
    else if (Math.random() > 0.5) {
      pts = this.createPentagonPoints();
    }
    else {
      pts = this.createTrianglePoints();
    }

    this.builder.buildPolygon(pts, bodyDef, DENSITY, FRICTION, RESTITUTION);
  }

  createQuadrilateralPoints() {
    const pts = [];
    const s = this.scale;
    const shapeSize = this.shapeSize;
    pts.push(new planck.Vec2(( -shapeSize - Math.random() * shapeSize) / s,
      ( shapeSize + Math.random() * shapeSize) / this.scale));
    pts.push(new planck.Vec2(( -this.shapeHalfSize - Math.random() * shapeSize) / s,
      (-shapeSize - Math.random() * shapeSize) / this.scale));
    pts.push(new planck.Vec2(( this.shapeHalfSize + Math.random() * shapeSize) / s,
      (-shapeSize - Math.random() * shapeSize) / this.scale));
    pts.push(new planck.Vec2(( shapeSize + Math.random() * shapeSize) / s,
      ( shapeSize + Math.random() * shapeSize) / s));
    return pts;
  }

  createPentagonPoints() {
    const scale = this.scale;
    const pts = [];
    pts.push(new planck.Vec2(0, (10 + Math.random()*10) / scale));
    pts.push({});
    pts.push(this.createPolyPoint(-5, -10, scale));
    pts.push(this.createPolyPoint(5, -10, scale));
    let s = Math.random() / 2 + 0.8;
    pts[1] = new planck.Vec2(s * (pts[0].x + pts[2].x), s * (pts[0].y + pts[2].y));
    s = Math.random() / 2 + 0.8;
    pts.push(new planck.Vec2(s * (pts[3].x + pts[0].x), s * (pts[3].y + pts[0].y)));
    return pts;
  }

  createTrianglePoints() {
    const pts = [];
    const scale = this.scale;
    pts.push(new planck.Vec2(0, (10 + Math.random() * 10) / scale));
    pts.push(this.createPolyPoint(-5, -10, scale));
    pts.push(this.createPolyPoint(5, -10, scale));
    return pts;
  }

  createPolyPoint(baseX, baseY, scale) {
    return new planck.Vec2((baseX - Math.random() * 10) / scale, (baseY - Math.random() * 10) / scale);
  }

  /** Random position and angle for body definition */
  setRandomPlacement(bodyDef) {
    bodyDef.position.set((Math.random() * this.xSpread + this.xPos) / this.scale,
      (Math.random() * this.ySpread + this.yPos) / this.scale);
    bodyDef.angle = Math.random() * Math.PI;
  }
}
