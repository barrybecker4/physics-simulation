import AbstractShape from "./AbstractShape.js";


/**
 * Represents a 2D ball and common operations on it.
 * @author Barry Becker
 */
export default class Circle extends AbstractShape {


  constructor(createGraphics, radius, image = null, style) {
    super(createGraphics, style);
    this.radius = radius;
    this.imageClass = image;
    this.init();
  }

  init() {
    this.graphics = this.createGraphics();
    const g = this.graphics;

    g.lineStyle(this.style.lineThickness, this.style.lineColor, this.style.lineOpacity);
    g.fillStyle(this.style.color, this.style.opacity);
    g.fillCircle(this.x, this.y, this.radius);

    g.moveTo(0, 0);
    g.lineTo(this.radius, 0);
  }

}
