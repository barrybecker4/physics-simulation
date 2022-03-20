export default {
    randomColor
}

function randomColor(saturationAdjust = -30, brightAdjust = 30) {
    const color = new Phaser.Display.Color();
    color.random();
    color.saturate(saturationAdjust).brighten(brightAdjust);
    return color;
}