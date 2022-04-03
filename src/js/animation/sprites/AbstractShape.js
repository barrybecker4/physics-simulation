
const defaultStyle = {
  color: 0x9988cc,
  opacity: 0.7,
  lineColor: 0xaabbdd,
  lineThickness: 1,
  lineOpacity: 0.9
}

/**
 * Represents a 2D ball and common operations on it.
 * In Flash it extended extends UIComponent. In Phaser, it should create a new graphics instance
 */
export default class AbstractShape {

  constructor(createGraphics, styleParam) {
    this.createGraphics = createGraphics;

    this.style = {
      ...defaultStyle,
      ...styleParam
    }

    this.x = 0;
    this.y = 0;
  }
}
