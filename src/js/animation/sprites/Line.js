import AbstractShape from "./AbstractShape.js";

/**
 * Represents a 2D line and common operations on it.
 * @author Barry Becker
 */
export default class Line extends AbstractShape {

  /**
   * assume 0 is the starting position
   */
  constructor(createGraphics, startPoint, endPoint, thickness = 1.0, color = 0xaa4400) {
    super(createGraphics, color)
    this.start = startPoint;
    this.stop = endPoint;
    this.thickness = thickness;

    this.init();
  }

  init() {
    this.graphics = this.createGraphics();
    this.graphics.lineStyle(this.thickness, this.color);
    this.graphics.moveTo(this.start.x, this.start.y);
    this.graphics.lineTo(this.stop.x, this.stop.y);
    this.graphics.drawCircle(this.stop.x, this.stop.y, "0xaaff22");
  }
}