export default class Puck {

    constructor(world) {
        this.world = world
        this.body = null;
        this.markedForReset = false

        const intervalId = setInterval(() => {
            if (this.markedForReset) {
                this.destroy()
                this.create()
                this.markedForReset = false
            }
        }, 1000);
    }

    create() {
        this.body = this.world.createBody({
            type: 'dynamic',
            position: planck.Vec2(0, 0),
            bullet: true,
            linearDamping: 0.01,
            angularDamping: 0.02
        })
        this.body.createFixture(planck.Circle(1), {
            density: 0.25,
            restitution: 0.9,
            filterCategoryBits : 0x0004
        })
    }

    // Cannot do the reset here because this is within a planck timeStep and the world is locked
    reset() {
        this.markedForReset = true
    }

    destroy() {
        this.body.destroyFixture(this.body.getFixtureList())
        this.body = null
    }
}