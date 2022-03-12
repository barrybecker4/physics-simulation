
export default class Puck {

    constructor(world) {
        this.world = world
        this.body = this.createBody()
    }

    createBody() {
        const body = this.world.createBody({
            type: 'dynamic',
            position: planck.Vec2(0, 0),
            bullet: true,
            linearDamping: 0.1,
            angularDamping: 0.02
        })
        body.createFixture(planck.Circle(1), {
            density: 0.25,
            restitution: 0.9,
            filterCategoryBits : 0x0004
        })
        return body;
    }

    reset() {
        //this.world.destroyBody(this.body)
        this.body.setAwake(false)
        this.body.setPosition(planck.Vec2(0, 0))
        this.body.position = planck.Vec2(0, 0)
        //this.body.setAwake(true)
        //this.body = this.createBody()
    }
}