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

        const color = 0xddeeee
        const fixtureDef = { density: 0.25, friction: 0.0, restitution: .9, filterCategoryBits : 0x0004 }
        this.body = this.shapeBuilder.buildBall(0.2, bodyDef, color, fixtureDef)
    }

    // Cannot do the reset here because this is within a planck timeStep and the world is locked
    reset() {
        this.markedForReset = true
    }

    destroy() {
        let userData = this.body.getUserData();
        userData.destroy();
        //this.body.destroyFixture(this.body.getFixtureList())
        this.shapeBuilder.world.destroyBody(this.body);
        this.body = null
    }
}