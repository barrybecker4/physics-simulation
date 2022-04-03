import AbstractShape from "./AbstractShape.js";


/**
 * Represents a polygon shape and common operations on it.
 * @author Barry Becker
 */
export default class Polygon extends AbstractShape {

  constructor(createGraphics, points, scale, style) {
    super(createGraphics, style);
    this.points = points;
    this.scale = scale;

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
    console.log("poly bounds are " + pts);
  }

  init() {
    //var img:DisplayObject = new Images.GRUNGE;
    //var bmd:BitmapData = new BitmapData(img.width, img.height);
    //bmd.draw(img);
    this.graphics = this.createGraphics();
    const g = this.graphics;

    const boundingWidth = this.max.x - this.min.x;
    const boundingHeight = this.max.y - this.min.y;
    //const theColor = Phaser.Display.Color.IntegerToColor(this.style.lineColor || this.style.color);
    g.lineStyle(this.style.lineThickness, this.style.lineColor, this.style.lineOpacity);

    const pts = this.points;
    g.moveTo(pts[0].x, pts[0].y);

    // fill poly instead
    for (let i = 1; i < pts.length; i++) {
      g.lineTo(pts[i].x, pts[i].y);
    }
    g.fillStyle(this.style.color, this.style.opacity);
    g.fillPoints(this.points, true);
    g.strokePoints(this.points, true);
  }
}
