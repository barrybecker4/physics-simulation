import AbstractShape from "./AbstractShape.js";


/**
 * Represents a polygon shape and common operations on it.
 * @author Barry Becker
 */
export default class Polygon extends AbstractShape {

  constructor(createGraphics, points, scale, color = 0x111111) {
    super(createGraphics, color);
    this.points = points;
    this.scale = scale;
    //poly = new Shape();
    //addChild( poly );

    this.initBounds(points);
    this.init();
  }

  /**
   * Note: the points get scaled by this
   */
  initBounds(pts) {
    this.min = new planck.Vec2(Number.MAX_VALUE, Number.MAX_VALUE);
    this.max = new planck.Vec2(-Number.MAX_VALUE, -Number.MAX_VALUE);
    const scale = this.scale;

    pts.forEach(pt => {
      // @@ side effect : scale the points
      pt.x *= scale;
      pt.y *= scale;
      if (pt.x < this.min.x) {
        this.min.x = pt.x;
      }
      if (pt.y < this.min.y) {
        this.min.y = pt.y;
      }
      if (pt.x > this.max.x) {
        this.max.x = pt.x;
      }
      if (pt.y > this.max.y) {
        this.max.y = pt.y;
      }
    });
  }

  init() {
    //var img:DisplayObject = new Images.GRUNGE;
    //var bmd:BitmapData = new BitmapData(img.width, img.height);
    //bmd.draw(img);
    this.graphics = this.createGraphics();

    const boundingWidth = this.max.x - this.min.x;
    const boundingHeight = this.max.y - this.min.y;
    const theColor = Phaser.Display.Color.IntegerToColor(this.color);
    this.graphics.lineStyle(0.5, theColor.color);

    //const matrix = new planck.Matrix(boundingWidth/img.width, 0, 0, boundingHeight/img.height, min.x, min.y);

    //this.graphics.beginBitmapFill(bmd, matrix, true, true);
    const pts = this.points;
    this.graphics.moveTo(pts[0].x, pts[0].y);

    // fill poly instead
    for (let i= 1; i < pts.length; i++) {
      this.graphics.lineTo(pts[i].x, pts[i].y);
    }
  }
}
