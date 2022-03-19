import Table from "./Table.js"
import Puck from "./Puck.js"
import Paddle from "./Paddle.js"


planck.testbed('AirHockey', testbed => {
    testbed.y = 0
    testbed.info('Use mouse to drag pucks');

    let canMove = false
    const force = 100
    const Vec2 = planck.Vec2
    const world = planck.World()

    const table = new Table(world)
    const puck = new Puck(world)
    const paddle1 = new Paddle(Vec2(0, 16), world)
    const paddle2 = new Paddle(Vec2(0, -16), world)

    puck.create()

    let counter = 0
    testbed.step = function() {
      testbed.status('time', counter++)
    }

    function updatePosition(e) {
        if (canMove) {
          const vector = Vec2(e.movementX * force, -e.movementY * force)
          //paddle2.applyForce(vector, Vec2(paddle2.getPosition()))
        }
    }

    function handleContact(contact) {
        const fixtureA = contact.getFixtureA()
        const fixtureB = contact.getFixtureB()
        if (fixtureA == table.goal1Sensor) {
            alert('player1 scored')
            puck.markedForReset = true
        }
        if (fixtureA == table.goal2Sensor) {
            alert('player2 scored')
            puck.markedForReset = true
        }
    }

    function handleBodyRemoval(body) {
        console.log("Should remove " + body)
    }

    function handleFixtureRemoval(fixture) {
        console.log("Should remove " + fixture)
    }


    //window.addEventListener('mousemove', (e) => updatePosition(e))
    window.addEventListener('mousedown', (e) => {
      canMove = true;
    })
    window.addEventListener('mouseup', (e) => {
      canMove = false;
    })
    world.on('begin-contact', handleContact)
    world.on('remove-body', handleBodyRemoval)
    world.on('remove-fixture', handleFixtureRemoval)

    var intervalId = setInterval(function() {
      if (puck.markedForReset) {
        puck.destroy()
        puck.create()
        puck.markedForReset = false
      }
    }, 1000);

    return world
})