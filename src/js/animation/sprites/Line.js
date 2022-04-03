import AbstractShape from "./AbstractShape.js";

/**
 * Represents a 2D line and common operations on it.
 * @author Barry Becker
 */
export default class Line extends AbstractShape {

  /**
   * assume 0 is the starting position
   */
  constructor(createGraphics, startPoint, endPoint, scale, style) {
    super(createGraphics, style)
    this.start = startPoint;
    this.stop = endPoint;
    this.scale = scale;

    this.init();
  }

  init() {
    this.graphics = this.createGraphics();
    const g = this.graphics;
    const s = this.scale;

    const thickness = this.thickness || this.style.lineThickness;
    const color = this.style.color || this.style.lineColor;
    const opacity = this.style.opacity || this.style.lineOpacity;

    g.lineStyle(thickness, color, opacity);
    g.beginPath();
    g.moveTo(this.start.x * s, this.start.y * s);
    g.lineTo(this.stop.x * s, this.stop.y * s);
    g.closePath();
    g.strokePath();

    g.lineStyle(1.0);
    g.fillStyle(this.color , 0.6);
    g.fillCircle(this.stop.x, this.stop.y, this.radius);
  }
}