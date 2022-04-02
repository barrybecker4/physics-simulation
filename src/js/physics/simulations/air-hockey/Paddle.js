export default class Paddle {

    constructor(position, shapeBuilder) {

        const paddleBodyDefinition = {
            type: 'dynamic',
            position,
            bullet: false,
            linearDamping: 10,
            angularDamping: 1
        }

        this.body = shapeBuilder.buildBall(.3, paddleBodyDefinition, 0x2299ee, 1.0, 0.5, 0, 1);

        /*
        const paddleFixtureDefinition = {
              restitution: 0,
              filterCategoryBits : 0x0002
        }*/
        //this.body = world.createBody(paddleBodyDefinition)
        //this.body.createFixture(planck.Circle(1.5), paddleFixtureDefinition)
    }

    getPosition() {
        return this.body.getPosition()
    }

    applyForce(force, point) {
        this.body.applyForce(force, point, true)
    }
}