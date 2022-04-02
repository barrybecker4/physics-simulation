import Constants from "./Constants.js"

const tableHeight = 8.4
const tableWidth = 4.8
const goalWidth= 1.6
const goalDepth= .6
const cornerRadius = .6
const cornerSteps = 5
const endLength = (tableWidth - goalWidth - (cornerRadius * 2)) / 2
const sideLength = (tableHeight - (cornerRadius * 2)) / 2
const centerX = tableWidth / 2
const centerY = tableHeight / 2
const CX = Constants.CENTER.x
const CY = Constants.CENTER.y
const Vec2 = planck.Vec2


export default class TableMap {

    constructor() {
       this.map = this.buildMap();
    }

    buildMap() {
        let tableMap = []
        this.pushSides(tableMap)
        this.pushCorners(tableMap)

        return tableMap
    }

    pushSides(tableMap) {
        tableMap.push([
            Vec2(CX - (goalWidth / 2), CY + centerY),
            Vec2(CX - (goalWidth / 2) - endLength, CY + centerY)
        ])
        tableMap.push([
            Vec2(CX + (goalWidth / 2), CY + centerY),
            Vec2(CX + (goalWidth / 2) + endLength, CY + centerY)
        ])
        tableMap.push([
            Vec2(CX - (goalWidth / 2), CY + centerY + goalDepth),
            Vec2(CX + (goalWidth / 2), CY + centerY + goalDepth)
        ])
        tableMap.push([
            Vec2(CX - (goalWidth / 2), CY + centerY + goalDepth),
            Vec2(CX - (goalWidth / 2), CY + centerY)
        ])
        tableMap.push([
            Vec2(CX + (goalWidth / 2), CY + centerY + goalDepth),
            Vec2(CX + (goalWidth / 2), CY + centerY)
        ])
        tableMap.push([
            Vec2(CX + centerX, CY + centerY - cornerRadius),
            Vec2(CX + centerX, CY - centerY + cornerRadius)
        ])
        tableMap.push([
            Vec2(CX - centerX, CY + centerY - cornerRadius),
            Vec2(CX - centerX, CY - centerY + cornerRadius)
        ])
        tableMap.push([
            Vec2(CX - (goalWidth / 2), CY - centerY),
            Vec2(CX - (goalWidth / 2) - endLength, CY - centerY)
        ])
        tableMap.push([
            Vec2(CX + (goalWidth / 2), CY - centerY),
            Vec2(CX + (goalWidth / 2) + endLength, CY - centerY)
        ])
        tableMap.push([
            Vec2(CX - (goalWidth / 2), CY - centerY - goalDepth),
            Vec2(CX + (goalWidth / 2), CY - centerY - goalDepth)
        ])
        tableMap.push([
            Vec2(CX - (goalWidth / 2), CY - centerY - goalDepth),
            Vec2(CX - (goalWidth / 2), CY - centerY)
        ])
        tableMap.push([
            Vec2(CX + (goalWidth / 2), CY - centerY - goalDepth),
            Vec2(CX + (goalWidth / 2), CY - centerY)
        ])
    }

    pushCorners(tableMap) {
        TableMap.createCorner({
            x: CX + centerX,
            y: CY + centerY
        },{
            x: CX + centerX - cornerRadius,
            y: CY + centerY - cornerRadius
        }, tableMap)

        TableMap.createCorner({
            x: CX - centerX,
            y: CY + centerY
        },{
            x: CX - centerX + cornerRadius,
            y: CY + centerY - cornerRadius
        }, tableMap)

        TableMap.createCorner({
            x: CX + centerX,
            y: CY - centerY
        },{
            x: CX + centerX - cornerRadius,
            y: CY - centerY + cornerRadius
        }, tableMap)

        TableMap.createCorner({
            x: CX - centerX,
            y: CY - centerY
        },{
            x: CX - centerX + cornerRadius,
            y: CY - centerY + cornerRadius
        }, tableMap)
    }

    static createCorner(start, end, tableMap) {
        let sum = 0
        let map = []
        const sizeX = end.x - start.x
        const sizeY = end.y - start.y

        for (let i = 0; i < cornerSteps + 1; i++){
            sum += i
            map.push(sum)
        }

        function stepWidth(index, size){
            return (size / map[cornerSteps]) * map[index]
        }

        for (let i = 0; i < cornerSteps; i++){
            const currentX = stepWidth(i, sizeX) + start.x
            const currentY = stepWidth(cornerSteps - i, sizeY) + start.y
            const nextX = stepWidth(i + 1, sizeX) + start.x
            const nextY = stepWidth(cornerSteps - i - 1, sizeY) + start.y
            tableMap.push([Vec2(currentX, currentY), Vec2(nextX, nextY)])
        }
    }
}