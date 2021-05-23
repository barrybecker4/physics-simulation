
/**
 * Represents a 2D ball and common operations on it.
 * In Flash it extended extends UIComponent. In Phaser, it should create a new graphics instance
 */
export default class AbstractShape {

  constructor(graphics, color = 0x9988cc) {
    this.graphics = graphics;
    this.color = color;
  }
}
