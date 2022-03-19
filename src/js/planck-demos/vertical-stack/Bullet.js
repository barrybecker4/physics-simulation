const VELOCITY = 200;

// height above the flow where the bullet shoots from
const HEIGHT = 5.0;


export default class Bullet {

  constructor(floor, world) {
    this.world = world;
    this.instance = null;
    this.floor = floor;
  }

  destroy() {
    if (this.instance != null) {
      this.world.destroyBody(this.instance);
      this.instance = null;
    }
  }

  create() {
      this.instance = this.world.createBody({
          type: 'dynamic',
          bullet: true,
          position: planck.Vec2(-31.0, this.floor + HEIGHT),
      });

      this.instance.createFixture({
        shape: planck.Circle(0.25),
        density: 20.0,
        restitution: 0.04,
      });

      this.instance.setLinearVelocity(planck.Vec2(VELOCITY, 0.0));
  }
}