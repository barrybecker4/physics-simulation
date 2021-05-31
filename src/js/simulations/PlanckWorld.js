
export default class PlanckWorld {

  constructor(width, height, physicsOptions, createGraphics) {
    // create a Box2D world
    this.width = width;
    this.height = height;
    this.physicsOptions = physicsOptions;
    this.createGraphics = createGraphics;
    this.worldScale = physicsOptions.worldScale;
    this.contactListeners = [];

    this.world = new planck.World(planck.Vec2(0, physicsOptions.gravity));
    physicsOptions.addGravityChangeListener(this);

    this.world.on('begin-contact', contact => {
      this.contactListeners.forEach(listener => {
        if (listener.onBeginContact) {
          listener.onBeginContact(contact);
        }
      });
    });
    this.world.on('end-contact', contact => {
      this.contactListeners.forEach(listener => {
        if (listener.onEndContact) {
          listener.onEndContact(contact);
        }
      });
    });
    this.world.on('pre-solve', (contact, oldManifold) => {
      this.contactListeners.forEach(listener => {
        if (listener.onPreSolve) {
          listener.onPreSolve(contact, oldManifold);
        }
      });
    });
    this.world.on('post-solve', (contact, contactImpulse) => {
      this.contactListeners.forEach(listener => {
        if (listener.onPostSolve) {
          listener.onPostSolve(contact, contactImpulse);
        }
      });
    });
  }

  addContactListener(contactListener) {
    this.contactListeners.push(contactListener);
  }

  removeContactListener(contactListener) {
    const index = this.contactListeners.indexOf(contactListener);
    this.contactListeners.splice(index, 1);
  }

  gravityChanged(g) {
    this.world.setGravity(planck.Vec2(0, g));
  }

  createGround(xpos, ypos, width, height, color = 0x00ee11) {
    const groundColor = Phaser.Display.Color.IntegerToColor(color);
    return this.createBox(xpos, ypos, width, height, false, groundColor);
  }

  createBody(bodyDef) {
    return this.world.createBody(bodyDef);
  }

  createBox(posX, posY, width, height, isDynamic, color) {

    let box = this.world.createBody();
    if (isDynamic){
      box.setDynamic();
    }

    // a body can have one or more physical fixtures. This is how we create a box fixture inside a body
    const scale = this.physicsOptions.worldScale;
    const physWidth = width / 2 / scale;
    const physHeight = height / 2 / scale;
    box.createFixture(planck.Box(physWidth, physHeight), {
      density: this.physicsOptions.density,
      restitution: this.physicsOptions.restitution,
      friction: this.physicsOptions.friction,
    });

    // now we place the body in the world
    box.setPosition(planck.Vec2(posX / scale, 0.8 * posY / scale));

    box.setMassData({
      mass: physWidth * physHeight,
      center: planck.Vec2(),
      I: 1 // needed to rotate
    });

    // now we create a graphics object representing the body
    const userData = this.createGraphics();
    userData.fillStyle(color.color, 1);
    userData.fillRect(-width / 2, -height / 2, width, height);

    // a body can have anything in its user data, normally it's used to store its sprite
    box.setUserData(userData);
    return box;
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
      //console.log("userData x = " + userData.x + " y = " + userData.y + " s = " + userData.scale + " visible=" + userData.visible);
    }
  }
}