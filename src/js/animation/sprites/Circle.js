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


  constructor(graphics, radius, image = null, color = 0x9988cc) {
    super(graphics, color);
    this.radius = radius;
    this.imageClass = image;
    //this.circle = new Shape();
    //addChild(circle);

    this.init();
  }

  init() {
    const g = this.graphics;

    if (imageClass) {
      const img = new this.imageClass;
      const bmd = new BitmapData(img.width, img.height, true, 0x224466);
      bmd.draw(img);

      const matrix =
        new planck.Matrix(2 * radius / img.width, 0, 0,
          2 * radius / img.height,
          -radius, -radius);

      g.lineStyle(0);
      g.beginBitmapFill(bmd, matrix, true, true);
    }
    else {
      g.lineStyle(1);
      g.beginFill(this.color , 0.6);
    }
    g.drawCircle(x, y, this.radius);
    g.endFill();

    g.moveTo(0, 0);
    g.lineTo(this.radius, 0);
  }

}
