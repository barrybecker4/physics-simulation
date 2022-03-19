export default class Bullet {

  constructor(world) {
    this.world = world;
    this.instance = null;
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
          position: planck.Vec2(-31.0, 5.0),
      });

      this.instance.createFixture({
        shape: planck.Circle(0.25),
        density: 20.0,
        restitution: 0.04,
      });

      this.instance.setLinearVelocity(planck.Vec2(300.0, 0.0));
  }
}