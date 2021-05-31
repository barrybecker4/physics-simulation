// import Box2D.Common.Math.b2Vec2;
// import com.becker.common.Images;
// import flash.display.DisplayObject;
import AbstractShape from "./AbstractShape.js";


/**
 * Represents a 2D rectangle and common operations on it.
 * @author Barry Becker
 */
export default class Rectangle extends AbstractShape {

  //private var img:DisplayObject;


  constructor(createGraphics, width, height, color = 0xaa77ff) {
    super(createGraphics, color);
    this.width = width;
    this.height = height;
    //img = texture ? new texture : new Images.GOLD;
    //this.addChild(img);

    this.init();
  }

  init() {
    this.graphics = this.createGraphics();
    const theColor = Phaser.Display.Color.IntegerToColor(this.color);
    this.graphics.fillStyle(theColor.color, 1);
    this.graphics.fillRect(this.x - this.width / 2, this.y- this.height / 2, this.width, this.height);
  }
}
