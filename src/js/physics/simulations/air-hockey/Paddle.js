export default class Paddle {

    constructor(position, shapeBuilder) {

        const paddleBodyDefinition = {
            type: 'dynamic',
            position,
            bullet: false,
            linearDamping: 10,
            angularDamping: 1,
        }

        const fixtureDef = { density: 1.0, friction:0.5, restitution: 0, groupIndex: 1, filterCategoryBits: 0x0002}
        this.body = shapeBuilder.buildBall(.3, paddleBodyDefinition, 0x2299ee, fixtureDef)
    }

    getPosition() {
        return this.body.getPosition()
    }

    applyForce(force, point) {
        this.body.applyForce(force, point, true)
    }
}