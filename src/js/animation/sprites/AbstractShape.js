
/**
 * Represents a 2D ball and common operations on it.
 * In Flash it extended extends UIComponent. In Phaser, it should create a new graphics instance
 */
export default class AbstractShape {

  constructor(createGraphics, color = 0x9988cc) {
    this.createGraphics = createGraphics;
    this.color = color;
    this.x = 0;
    this.y = 0;
  }
}
