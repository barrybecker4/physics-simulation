
export default class PlanckWorld {

  constructor(width, height, physicsOptions, createGraphics, sounds) {
    // create a Box2D world
    this.width = width;
    this.height = height;
    this.physicsOptions = physicsOptions;
    this.createGraphics = createGraphics;
    this.worldScale = physicsOptions.worldScale;

    this.world = new planck.World(planck.Vec2(0, physicsOptions.gravity));
    physicsOptions.addGravityChangeListener(this);

    this.world.on('begin-contact', function(contact) {
      const volume = 0.1 + Math.random() / 50.0;
      if (volume > 0 && sounds) {
        //Sounds.playScrape(volume);
        sounds.playHit(volume);
      }
    });
  }

  gravityChanged(g) {
    this.world.setGravity(planck.Vec2(0, g));
  }

  createContent(phaserTime) {
    const color = Phaser.Display.Color.IntegerToColor(0x00ee11);
    this.createBox(this.width / 3, this.height - 20, this.width / 2, 40, false, color);
  }

  // arguments: x, y coordinates of the center, with and height of the box, in pixels
  createBox(posX, posY, width, height, isDynamic, color){

    let box = this.world.createBody();
    if (isDynamic){
      box.setDynamic();
    }

    // a body can have one or more physical fixtures. This is how we create a box fixture inside a body
    const scale = this.physicsOptions.worldScale;
    box.createFixture(planck.Box(width / 2 / scale, height / 2 / scale), {
      density: this.physicsOptions.density,
      restitution: this.physicsOptions.restitution,
      friction: this.physicsOptions.friction,
    });

    // now we place the body in the world
    box.setPosition(planck.Vec2(posX / scale, 0.8 * posY / scale));

    // time to set mass information
    box.setMassData({
      mass: 1,
      center: planck.Vec2(),
      I: 1 // needed to rotate
    });

    // now we create a graphics object representing the body
    let userData = this.createGraphics();
    userData.fillStyle(color.color, 1);
    userData.fillRect(-width / 2, -height / 2, width, height);

    // a body can have anything in its user data, normally it's used to store its sprite
    box.setUserData(userData);
  }


  update(timeStep) {
    this.world.step(timeStep);
    this.world.clearForces();

    // iterate through all bodies
    for (let b = this.world.getBodyList(); b; b = b.getNext()){

      let bodyPosition = b.getPosition();
      let bodyAngle = b.getAngle();

      // get body user data, the graphics object
      let userData = b.getUserData();

      const scale = this.physicsOptions.worldScale;
      userData.x = bodyPosition.x * scale;
      userData.y = bodyPosition.y * scale;
      userData.rotation = bodyAngle;
    }
  }
}