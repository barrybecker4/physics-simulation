import TableMap from "./TableMap.js"
import Constants from "./Constants.js"
const Vec2 = planck.Vec2


export default class Table {

    constructor(shapeBuilder) {
        this.shapeBuilder = shapeBuilder

        this.createTableGeometry()
        this.createGoalSensors()
        this.createBlockingWalls()
    }

    createTableGeometry() {
        const tableMap = new TableMap().map
        //tableMap.map(edge => this.body.createFixture(planck.Edge(Vec2(edge[0].x, edge[0].y), Vec2(edge[1].x, edge[1].y))) )
        const bodyDef = { type: 'static' }
        tableMap.map(edge => this.shapeBuilder.buildWall(edge[0], edge[1], bodyDef, 0xff4455) )
        //buildWall(start, stop, bodyDef, density = 1.0, friction = 0.5, restitution = 0.2, groupIndex = MAX_GROUP_INDEX)
    }

    // Goal detection sensors
    createGoalSensors() {
        //const goalFixtureDefinition = { isSensor: true, filterMaskBits:  0x0004 }
        //this.goal1Sensor = this.body.createFixture(planck.Edge(Vec2(-4, 22.5), Vec2(4, 22.5)), goalFixtureDefinition)
        //this.goal2Sensor = this.body.createFixture(planck.Edge(Vec2(-4, -22.5), Vec2(4, -22.5)), goalFixtureDefinition)
        const bodyDef = { type: 'static' }
        const color = 0xff3333
        const groupIndex = 2
        this.goal1Sensor = this.shapeBuilder.buildWall(point(-.8, 4.5), point(.8, 4.5), bodyDef, color, 1.0, 0.5, 0.2, groupIndex, true)
        this.goal2Sensor = this.shapeBuilder.buildWall(point(-.8, -4.5), point(.8, -4.5), bodyDef, color, 1.0, 0.5, 0.2, groupIndex, true)
    }

    // Create Paddle Blocking Walls
    createBlockingWalls() {
        //this.body.createFixture(planck.Edge(Vec2(-4, 21), Vec2(4, 21)), { filterMaskBits:  0x0002 })
        //this.body.createFixture(planck.Edge(Vec2(-4, -21), Vec2(4, -21)), { filterMaskBits:  0x0002 })
        //this.body.createFixture(planck.Edge(Vec2(-12, 0), Vec2(12, 0)), { filterMaskBits:  0x0002 })

        const bodyDef = { type: 'static' }
        const color = 0x44ff00
        const groupIndex = 1
        this.shapeBuilder.buildWall(point(-.8, 4.2), point(.8, 4.2), bodyDef, color, 1.0, 0.5, 0.2, groupIndex)
        this.shapeBuilder.buildWall(point(-.8, -4.2), point(.8, -4.2), bodyDef, color, 1.0, 0.5, 0.2, groupIndex)
        this.shapeBuilder.buildWall(point(-2.4, 0), point(2.4, 0), bodyDef, color, 1.0, 0.5, 0.2, groupIndex)
    }

}

function point(x, y) {
  return Vec2(x, y).add(Constants.CENTER)
}