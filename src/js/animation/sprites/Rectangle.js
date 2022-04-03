// import Box2D.Common.Math.b2Vec2;
// import com.becker.common.Images;
// import flash.display.DisplayObject;
import AbstractShape from "./AbstractShape.js";


/**
 * Represents a 2D rectangle and common operations on it.
 * @author Barry Becker
 */
export default class Rectangle extends AbstractShape {


  constructor(createGraphics, width, height, style) {
    super(createGraphics, style);
    this.width = width;
    this.height = height;
    //img = texture ? new texture : new Images.GOLD;
    //this.addChild(img);
    this.init();
  }

  init() {
    const g = this.graphics = this.createGraphics();
    //const theColor = Phaser.Display.Color.IntegerToColor(this.color);
    g.fillStyle(this.style.color, this.style.opacity);
    g.lineStyle(this.style.lineThickness, this.style.lineColor, this.style.lineOpacity);

    const xpos = this.x - this.width / 2;
    const ypos = this.y - this.height / 2;
    g.fillRect(xpos, ypos, this.width, this.height);
    g.strokeRect(xpos, ypos, this.width, this.height);
    return g;
  }
}
