const tableHeight = 42
const tableWidth = 24
const goalWidth= 8
const goalDepth= 3
const cornerRadius = 3
const cornerSteps = 5
const endLength = (tableWidth - goalWidth - (cornerRadius * 2)) / 2
const sideLength = (tableHeight - (cornerRadius * 2)) / 2
const centerX = tableWidth / 2
const centerY = tableHeight / 2


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
        tableMap.push([{
            x: -(goalWidth / 2),
            y: centerY
        },{
            x: -(goalWidth / 2) - endLength,
            y: centerY
        }])

        tableMap.push([{
            x: (goalWidth / 2),
            y: centerY
        },{
            x: (goalWidth / 2) + endLength,
            y: centerY
        }])

        tableMap.push([{
            x: -(goalWidth / 2),
            y: centerY + goalDepth
        },{
            x: (goalWidth / 2),
            y: centerY + goalDepth
        }])

        tableMap.push([{
            x: -(goalWidth / 2),
            y: centerY + goalDepth
        },{
            x: -(goalWidth / 2),
            y: centerY
        }])

        tableMap.push([{
            x: (goalWidth / 2),
            y: centerY + goalDepth
        },{
            x: (goalWidth / 2),
            y: centerY
        }])

        tableMap.push([{
            x: centerX,
            y: centerY - cornerRadius
        },{
            x: centerX,
            y: -centerY + cornerRadius
        }])

        tableMap.push([{
            x: -centerX,
            y: centerY - cornerRadius
        },{
            x: -centerX,
            y: -centerY + cornerRadius
        }])

        tableMap.push([{
            x: -(goalWidth / 2),
            y: -centerY
        },{
            x: -(goalWidth / 2) - endLength,
            y: -centerY
        }])

        tableMap.push([{
            x: (goalWidth / 2),
            y: -centerY
        },{
            x: (goalWidth / 2) + endLength,
            y: -centerY
        }])

        tableMap.push([{
            x: -(goalWidth / 2),
            y: -centerY - goalDepth
        },{
            x: (goalWidth / 2),
            y: -centerY - goalDepth
        }])

        tableMap.push([{
            x: -(goalWidth / 2),
            y: -centerY - goalDepth
         },{
            x: -(goalWidth / 2),
            y: -centerY
        }])

        tableMap.push([{
            x: (goalWidth / 2),
            y: -centerY - goalDepth
        },{
            x: (goalWidth / 2),
            y: -centerY
        }])
    }

    pushCorners(tableMap) {
        TableMap.createCorner({
            x: centerX,
            y: centerY
        },{
            x: centerX - cornerRadius,
            y: centerY - cornerRadius
        }, tableMap)

        TableMap.createCorner({
            x: -centerX,
            y: centerY
        },{
            x: -centerX + cornerRadius,
            y: centerY - cornerRadius
        }, tableMap)

        TableMap.createCorner({
            x: centerX,
            y: -centerY
        },{
            x: centerX - cornerRadius,
            y: -centerY + cornerRadius
        }, tableMap)

        TableMap.createCorner({
            x: -centerX,
            y: -centerY
        },{
            x: -centerX + cornerRadius,
            y: -centerY + cornerRadius
        }, tableMap)
    }

    static createCorner(start, end, tableMap) {
        let sum = 0
        let map = []
        const sizeX = end.x - start.x
        const sizeY = end.y - start.y

        for(let i = 0; i < cornerSteps + 1; i++){
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
            tableMap.push([{x: currentX, y: currentY}, {x: nextX, y: nextY}])
        }
    }
}