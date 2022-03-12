
export default class Puck {

    constructor(world) {
        this.world = world
        this.body = world.createBody({
            type: 'dynamic',
            position: planck.Vec2(0, 0),
            bullet: true,
            linearDamping: 0.1,
            angularDamping: 0.02
        })
        this.body.createFixture(planck.Circle(1), {
            density: 0.25,
            restitution: 0.9,
            filterCategoryBits : 0x0004
        })
    }

    destroy() {
        this.world.destroyBody(this.body)
    }
}