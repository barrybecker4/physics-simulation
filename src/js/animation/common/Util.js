const LN10 = Math.log(10.0);

export default class Util  {

  /** convert from radians to degrees */
  static RAD_TO_DEG = 180.0 / Math.PI;

  /** convert from degrees to radians */
  static DEG_TO_RAD = Math.PI / 180.0;

  /**
   * @param lightness (0, 1) 0 returns dark colors, 1 light colors.
   * @param variation (0, 1) 0 is no variation, 1 is a lot
   * @return a random RGB color
   */
  static getRandomColor(lightness = 1.0, variation = 1.0) {
    const base = Math.max(lightness - variation/2.0, 0);
    const vartn = Math.min(variation, 1.0 - base);
    const r = Math.random() * vartn * 256 + (base * 256);
    const g = Math.random() * vartn * 256 + (base * 256);
    const b = Math.random() * vartn * 256 + (base * 256);

    return 0x010000 * r + 0x000100 * g + b;
  }

  /**
   * Rotate a point
   */
  static rotate(x, y, sin, cos, reverse)
  {
    const result = new planck.Vec2();
    if (reverse) {
      result.x = x * cos + y * sin;
      result.y = y * cos - x * sin;
    }
    else {
      result.x = x * cos - y * sin;
      result.y = y * cos + x * sin;
    }
    return result;
  }

  /**
   * @return Log base 10 of v.
   */
  static log10(v) {
    return Math.log(v) / LN10;
  }

  /**
   * @return th greatest common factor of a and b
   */
  static greatestCommonFactor(a, b) {
    if (a === 0 && b === 0) return 1;
    if (a < 0) return this.greatestCommonFactor(-a, b);
    if (b < 0) return this.greatestCommonFactor(a, -b);
    if (a === 0) return b;
    if (b === 0) return a;
    if (a === b) return a;
    if (b < a) return this.greatestCommonFactor(b, a);

    return this.greatestCommonFactor(a, b % a);
  }

  /**
   * @return the least common multiple of a and b
   */
  static leastCommonMultiple(a, b) {
    return Math.abs(a * b) / this.greatestCommonFactor(a, b);
  }

  /**
   * Round to specificied place.
   * e.g. round(3.45, 1) = 3.5
   *      rount(23.456, 0) = 23
   *      round(12345.3, -2) = 12300
   */
  static round(value, place) {
    const exp = Math.pow(10.0, place);
    return Math.round(value * exp) / exp;
  }

  static distance(pt1, pt2) {
    const dx = pt1.x - pt2.x;
    const dy = pt1.y - pt2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * First, arrange all given points in ascending order, according to their x-coordinate.
   * Second, take the leftmost and rightmost points (lets call them C and D), and creates tempVec,
   * where the points arranged in clockwise order will be stored.
   * Then, it iterates over the vertices vector, and uses the det() method.
   * It starts putting the points above CD from the beginning of the vector,
   * and the points below CD from the end of the vector.
   */
  static arrangeClockwise(vec) {

    const n = vec.length;
    let d;
    let i1 = 1;
    let i2 = n - 1;
    let tempVec = new Array(n), C, D;

    vec.sort(this.comparator);
    tempVec[0] = vec[0];
    C = vec[0];
    D = vec[n-1];
    for (let i = 1; i < n - 1; i++) {
      d = this.determinate(C, D, vec[i]);
      if (d < 0) {
        tempVec[i1++] = vec[i];
      }
      else {
        tempVec[i2--] = vec[i];
      }
    }
    tempVec[i1] = vec[n-1];
    return tempVec;
  }

  /**
   * This is a compare function, used in the arrangeClockwise() method
   * - a fast way to arrange the points in ascending order, according to their x-coordinate.
   * @return 1 of x coordinate of a greater than x coordinate of b; -1 of less; 0 if equal.
   */
  static comparator(a, b) {
    if (a.x > b.x) {
      return 1;
    }
    else if (a.x < b.x) {
      return -1;
    }
    return 0;
  }

  /**
   * Finds the determinant of a 3x3 matrix.
   * Returns a positive number if the three given points are in clockwise order,
   * negative if they are in anti-clockwise order and zero if they lie on the same line.
   * Another useful thing about determinants is that their absolute value is two times the face of the
   * triangle, formed by the three given points.
   *
   * @return the determinant
   */
  static determinate(p1, p2, p3) {
    return p1.x * p2.y + p2.x * p3.y + p3.x * p1.y - p1.y * p2.x - p2.y * p3.x - p3.y * p1.x;
  }

  /**
   * function to get the area of a shape. Tiny shapes will be removed to increase performance.
   * @param vertices vertices of a polygonal shape
   * @return area of the polygon.
   */
  static findArea(vertices) {

    const count = vertices.length;
    let area = 0.0;
    let p1X = 0.0;
    let p1Y = 0.0;
    let inv3 = 1.0 / 3.0;

    for (let i = 0; i < count; ++i) {
      let p2 = vertices[i];
      let p3 = (i + 1 < count) ? vertices[i+1] : vertices[0];
      let e1X = p2.x - p1X;
      let e1Y = p2.y - p1Y;
      let e2X = p3.x - p1X;
      let e2Y = p3.y - p1Y;
      let D = e1X * e2Y - e1Y * e2X;
      let triangleArea = 0.5 * D;
      area += triangleArea;
    }
    return area;
  }
}
