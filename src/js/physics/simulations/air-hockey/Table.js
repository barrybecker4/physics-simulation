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
        const bodyDef = { type: 'static' }
        const color = 0xff4455
        tableMap.map( edge => this.shapeBuilder.buildWall(edge[0], edge[1], bodyDef, color) )
    }

    // Goal detection sensors
    createGoalSensors() {
        const bodyDef = {}// type: 'static' }
        const color = 0xffddee
        const fixtureDef = { density: 1.0, friction: 0.5, restitution: 0.2, filterMaskBits: 0x0004, isSensor: true }
        this.goal1Sensor = this.shapeBuilder.buildWall(point(-.8, 4.5), point(.8, 4.5), bodyDef, color, fixtureDef)
        this.goal2Sensor = this.shapeBuilder.buildWall(point(-.8, -4.5), point(.8, -4.5), bodyDef, color, fixtureDef)
    }

    // Create Paddle Blocking Walls
    createBlockingWalls() {
        const bodyDef = { type: 'static' }
        const color = 0x44ff00
        const fixtureDef = { density: 1.0, friction: 0.5, restitution: 0.2, groupIndex: 1, filterMaskBits: 0x0002 }
        this.shapeBuilder.buildWall(point(-.8, 4.2), point(.8, 4.2), bodyDef, color, fixtureDef)
        this.shapeBuilder.buildWall(point(-.8, -4.2), point(.8, -4.2), bodyDef, color, fixtureDef)
        this.shapeBuilder.buildWall(point(-2.4, 0), point(2.4, 0), bodyDef, color, fixtureDef)
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