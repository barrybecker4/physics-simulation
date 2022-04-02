import Constants from "./Constants.js"

export default class Puck {

    constructor(shapeBuilder) {
        this.shapeBuilder = shapeBuilder
        this.body = null;
        this.markedForReset = false
        this.create();

        const intervalId = setInterval(() => {
            if (this.markedForReset) {
                this.destroy()
                this.create()
                this.markedForReset = false
            }
        }, 1000);
    }

    create() {

        const bodyDef = {
            type: 'dynamic',
            position: planck.Vec2(0, 0).add(Constants.CENTER),
            bullet: true,
            linearDamping: 0.01,
            angularDamping: 0.02
        }
        /*this.body = this.world.createBody(bodyDef)
        this.body.createFixture(planck.Circle(1), {
            density: 0.25,
            restitution: 0.9,
            filterCategoryBits : 0x0004
        })*/

        const color = 0x33ff66
        const groupIndex = 2
        this.body = this.shapeBuilder.buildBall(0.2, bodyDef, color, 0.25, 0.0, 0.9, groupIndex)
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