import Table from "./Table.js"
import Puck from "./Puck.js"
import Paddle from "./Paddle.js"


planck.testbed('AirHockey', testbed => {
    testbed.y = 0
    testbed.info('Use mouse to drag pucks');

    const Vec2 = planck.Vec2
    const world = planck.World()

    const table = new Table(world)
    const puck = new Puck(world)
    const paddle1 = new Paddle(Vec2(0, 16), world)
    const paddle2 = new Paddle(Vec2(0, -16), world)


    // detect when the puck is in a goal
    function handleContact(contact) {
        const fixtureA = contact.getFixtureA()
        const fixtureB = contact.getFixtureB()
        if (fixtureA == table.goal1Sensor) {
            alert('Player1 scored')
            puck.reset()
        }
        if (fixtureA == table.goal2Sensor) {
            alert('Player2 scored')
            puck.reset()
        }
    }

    world.on('begin-contact', handleContact)

    return world
})