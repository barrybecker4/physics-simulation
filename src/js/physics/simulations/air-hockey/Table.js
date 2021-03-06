import TableMap from "./TableMap.js"
import Constants from "./Constants.js"
const Vec2 = planck.Vec2
const goalHalfWidth = Constants.GOAL_WIDTH / 2


export default class Table {

    constructor(shapeBuilder) {
        this.shapeBuilder = shapeBuilder

        this.createTableGeometry()
        this.createGoalSensors()
        this.createBlockingWalls()
    }

    createTableGeometry() {
        const tableMap = new TableMap().map
        const bodyDef = { type: 'static' }
        const fixtureDef = { color: 0xee9955 }
        tableMap.map( edge => this.shapeBuilder.buildWall(edge[0], edge[1], bodyDef, fixtureDef) )
    }

    createGoalSensors() {
        const bodyDef = { type: 'static' }
        const fixtureDef = { density: 1.0, friction: 0.5, restitution: 0.2, filterMaskBits: 0x0004, isSensor: true, color: 0xff6633 }
        const gHeight = Constants.TABLE_HEIGHT / 2 + 0.45
        this.goal1Sensor = this.shapeBuilder.buildWall(point(-goalHalfWidth, gHeight), point(goalHalfWidth, gHeight), bodyDef, fixtureDef)
        this.goal2Sensor = this.shapeBuilder.buildWall(point(-goalHalfWidth, -gHeight), point(goalHalfWidth, -gHeight), bodyDef, fixtureDef)
    }

    // Create Paddle Blocking Walls
    createBlockingWalls() {
        const bodyDef = { type: 'static' }
        const halfWidth = Constants.TABLE_WIDTH / 2
        const halfHeight = Constants.TABLE_HEIGHT / 2

        const fixtureDef = { density: 1.0, friction: 0.5, restitution: 0.2, groupIndex: 1, filterMaskBits: 0x0002, color: 0x44ff00 }
        this.shapeBuilder.buildWall(point(-goalHalfWidth, halfHeight), point(goalHalfWidth, halfHeight), bodyDef, fixtureDef)
        this.shapeBuilder.buildWall(point(-goalHalfWidth, -halfHeight), point(goalHalfWidth, -halfHeight), bodyDef, fixtureDef)
        this.shapeBuilder.buildWall(point(-halfWidth, 0), point(halfWidth, 0), bodyDef, fixtureDef)
    }

    getGoal1Fixture() {
        return this.goal1Sensor.getFixtureList();
    }

    getGoal2Fixture() {
        return this.goal2Sensor.getFixtureList();
    }

}

function point(x, y) {
  return Vec2(x, y).add(Constants.CENTER)
}