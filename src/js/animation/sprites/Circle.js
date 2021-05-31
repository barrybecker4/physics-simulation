// import com.becker.common.Images;
// import flash.display.Graphics;
//
// import flash.display.BitmapData;
// import flash.display.DisplayObject;
// import flash.display.Shape;
// import flash.geom.Matrix;
import AbstractShape from "./AbstractShape.js";


/**
 * Represents a 2D ball and common operations on it.
 * @author Barry Becker
 */
export default class Circle extends AbstractShape {


  constructor(createGraphics, radius, image = null, color = 0x9988cc) {
    super(createGraphics, color);
    this.radius = radius;
    this.imageClass = image;

    this.init();
  }

  init() {
    this.graphics = this.createGraphics();
    const g = this.graphics;

    g.lineStyle(1);
    g.fillStyle(this.color , 0.6);
    g.fillCircle(this.x, this.y, this.radius);

    g.moveTo(0, 0);
    g.lineTo(this.radius, 0);
  }

}
