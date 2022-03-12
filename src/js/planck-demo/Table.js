import TableMap from "./TableMap.js"

const Vec2 = planck.Vec2


export default class Table {

    constructor(world) {
        this.body = world.createBody()

        this.createTableGeometry()
        this.createGoalSensors()
        this.createBlockingWalls()
    }

    createTableGeometry() {
        const tableMap = new TableMap().map
        tableMap.map(edge => this.body.createFixture(planck.Edge(Vec2(edge[0].x, edge[0].y), Vec2(edge[1].x, edge[1].y))) )
    }

    // Goal detection sensors
    createGoalSensors() {
        const goalFixtureDefinition = { isSensor: true, filterMaskBits:  0x0004 }
        this.goal1Sensor = this.body.createFixture(planck.Edge(Vec2(-4, 22.5), Vec2(4, 22.5)), goalFixtureDefinition)
        this.goal2Sensor = this.body.createFixture(planck.Edge(Vec2(-4, -22.5), Vec2(4, -22.5)), goalFixtureDefinition)
    }

    // Create Paddle Blocking Walls
    createBlockingWalls() {
        this.body.createFixture(planck.Edge(Vec2(-4, 21), Vec2(4, 21)), { filterMaskBits:  0x0002 })
        this.body.createFixture(planck.Edge(Vec2(-4, -21), Vec2(4, -21)), { filterMaskBits:  0x0002 })
        this.body.createFixture(planck.Edge(Vec2(-12, 0), Vec2(12, 0)), { filterMaskBits:  0x0002 })
    }
}