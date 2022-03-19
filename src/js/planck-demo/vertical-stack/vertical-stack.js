/*
 * MIT License
 * Copyright (c) 2019 Erin Catto
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import VerticalStackSimulator from "./VerticalStackSimulator.js"
import Bullet from "./Bullet.js"


planck.testbed('VerticalStack', function(testbed) {
  var pl = planck, Vec2 = pl.Vec2;

  var world = new pl.World({
    gravity: Vec2(0, -10),
    blockSolve: true,
  });

  const columnCount = 2;
  const rowCount = 20;
  const bullet = new Bullet(world);

  const simulator = new VerticalStackSimulator(columnCount, rowCount, world);

  testbed.keydown = function(code, char) {
    switch (char) {
    case 'X':
      bullet.destroy();
      bullet.create();
      break;

    case 'Z':
      world.m_blockSolve = !world.m_blockSolve;
      break;
    }
  };

  testbed.info("X: Launch a bullet");

  testbed.step = function() {
    testbed.status("Blocksolve", world.m_blockSolve);
  };

  return world;
});
