
export default class Paddle {

    constructor(position, world) {
        const paddleBodyDefinition = {
            type: 'dynamic',
            position: position,
            bullet: false,
            linearDamping: 10,
            angularDamping: 1
        }

        const paddleFixtureDefinition = {
              restitution: 0,
              filterCategoryBits : 0x0002
        }
        this.body = world.createBody(paddleBodyDefinition)
        this.body.createFixture(planck.Circle(1.5), paddleFixtureDefinition)
    }

    getPosition() {
        return this.body.getPosition()
    }

    applyForce(force, point) {
        this.body.applyForce(force, point, true)
    }
}