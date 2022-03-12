import TableMap from "./TableMap.js"
import Puck from "./Puck.js"


planck.testbed('Boxes', testbed => {
    testbed.y = 0
    let canMove = false
    const force = 100
    const pl = planck
    const Vec2 = pl.Vec2
    const world = pl.World()
    const table = world.createBody()
    const tableMap = new TableMap().map

    // Create Table Walls
    tableMap.map(edge => table.createFixture(pl.Edge(Vec2(edge[0].x, edge[0].y), Vec2(edge[1].x, edge[1].y))) )

    // Create Goal Detection Sensors
    const goalFixtureDefinition = { isSensor: true, filterMaskBits:  0x0004 }
    const goal1Sensor = table.createFixture(pl.Edge(Vec2(-4, 22.5), Vec2(4, 22.5)), goalFixtureDefinition)
    const goal2Sensor = table.createFixture(pl.Edge(Vec2(-4, -22.5), Vec2(4, -22.5)), goalFixtureDefinition)

    // Create Paddle Blocking Walls
    table.createFixture(pl.Edge(Vec2(-4, 21), Vec2(4, 21)), { filterMaskBits:  0x0002 })
    table.createFixture(pl.Edge(Vec2(-4, -21), Vec2(4, -21)), { filterMaskBits:  0x0002 })
    table.createFixture(pl.Edge(Vec2(-12, 0), Vec2(12, 0)), { filterMaskBits:  0x0002 })

    const puck = new Puck(world)


    // Create Paddles
    const paddleBodyDefinition = position => ({
        type: 'dynamic',
        position: position,
        bullet: false,
        linearDamping: 10,
        angularDamping: 1
    })
    const paddleFixtureDefinition = {
        restitution: 0,
        filterCategoryBits : 0x0002
    }
    const paddle1 = world.createBody(paddleBodyDefinition(Vec2(0, 16)))
    paddle1.createFixture(pl.Circle(1.5), paddleFixtureDefinition)
    const paddle2 = world.createBody(paddleBodyDefinition(Vec2(0, -16)))
    paddle2.createFixture(pl.Circle(1.5), paddleFixtureDefinition)

    function updatePosition(e) {
        if (canMove) {
        const vector = Vec2(e.movementX * force, -e.movementY * force)
        paddle2.applyForce(vector, Vec2(paddle2.getPosition()), true)
        }
    }

    function handleContact(contact) {
        const fixtureA = contact.getFixtureA()
        const fixtureB = contact.getFixtureB()
        if (fixtureA == goal1Sensor) {
            alert('player1 scored')
            puck.destroy()
        }
        if (fixtureA == goal2Sensor) {
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