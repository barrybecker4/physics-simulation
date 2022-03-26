// import Box2D.Common.Math.b2Vec2;
// import com.becker.common.Images;
// import flash.display.DisplayObject;
import AbstractShape from "./AbstractShape.js";


/**
 * Represents a 2D rectangle and common operations on it.
 * @author Barry Becker
 */
export default class Rectangle extends AbstractShape {


  constructor(createGraphics, width, height, color = 0xaa77ff) {
    super(createGraphics, color);
    this.width = width;
    this.height = height;
    //img = texture ? new texture : new Images.GOLD;
    //this.addChild(img);

    this.init();
  }

  init() {
    const g = this.graphics = this.createGraphics();
    const theColor = Phaser.Display.Color.IntegerToColor(this.color);
    g.fillStyle(theColor.color, 0.6);
    g.lineStyle(1, theColor.color);

    const xpos = this.x - this.width / 2;
    const ypos = this.y - this.height / 2;
    g.fillRect(xpos, ypos, this.width, this.height);
    g.strokeRect(xpos, ypos, this.width, this.height);
    return g;
  }
}
