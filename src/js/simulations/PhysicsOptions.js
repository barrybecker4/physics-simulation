const DEFAULT_GRAVITY = 5.0;
const DEFAULT_FRICTION = 0.5;
const DEFAULT_DENSITY = 1.0;
const DEFAULT_RESTITUTION = 0.2;

export default class PhysicsOptions {

    constructor() {
        this.gravityListeners = [];

        // conversion unit from pixels to meters. 30 pixels = 1 meter
        this.worldScale = 30;

        this._gravity = DEFAULT_GRAVITY;
        this.friction = DEFAULT_FRICTION;
        this.density = DEFAULT_DENSITY;
        this.restitution = DEFAULT_RESTITUTION;
    }

    get gravity() {
        return this._gravity;
    }

    set gravity(g) {
        this._gravity = g;
        this.gravityListeners.forEach(listener => listener.gravityChanged(g));
    }

    addGravityChangeListener(listener) {
        this.gravityListeners.push(listener);
    }
}
