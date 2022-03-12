import Table from "./Table.js"
import Puck from "./Puck.js"
import Paddle from "./Paddle.js"



planck.testbed('AirHockey', testbed => {
    testbed.y = 0
    let canMove = false
    const force = 100
    const pl = planck
    const Vec2 = pl.Vec2
    const world = pl.World()

    const table = new Table(world)
    const puck = new Puck(world)
    const paddle1 = new Paddle(Vec2(0, 16), world)
    const paddle2 = new Paddle(Vec2(0, -16), world)


    function updatePosition(e) {
        if (canMove) {
          const vector = Vec2(e.movementX * force, -e.movementY * force)
          paddle2.applyForce(vector, Vec2(paddle2.getPosition()))
        }
    }

    function handleContact(contact) {
        const fixtureA = contact.getFixtureA()
        const fixtureB = contact.getFixtureB()
        if (fixtureA == table.goal1Sensor) {
            alert('player1 scored')
            puck.destroy()
        }
        if (fixtureA == table.goal2Sensor) {
            alert('player2 scored')
            puck.destroy()
        }
    }

    function unlock(){
        canMove = document.pointerLockElement === document.body ? true : false
    }

    document.addEventListener('pointerlockchange', () => unlock())
    window.addEventListener('mousemove', (e) => updatePosition(e))
    document.body.addEventListener('click', () => document.body.requestPointerLock())
    world.on('begin-contact', (e) => handleContact(e))

    return world
})